import { useState, useEffect, useRef } from "react";
import apiCall from "#lib/axios"; // <-- your axios wrapper with Bearer token

export default function Chat() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");
  const token = localStorage.getItem("token");

  const listRef = useRef();

  // Fetch users from API
  const fetchUsers = async (pageNum = 1) => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const { data:{data} } = await apiCall.get(`/users?page=${pageNum}&limit=10`,{
          headers: { Authorization: `Bearer ${token}` },
      });
      if (data.users.length > 0) {
        setUsers((prev) => [...prev, ...data.users]);
        setPage(pageNum + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  // First load
  useEffect(() => {
    fetchUsers(1);
  }, []);

  // Infinite scroll for users list
  useEffect(() => {
    const listEl = listRef.current;

    const handleScroll = () => {
      if (!listEl) return;
      if (listEl.scrollTop + listEl.clientHeight >= listEl.scrollHeight - 50) {
        fetchUsers(page);
      }
    };

    listEl?.addEventListener("scroll", handleScroll);
    return () => listEl?.removeEventListener("scroll", handleScroll);
  }, [page, hasMore, loading]);

  // Handle user selection
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    if (!messages[user.id]) {
      setMessages((prev) => ({ ...prev, [user.id]: [] }));
    }
  };

  // Send message
  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || !selectedUser) return;

    const newMsg = { from: "me", text: input };
    setMessages((prev) => ({
      ...prev,
      [selectedUser.id]: [...prev[selectedUser.id], newMsg],
    }));

    // Dummy reply
    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [selectedUser.id]: [
          ...prev[selectedUser.id],
          { from: "them", text: `Reply from ${selectedUser.fullName}` },
        ],
      }));
    }, 600);

    setInput("");
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
            {users.map((user) => (
              <button
                key={user.id}
                className={`list-group-item list-group-item-action ${
                  selectedUser?.id === user.id ? "active" : ""
                }`}
                onClick={() => handleUserSelect(user)}
              >
                <i className="bi bi-person-circle me-2"></i>
                {user.fullName}
              </button>
            ))}
            {loading && (
              <div className="text-center py-2">
                <div className="spinner-border spinner-border-sm" />
              </div>
            )}
            {!hasMore && (
              <div className="text-center py-2 text-muted small">
                No more users
              </div>
            )}
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
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 border-top">
                <form onSubmit={handleSend} className="d-flex">
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <button className="btn btn-primary" type="submit">
                    <i className="bi bi-send"></i>
                  </button>
                </form>
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
