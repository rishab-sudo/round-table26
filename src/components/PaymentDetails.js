import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import "./PaymentDetails.css"

const PaymentDetails = () => {

  const location = useLocation();

  const formData = location.state?.formData;
  const file = location.state?.file;

  // Agar direct URL hit kare to home par bhej do
  if (!formData) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="paymentPage">

      <h1>Registration Summary</h1>

      <div className="summaryBox">

        <p>
          <strong>Tabler Name:</strong> {formData.tablerName}
        </p>

        <p>
          <strong>Table Number:</strong> {formData.tableNumber}
        </p>

        <p>
          <strong>Spouse Name:</strong> {formData.spouseName}
        </p>

        <p>
          <strong>Circle Number:</strong> {formData.circleNumber}
        </p>

        <p>
          <strong>Travelling With Kids:</strong> {formData.travellingKids}
        </p>

        <p>
          <strong>No Of Children:</strong> {formData.noOfChildren}
        </p>

        <p>
          <strong>Child 1 Age:</strong> {formData.child1Age}
        </p>

        <p>
          <strong>Child 2 Age:</strong> {formData.child2Age}
        </p>

        <p>
          <strong>Child 3 Age:</strong> {formData.child3Age}
        </p>

        <p>
          <strong>Travelling With Maid:</strong> {formData.travellingMaid}
        </p>

        <p>
          <strong>Message:</strong> {formData.chairmanMessage}
        </p>

      </div>

      <div className="paymentBox">

        <div className="left">
          <h2>Scan QR To Pay</h2>

          <p>
            Complete your payment and upload
            payment screenshot below.
          </p>
        </div>

        <div className="right">
          <img
            src={require("../assets/round-logo.png")}
            alt="QR Code"
          />
        </div>

      </div>

      <div className="uploadSS">
        <label>Upload Payment Screenshot</label>

        <input
          type="file"
          accept="image/*"
        />
      </div>

      <button>
        Confirm Registration
      </button>

    </div>
  );
};

export default PaymentDetails;