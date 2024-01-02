import { useState } from "react";
import axios from "axios";

const Home = () => {
  const [inputData, setInputData] = useState({
    displacement: "",
    horsepower: "",
    weight: "",
    acceleration: "",
    cylinders: "",
    origin: "ASIA", // Default value for origin
    model_year: "",
  });

  const [result, setResult] = useState(null);

  const handleInputChange = (e, key) => {
    let value = e.target.value;

    // Convert to appropriate data type
    if (
      [
        "displacement",
        "horsepower",
        "weight",
        "acceleration",
        "model_year",
      ].includes(key)
    ) {
      value = parseFloat(value) || ""; // Set to empty string if parsing fails
    } else if (key === "cylinders") {
      value = parseInt(value, 10) || ""; // Set to empty string if parsing fails
    }

    setInputData({
      ...inputData,
      [key]: value,
    });
  };

  const handleProcessData = async () => {
    try {
      const response = await axios.post(
        "https://ephemera.cloud/restoran/prediksi_data/",
        inputData
      );
      console.log("Response:", response);

      if (response.data && response.data.hasil !== undefined) {
        setResult(response.data);
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error("Error processing data:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">PREDIKSI KONSUMSI BBM PER MIL</h1>
      <div>
        <label>Displacement:</label>
        <input
          type="number"
          value={inputData.displacement}
          onChange={(e) => handleInputChange(e, "displacement")}
        />
      </div>
      <div>
        <label>Horsepower:</label>
        <input
          type="number"
          value={inputData.horsepower}
          onChange={(e) => handleInputChange(e, "horsepower")}
        />
      </div>
      <div>
        <label>Weight:</label>
        <input
          type="number"
          value={inputData.weight}
          onChange={(e) => handleInputChange(e, "weight")}
        />
      </div>
      <div>
        <label>Acceleration:</label>
        <input
          type="number"
          value={inputData.acceleration}
          onChange={(e) => handleInputChange(e, "acceleration")}
        />
      </div>
      <div>
        <label>Cylinders:</label>
        <input
          type="number"
          value={inputData.cylinders}
          onChange={(e) => handleInputChange(e, "cylinders")}
        />
      </div>
      <div>
        <label>Origin:</label>
        <select
          value={inputData.origin}
          onChange={(e) => handleInputChange(e, "origin")}
        >
          <option value="ASIA">ASIA</option>
          <option value="EUROPE">EROPA</option>
          <option value="USA">USA</option>
        </select>
      </div>
      <div>
        <label>Model Year:</label>
        <input
          type="number"
          value={inputData.model_year}
          onChange={(e) => handleInputChange(e, "model_year")}
        />
      </div>

      <button onClick={handleProcessData}>Process Data</button>

      {result && <p>Result: {result.hasil} mpg </p>}
    </div>
  );
};

export default Home;
