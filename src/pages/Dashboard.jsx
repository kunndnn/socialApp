export default function Dashboard() {
  const cards = [
    { icon: "bi-people", color: "text-primary", title: "User Contacted", value: 0 },
    { icon: "bi-chat-dots", color: "text-success", title: "Messages", value: 0 },
    { icon: "bi-file-earmark-text", color: "text-warning", title: "Reports", value: 0 },
    // { icon: "bi-bell", color: "text-danger", title: "Alerts", value: 12 },
    // { icon: "bi-gear", color: "text-info", title: "Settings", value: 8 },
    // add more...
  ];

  // Utility to chunk cards into rows of max 4
  const chunkArray = (arr, size) =>
    arr.reduce((acc, _, i) => 
      (i % size ? acc : [...acc, arr.slice(i, i + size)]), []);

  const rows = chunkArray(cards, 4);

  return (
    <div className="container-fluid py-4">
      {rows.map((row, rIdx) => {
        // calculate col size per row
        const colSize = Math.floor(12 / row.length);

        return (
          <div key={rIdx} className="row g-3 mb-3">
            {row.map((card, cIdx) => (
              <div key={cIdx} className={`col-md-${colSize}`}>
                <div className="card shadow-sm border rounded-3 h-100">
                  <div className="card-body text-center">
                    <i className={`bi ${card.icon} display-6 ${card.color}`}></i>
                    <h5 className="card-title mt-2">{card.title}</h5>
                    <p className="card-text fs-4 fw-bold">{card.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
