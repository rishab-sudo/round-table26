import React, { useState } from "react";
import {
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";
import Swal from "sweetalert2";
import "./Home.css";

const Home = () => {
  const [formData, setFormData] = useState({
    tablerName: "",
    tableNumber: "",
    spouseName: "",
    circleNumber: "",
    travellingKids: "",
    childrenDetails: "",
    travellingMaid: "",
    chairmanMessage: "",
  });

  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);

 const handleChange = (e) => {
  const { name, value } = e.target;

  // 80 character validation
  if (
    name === "chairmanMessage" &&
    value.length > 150
  ) {
    setErrors({
      ...errors,
      chairmanMessage:
        "Maximum 150 characters allowed",
    });

    return;
  }

  setFormData({
    ...formData,
    [name]: value,
  });

  setErrors({
    ...errors,
    [name]: "",
  });
};
  const handleFile = (e) => {
    const selected = e.target.files[0];

    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      Swal.fire({
        icon: "error",
        title: "Invalid File",
        text: "Only image files are allowed",
      });
      return;
    }

    if (selected.size > 3 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "File Too Large",
        text: "Image size should be below 3MB",
      });
      return;
    }

    setFile(selected);

    setErrors({
      ...errors,
      image: "",
    });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.tablerName.trim()) {
      newErrors.tablerName =
        "Tabler name is required";
    }

    if (!formData.tableNumber.trim()) {
      newErrors.tableNumber =
        "Table number is required";
    }

    if (!formData.spouseName.trim()) {
      newErrors.spouseName =
        "Circler/Spouse name required";
    }

    if (!formData.circleNumber.trim()) {
      newErrors.circleNumber =
        "Circle number required";
    }

    if (!formData.travellingKids) {
      newErrors.travellingKids =
        "Please select option";
    }

    if (
      formData.travellingKids === "Yes" &&
      !formData.childrenDetails.trim()
    ) {
      newErrors.childrenDetails =
        "Please enter children details";
    }

    if (!formData.travellingMaid) {
      newErrors.travellingMaid =
        "Please select option";
    }

    if (!formData.chairmanMessage.trim()) {
      newErrors.chairmanMessage =
        "Message is required";
    }
