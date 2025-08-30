function NoUsersFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center my-5">
      <i className="bi bi-emoji-frown" style={{ fontSize: "3rem", color: "#6c757d" }}></i>
      <h4 className="text-muted mt-3">No Users Found</h4>
      <p className="text-secondary">
        Try adjusting your search or check back later.
      </p>
    </div>
  );
}

export default NoUsersFound;
