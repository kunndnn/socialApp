import { useEffect, useState, useRef } from "react";
import apiCall from "#lib/axios";
import styles from "../styles/UsersPage.module.css";
import { Button, Modal } from "react-bootstrap";
import NoUsersFound from "../components/common/NoUsersFound";
import SkeletonUserCard from "../components/common/SkeletonUserCard";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const debounceRef = useRef(null); // ✅ persist debounce timer

  // ✅ Fetch users
  const fetchUsers = async (pageNum = 1, limit = 9, reset = false) => {
    if (loading || (!hasMore && !reset)) return;
    setLoading(true);

    try {
      const {
        data: { data },
      } = await apiCall.get(
        `/users?page=${pageNum}&limit=${limit}&search=${search}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.users.length > 0) {
        setUsers((prev) => (reset ? data.users : [...prev, ...data.users]));
        setHasMore(data.page < data.totalPages);
      } else {
        setUsers([]);
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Initial + page change
  useEffect(() => {
    fetchUsers(page, 9, page === 1); // if page=1 → reset
  }, [page, search]);

  // ✅ Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 2 &&
        hasMore &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  // ✅ Debounced search
  const handleSearch = (e) => {
    const value = e.target.value;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPage(1); // reset to first page
      setSearch(value);
      setHasMore(true);
    }, 600);
  };

  return (
    <>
      <div className="container mt-4">
        <label>
          Search:
          <input
            type="search"
            className="mb-3 form-control"
            onChange={handleSearch}
          />
        </label>

        <div className="row g-4">
          {users.length === 0 ? (
            <NoUsersFound />
          ) : (
            users.map((user) => (
              <div className="col-md-4 col-sm-6" key={user._id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={user.image ?? "/defaultAvatar.png"}
                    onError={(e) => {
                      e.currentTarget.src = "/defaultAvatar.png";
                    }}
                    className={`card-img-top ${styles.img}`}
                    alt="User"
                    loading="lazy"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{user.fullName}</h5>
                    <p className="card-text">Some bio/role here…</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => setShow(true)}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* {loading && <p className="text-center my-3">Loading more users…</p>} */}
        {loading && (
          <div className="row g-4 my-3">
            {[...Array(3)].map((_, idx) => (
              <SkeletonUserCard key={idx} />
            ))}
          </div>
        )}

        {/* {!hasMore && !loading && (
          <p className="text-center my-3">No more users</p>
        )} */}
      </div>

      {/* modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Profile details go here…</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