if (
  formData.chairmanMessage.length > 150
) {
  newErrors.chairmanMessage =
    "Maximum 150 characters allowed";
}
    if (!file) {
      newErrors.image =
        "Please upload couple photo";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const sendData = new FormData();

    Object.keys(formData).forEach((key) => {
      sendData.append(key, formData[key]);
    });

    sendData.append("image", file);

    try {
      const response = await fetch(
        "https://round-table26.vercel.app/send.php",
        {
          method: "POST",
          body: sendData,
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Submitted Successfully",
          text: "Your details have been submitted.",
          confirmButtonColor: "#25176e",
        });

        setFormData({
          tablerName: "",
          tableNumber: "",
          spouseName: "",
          circleNumber: "",
          travellingKids: "",
          childrenDetails: "",
          travellingMaid: "",
          chairmanMessage: "",
        });

        setFile(null);
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Unable to send form",
      });
    }
  };

  return (
    <>
      <section className="homeBanner">
        <div className="bannerOverlay"></div>

        <img
          src={require("../assets/round-logo.png")}
          alt=""
          className="bannerLogo"
        />

        <div className="bannerContent">
          <div className="bannerHeading">
            <h4>RDB</h4>

            <h1>
              AAGM <span>2026</span>
            </h1>

            <p>
             JAIPUR
            </p>
          </div>

          <form
            className="horizontalForm"
            onSubmit={handleSubmit}
          >
            <div className="formTitle">
              <h2>Register Now</h2>

            </div>

            {/* ROW 1 */}
            <div className="formRow">
              <div className="inputBox">
                <label>Name of Tabler</label>

                <input
                  type="text"
                  name="tablerName"
                  placeholder="Enter tabler name"
                  value={formData.tablerName}
                  onChange={handleChange}
                />

                {errors.tablerName && (
                  <span className="error">
                    {errors.tablerName}
                  </span>
                )}
              </div>

              <div className="inputBox">
                <label>Table Number</label>

                <input
                  type="text"
                  name="tableNumber"
                  placeholder="Enter table number"
                  value={formData.tableNumber}
                  onChange={handleChange}
                />

                {errors.tableNumber && (
                  <span className="error">
                    {errors.tableNumber}
                  </span>
                )}
              </div>
            </div>

            {/* ROW 2 */}
            <div className="formRow">
              <div className="inputBox">
                <label>
                  Name of Circler / Spouse
                </label>

                <input
                  type="text"
                  name="spouseName"
                  placeholder="Enter name"
                  value={formData.spouseName}
                  onChange={handleChange}
                />

                {errors.spouseName && (
                  <span className="error">
                    {errors.spouseName}
                  </span>
                )}
              </div>

              <div className="inputBox">
                <label>Circle Number</label>

                <input
                  type="text"
                  name="circleNumber"
                  placeholder="Enter circle number"
                  value={formData.circleNumber}
                  onChange={handleChange}
                />

                {errors.circleNumber && (
                  <span className="error">
                    {errors.circleNumber}
                  </span>
                )}
              </div>
            </div>

            {/* ROW 3 */}
            <div className="formRow">
              <div className="inputBox">
                <label>
                  Travelling With Kids
                </label>

                <select
                  name="travellingKids"
                  value={formData.travellingKids}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Option
                  </option>

                  <option value="Yes">
                    Yes
                  </option>

                  <option value="No">
                    No
                  </option>
                </select>

                {errors.travellingKids && (
                  <span className="error">
                    {errors.travellingKids}
                  </span>
                )}
              </div>

              <div className="inputBox">
                <label>
                  Travelling With Maid
                </label>

                <select
                  name="travellingMaid"
                  value={formData.travellingMaid}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Option
                  </option>

                  <option value="Yes">
                    Yes
                  </option>

                  <option value="No">
                    No
                  </option>
                </select>

                {errors.travellingMaid && (
                  <span className="error">
                    {errors.travellingMaid}
                  </span>
                )}
              </div>
            </div>

            {/* CHILD DETAILS */}
            {formData.travellingKids ===
              "Yes" && (
              <div className="formRow">
                <div className="inputBox fullWidth">
                  <label>
                    Children Details
                  </label>

                  <textarea
                    name="childrenDetails"
                    placeholder="Enter children names & ages"
                    value={
                      formData.childrenDetails
                    }
                    onChange={handleChange}
                  ></textarea>

                  {errors.childrenDetails && (
                    <span className="error">
                      {
                        errors.childrenDetails
                      }
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* PHOTO */}
            <div className="formRow">
              <div className="inputBox fullWidth">
                <label>
                 Upload One Couple Photo 
                 </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                />

                {errors.image && (
                  <span className="error">
                    {errors.image}
                  </span>
                )}
              </div>
            </div>

            {/* MESSAGE */}
            <div className="formRow">
              <div className="inputBox fullWidth">
                <label>
               A message for our Area Chairman
                </label>

                <textarea
                  name="chairmanMessage"
                  placeholder=" Make it funky. Simple answers will invite heavy penalties during Sergeant Act."
                  value={
                    formData.chairmanMessage
                  }
                  onChange={handleChange}
                ></textarea>

                {errors.chairmanMessage && (
                  <span className="error">
                    {
                      errors.chairmanMessage
                    }
                  </span>
                )}
              </div>
            </div>

            <div className="buttonWrapper">
              <button type="submit">
                Submit Registration
              </button>
            </div>
          </form>
        </div>
{/* --------------------------------- */}
        <div className="socialSection">
  <h3>Connect With Us</h3>

  <div className="socialIcons">
  

    <a
      href="https://www.instagram.com/rangdearea8?igsh=MTU0YmhqcmpsenE4NA=="
      target="_blank"
      rel="noreferrer"
      className="instagram"
    >
      <FaInstagram className="fab fa-instagram"/>
    </a>

      <a
      href="https://wa.me/919999999999"
      target="_blank"
      rel="noreferrer"
      className="whatsapp"
    >
      <FaWhatsapp className="fab fa-whatsapp"/>
    </a>
    
  </div>
</div>
      </section>
    </>
  );
};

export default Home;