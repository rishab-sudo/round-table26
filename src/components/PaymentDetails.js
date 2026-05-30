import React, { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./PaymentDetails.css";

const PaymentDetails = () => {
  const location = useLocation();
  const formData = location.state?.formData;
  const uploadedPhoto = location.state?.file;

  const [ssFile, setSsFile] = useState(null);
  const [ssError, setSsError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!formData) {
    return <Navigate to="/" replace />;
  }

  const isCouple = formData.travellingStatus === "Couple";
  const isAlone = formData.travellingStatus === "Alone";

  const handleSSUpload = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setSsFile(selected);
    setSsError("");
  };

  const handleConfirm = async () => {
    if (!ssFile) {
      setSsError("Please upload payment screenshot");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();

      // Form fields
      data.append("travellingStatus", formData.travellingStatus);
      data.append("tablerName",       formData.tablerName);
      data.append("tableName",        formData.tableName);
      data.append("shirtSize",        formData.shirtSize);
      data.append("chairmanMessage",  formData.chairmanMessage);

      // Couple-only fields
      if (isCouple) {
        data.append("numberOfBeds",    formData.numberOfBeds);
        data.append("spouseName",      formData.spouseName);
        data.append("circleNumber",    formData.circleNumber);
        data.append("travellingKids",  formData.travellingKids);
        data.append("travellingMaid",  formData.travellingMaid);

        if (formData.travellingKids === "Yes") {
          data.append("noOfChildren", formData.noOfChildren);
          if (formData.child1Age) data.append("child1Age", formData.child1Age);
          if (formData.child2Age) data.append("child2Age", formData.child2Age);
          if (formData.child3Age) data.append("child3Age", formData.child3Age);
        }
      }

      // Files
      data.append("image",             uploadedPhoto);   // couple/individual photo
      data.append("paymentScreenshot", ssFile);          // payment screenshot

      const response = await fetch("https://21maneuvers.in/send.php", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (result.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Registration Confirmed!",
          text: result.message,
          confirmButtonColor: "#25176e",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: result.message,
        });
      }

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Could not connect to server. Please try again.",
      });
    }

    setLoading(false);
  };

  return (
    <div className="paymentPage">
      <h1>Registration Summary</h1>

      <div className="summaryBox">

        <p><strong>Travelling Status:</strong> {formData.travellingStatus}</p>
        <p><strong>Tabler Name:</strong> {formData.tablerName}</p>
        <p><strong>Table Name:</strong> {formData.tableName}</p>
        <p><strong>Shirt Size:</strong> {formData.shirtSize}</p>

        {isCouple && (
          <>
            <p><strong>Number of Beds Required:</strong> {formData.numberOfBeds}</p>
            <p><strong>Spouse / Circler Name:</strong> {formData.spouseName}</p>
            <p><strong>Circle Number:</strong> {formData.circleNumber}</p>
            <p><strong>Travelling With Kids:</strong> {formData.travellingKids}</p>

            {formData.travellingKids === "Yes" && (
              <>
                <p><strong>No. of Children:</strong> {formData.noOfChildren}</p>
                {formData.child1Age && <p><strong>Child 1 Age:</strong> {formData.child1Age}</p>}
                {formData.child2Age && <p><strong>Child 2 Age:</strong> {formData.child2Age}</p>}
                {formData.child3Age && <p><strong>Child 3 Age:</strong> {formData.child3Age}</p>}
              </>
            )}

            <p><strong>Travelling With Maid:</strong> {formData.travellingMaid}</p>
          </>
        )}

        <p><strong>Chairman Message:</strong> {formData.chairmanMessage}</p>

        {uploadedPhoto && (
          <p>
            <strong>{isAlone ? "Individual Photo:" : "Couple Photo:"}</strong> {uploadedPhoto.name}
          </p>
        )}

      </div>

      <div className="paymentBox">
        <div className="left">
          <h2>Scan QR To Pay</h2>
          <p>Complete your payment and upload payment screenshot below.</p>
        </div>
        <div className="right">
          <img src={require("../assets/round-logo.png")} alt="QR Code" />
        </div>
      </div>

      <div className="uploadSS">
        <label>Upload Payment Screenshot</label>
        <input type="file" accept="image/*" onChange={handleSSUpload} />
        {ssError && <span className="error">{ssError}</span>}
      </div>

      <button onClick={handleConfirm} disabled={loading}>
        {loading ? "Submitting..." : "Confirm Registration"}
      </button>

    </div>
  );
};

export default PaymentDetails;