import { useState } from "react";
import { FaTruck } from "react-icons/fa";

function Req() {
  const [formData, setFormData] = useState({
    pickupAddress: "",
    wasteType: "Household Waste",
    timeSlot: "Morning",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/collection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Collection request submitted successfully!");
        console.log("Backend response:", data);

        // Clear form
        setFormData({
          pickupAddress: "",
          wasteType: "Household Waste",
          timeSlot: "Morning",
          notes: "",
        });
      } else {
        alert(data.message || "Failed to submit request");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Cannot connect to backend");
    }
  };

  return (
    <div className="form-card">
      <h2>
        <FaTruck /> Quick Collection
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="pickupAddress"
          placeholder="Pickup Address"
          value={formData.pickupAddress}
          onChange={handleChange}
          required
        />

        <select
          name="wasteType"
          value={formData.wasteType}
          onChange={handleChange}
        >
          <option>Household Waste</option>
          <option>Plastic Waste</option>
          <option>Dry Waste</option>
          <option>Wet Waste</option>
        </select>

        <select
          name="timeSlot"
          value={formData.timeSlot}
          onChange={handleChange}
        >
          <option>Morning</option>
          <option>Afternoon</option>
          <option>Evening</option>
        </select>

        <textarea
          name="notes"
          rows="5"
          placeholder="Additional Notes"
          value={formData.notes}
          onChange={handleChange}
        ></textarea>

        <button type="submit">Request Pickup</button>
      </form>
    </div>
  );
}

export default Req;