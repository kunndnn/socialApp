// SkeletonUserCard.jsx
function SkeletonUserCard() {
  return (
    <div className="col-md-4 col-sm-6">
      <div className="card h-100 shadow-sm">
        <div className="skeleton skeleton-img"></div>
        <div className="card-body">
          <div className="skeleton skeleton-text w-75 mb-2"></div>
          <div className="skeleton skeleton-text w-50 mb-3"></div>
          <div className="skeleton skeleton-btn w-50"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonUserCard;
