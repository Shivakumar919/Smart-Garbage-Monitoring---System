import { useEffect, useState } from "react";
/// done nect commit
function Reports() {
  const [complaints, setComplaints] = useState([]);
  const [requests, setRequests] = useState([]);

  const fetchReports = async () => {
    try {
      const [complaintRes, requestRes] = await Promise.all([
        fetch("http://localhost:5000/api/complaints"),
        fetch("http://localhost:5000/api/collection"),
      ]);

      const complaintData = await complaintRes.json();
      const requestData = await requestRes.json();

      setComplaints(complaintData.data || []);
      setRequests(requestData.data || []);
    } catch (error) {
      console.error("Error loading reports:", error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // ==============================
  // SOLVE COMPLAINT
  // ==============================
  const solveComplaint = async (id, solved) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/complaints/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            solved: solved,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setComplaints((prev) =>
          prev.map((item) =>
            item._id === id ? result.data : item
          )
        );
      }
    } catch (error) {
      console.error("Complaint update error:", error);
    }
  };

  // ==============================
  // SOLVE REQUEST
  // ==============================
  const solveRequest = async (id, solved) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/collection/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            solved: solved,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setRequests((prev) =>
          prev.map((item) =>
            item._id === id ? result.data : item
          )
        );
      }
    } catch (error) {
      console.error("Request update error:", error);
    }
  };

  return (
    <div
      style={{
        padding: "25px",
        background: "#f5f6f8",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ marginBottom: "30px" }}>
        Admin Reports
      </h1>

      {/* =================================
          COMPLAINT REPORTS
      ================================= */}

      <h2 style={{ color: "#d32f2f" }}>
        Complaint Reports
      </h2>

      {complaints.length === 0 ? (
        <p>No complaints received.</p>
      ) : (
        complaints.map((complaint) => (
          <div
            key={complaint._id}
            style={{
              background: "#fff",
              padding: "20px",
              margin: "15px 0",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>
              {complaint.complaintType}
            </h3>

            <p>
              <b>Location:</b>{" "}
              {complaint.location}
            </p>

            <p>
              <b>Description:</b>{" "}
              {complaint.description}
            </p>

            <p>
              <b>Received:</b>{" "}
              {complaint.createdAt
                ? new Date(
                    complaint.createdAt
                  ).toLocaleString()
                : "Unknown"}
            </p>

            <p>
              <b>Status:</b>{" "}
              {complaint.solved
                ? "Resolved"
                : "Pending"}
            </p>

            {/* SOLVED CHECKBOX */}
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "15px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              <input
                type="checkbox"
                checked={complaint.solved === true}
                onChange={(e) =>
                  solveComplaint(
                    complaint._id,
                    e.target.checked
                  )
                }
                style={{
                  width: "18px",
                  height: "18px",
                }}
              />

              Solved
            </label>
          </div>
        ))
      )}

      {/* =================================
          COLLECTION REQUESTS
      ================================= */}

      <h2
        style={{
          color: "#1976d2",
          marginTop: "40px",
        }}
      >
        Collection Requests
      </h2>

      {requests.length === 0 ? (
        <p>No collection requests received.</p>
      ) : (
        requests.map((request) => (
          <div
            key={request._id}
            style={{
              background: "#fff",
              padding: "20px",
              margin: "15px 0",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>
              Collection Request
            </h3>

            <p>
              <b>Pickup Address:</b>{" "}
              {request.pickupAddress}
            </p>

            <p>
              <b>Waste Type:</b>{" "}
              {request.wasteType}
            </p>

            <p>
              <b>Time Slot:</b>{" "}
              {request.timeSlot}
            </p>

            <p>
              <b>Notes:</b>{" "}
              {request.notes || "No notes"}
            </p>

            <p>
              <b>Received:</b>{" "}
              {request.createdAt
                ? new Date(
                    request.createdAt
                  ).toLocaleString()
                : "Unknown"}
            </p>

            <p>
              <b>Status:</b>{" "}
              {request.solved
                ? "Completed"
                : "Pending"}
            </p>

            {/* SOLVED CHECKBOX */}
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "15px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              <input
                type="checkbox"
                checked={request.solved === true}
                onChange={(e) =>
                  solveRequest(
                    request._id,
                    e.target.checked
                  )
                }
                style={{
                  width: "18px",
                  height: "18px",
                }}
              />

              Solved
            </label>
          </div>
        ))
      )}
    </div>
  );
}

export default Reports;