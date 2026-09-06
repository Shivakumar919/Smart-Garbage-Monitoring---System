import { useEffect, useState } from "react";

function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [lastCollectionCount, setLastCollectionCount] = useState(0);
  const [lastComplaintCount, setLastComplaintCount] = useState(0);

  const fetchNotifications = async () => {
    try {
      const [collectionResponse, complaintResponse] = await Promise.all([
        fetch("http://localhost:5000/api/collection"),
        fetch("http://localhost:5000/api/complaints"),
      ]);

      const collectionResult = await collectionResponse.json();
      const complaintResult = await complaintResponse.json();

      const collections = collectionResult.data || [];
      const complaints = complaintResult.data || [];

      // First load
      if (lastCollectionCount === 0 && lastComplaintCount === 0) {
        setLastCollectionCount(collections.length);
        setLastComplaintCount(complaints.length);
        return;
      }

      const newNotifications = [];

      // New collection request
      if (collections.length > lastCollectionCount) {
        const newRequests = collections.slice(
          0,
          collections.length - lastCollectionCount
        );

        newRequests.forEach((request) => {
          newNotifications.push({
            id: request._id,
            type: "request",
            title: "New Collection Request",
            message: `Pickup requested from ${request.pickupAddress}`,
            time: new Date(request.createdAt).toLocaleString(),
          });
        });
      }

      // New complaint
      if (complaints.length > lastComplaintCount) {
        const newComplaints = complaints.slice(
          0,
          complaints.length - lastComplaintCount
        );

        newComplaints.forEach((complaint) => {
          newNotifications.push({
            id: complaint._id,
            type: "complaint",
            title: "New Complaint",
            message: `${complaint.complaintType} reported at ${complaint.location}`,
            time: new Date(complaint.createdAt).toLocaleString(),
          });
        });
      }

      if (newNotifications.length > 0) {
        setNotifications((prev) => [
          ...newNotifications,
          ...prev,
        ]);
      }

      setLastCollectionCount(collections.length);
      setLastComplaintCount(complaints.length);
    } catch (error) {
      console.error("Notification error:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(fetchNotifications, 5000);

    return () => clearInterval(interval);
  }, [lastCollectionCount, lastComplaintCount]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          fontSize: "24px",
          color: "#222",
        }}
      >
        Notifications
      </h2>

      {notifications.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            color: "#777",
            padding: "20px",
          }}
        >
          No new notifications
        </p>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            style={{
              padding: "15px",
              marginBottom: "12px",
              borderRadius: "10px",
              backgroundColor:
                notification.type === "complaint"
                  ? "#fff1f1"
                  : "#eef7ff",
              borderLeft:
                notification.type === "complaint"
                  ? "5px solid #e53935"
                  : "5px solid #2196f3",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <h3
              style={{
                margin: "0 0 8px",
                fontSize: "17px",
                color:
                  notification.type === "complaint"
                    ? "#d32f2f"
                    : "#1976d2",
              }}
            >
              {notification.title}
            </h3>

            <p
              style={{
                margin: "5px 0",
                fontSize: "15px",
                color: "#444",
              }}
            >
              {notification.message}
            </p>

            <small
              style={{
                color: "#888",
                fontSize: "12px",
              }}
            >
              {notification.time}
            </small>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminNotifications;