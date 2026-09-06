import { useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

function Complain() {
  const [formData, setFormData] = useState({
    complaintType: "",
    location: "",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("complaintType", formData.complaintType);
      data.append("location", formData.location);
      data.append("description", formData.description);

      if (formData.file) {
        data.append("file", formData.file);
      }

      const response = await fetch(
        "http://localhost:5000/api/complaints",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Complaint submitted successfully!");
        console.log("Backend response:", result);

        setFormData({
          complaintType: "",
          location: "",
          description: "",
          file: null,
        });
      } else {
        alert(result.message || "Failed to submit complaint");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Cannot connect to backend");
    }
  };

  return (
    <div className="form-card">
      <h2>
        <FaExclamationTriangle /> Report Complaint
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="complaintType"
          placeholder="Complaint Type"
          value={formData.complaintType}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          rows="5"
          placeholder="Describe the issue..."
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>

        <input
          type="file"
          name="file"
          onChange={handleChange}
        />

        <button type="submit">Submit Complaint</button>
      </form>
    </div>
  );
}

export default Complain;