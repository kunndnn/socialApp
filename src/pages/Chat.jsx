import { useState, useEffect, useRef } from "react";
import apiCall from "#lib/axios";
const socketUrl = import.meta.env.VITE_SOCKET_URI;
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

export default function Chat() {
  const userId = useSelector((state) => state.user.profile?._id);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const token = localStorage.getItem("token");

  const listRef = useRef();
  const socketRef = useRef(null);

  // ✅ Create socket connection only once
  useEffect(() => {
    const socket = io(socketUrl, {
      query: { userId },
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log(socket.id, "connected");
    });

    socket.emit("chatsListing", { userId });
    socket.on("chatsListing", (data) => {
      setUsers(data.data.chats);
    });

    // Incoming message
    socket.on("newMessage", ({ from, to, text, fileUrl }) => {
      setMessages((prev) => ({
        ...prev,
        [from]: [...(prev[from] || []), { from, text, fileUrl }],
      }));
    });

    return () => {
      socket.disconnect();
      socket.off("chatsListing");
      socket.off("newMessage");
    };
  }, [userId]);

  const handleUserSelect = (user) => {
    setSelectedUser(user.userDetails);
    if (!messages[user.userDetails.id]) {
      setMessages((prev) => ({ ...prev, [user.userDetails.id]: [] }));
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if ((!input.trim() && !file) || !selectedUser) return;

    const msg = {
      from: "me",
      text: input,
      fileUrl: file ? URL.createObjectURL(file) : null, // preview
    };

    setMessages((prev) => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), msg],
    }));

    // send via socket (replace with backend file upload handling)
    socketRef.current.emit("sendMessage", {
      from: userId,
      to: selectedUser.id,
      text: input,
      file: file ? file.name : null, // real-world: upload to server, send URL
    });

    setInput("");
    setFile(null);
  };

  return (
    <div className="container-fluid py-3">
      <div className="row" style={{ height: "80vh" }}>
        {/* Users List */}
        <div className="col-md-3 border-end p-0">
          <div
            ref={listRef}
            className="list-group overflow-auto"
            style={{ height: "100%" }}
          >
            <input
              type="text"
              class="form-control mb-2"
              placeholder="Search User !!!"
            />
            {users.map((user) => (
              <button
                key={user.userDetails.id}
                className={`list-group-item list-group-item-action ${
                  selectedUser?.id === user.userDetails.id ? "active" : ""
                }`}
                onClick={() => handleUserSelect(user)}
              >
                <i className="bi bi-person-circle me-2"></i>
                {user.userDetails.fullName}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="col-md-9 d-flex flex-column">
          {selectedUser ? (
            <>
              <div className="bg-dark text-white p-2">
                Chat with {selectedUser.fullName}
              </div>
              <div
                className="flex-grow-1 overflow-auto p-3"
                style={{ background: "#f8f9fa" }}
              >
                {messages[selectedUser.id]?.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`d-flex mb-2 ${
                      msg.from === "me"
                        ? "justify-content-end"
                        : "justify-content-start"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-3 ${
                        msg.from === "me"
                          ? "bg-primary text-white"
                          : "bg-light text-dark"
                      }`}
                      style={{ maxWidth: "70%" }}
                    >
                      {msg.text && <div>{msg.text}</div>}
                      {msg.fileUrl &&
                        (msg.fileUrl.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                          <img
                            src={msg.fileUrl}
                            alt="attachment"
                            className="img-fluid rounded mt-1"
                          />
                        ) : (
                          <a
                            href={msg.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="d-block mt-1 text-decoration-underline"
                          >
                            📎 {msg.fileUrl.split("/").pop()}
                          </a>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 border-top">
                <form
                  onSubmit={handleSend}
                  className="d-flex align-items-center"
                >
                  <textarea
                    type="text"
                    className="form-control me-2"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <input
                    type="file"
                    className="d-none"
                    id="fileInput"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <label
                    htmlFor="fileInput"
                    className="btn btn-outline-secondary me-2 mb-0"
                  >
                    <i className="bi bi-paperclip"></i>
                  </label>
                  <button className="btn btn-primary" type="submit">
                    <i className="bi bi-send"></i>
                  </button>
                </form>
                {file && (
                  <div className="small mt-1 text-muted">
                    📎 {file.name} selected
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="d-flex flex-grow-1 align-items-center justify-content-center text-muted">
              Select a user to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
