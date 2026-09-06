import { useParams, useNavigate } from "react-router-dom";

function BinDetails() {
  const { binId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="bin-details">

      <button onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h1>Smart Bin Details</h1>

      <div className="details-card">
        <h2>{binId}</h2>

        <p>
          <strong>Bin ID:</strong> {binId}
        </p>

        <p>
          <strong>Status:</strong> Active
        </p>

        <p>
          <strong>Location:</strong> LB Nagar
        </p>

        <p>
          <strong>Fill Level:</strong> 98%
        </p>
      </div>

    </div>
  );
}

export default BinDetails;