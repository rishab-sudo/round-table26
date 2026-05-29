// Home.js

import React, { useState } from "react";
import Swal from "sweetalert2";
import "./Home.css";

const Home = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
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

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const mobileRegex = /^[0-9]{10}$/;

    if (!formData.firstName.trim()) {
      newErrors.firstName =
        "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName =
        "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !emailRegex.test(formData.email)
    ) {
      newErrors.email = "Invalid email";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile =
        "Mobile number required";
    } else if (
      !mobileRegex.test(formData.mobile)
    ) {
      newErrors.mobile =
        "Enter valid 10 digit mobile";
    }

    if (!formData.subject.trim()) {
      newErrors.subject =
        "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message =
        "Message is required";
    }

    if (!file) {
      newErrors.image =
        "Please upload image";
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
        "http://localhost/aagm-mail/send.php",
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
          text: "Your proposal request has been sent.",
          confirmButtonColor: "#25176e",
        });

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          mobile: "",
          subject: "",
          message: "",
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
          src="/logo.png"
          alt=""
          className="bannerLogo"
        />

        <div className="bannerContent">
          <div className="bannerHeading">
            <h4>SPONSORSHIP PROPOSAL</h4>

            <h1>
              AAGM Jaipur <span>2026</span>
            </h1>

            <p>
              Where Leadership, Fellowship &
              Purpose Converge
            </p>
          </div>

          <form
            className="horizontalForm"
            onSubmit={handleSubmit}
          >
            <div className="formTitle">
              <h2>Become A Sponsor</h2>

              <p>
                Fill the details below and our
                team will connect with you.
              </p>
            </div>

            {/* ROW 1 */}
            <div className="formRow">
              <div className="inputBox">
                <label>First Name</label>

                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                />

                {errors.firstName && (
                  <span className="error">
                    {errors.firstName}
                  </span>
                )}
              </div>

              <div className="inputBox">
                <label>Last Name</label>

                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />

                {errors.lastName && (
                  <span className="error">
                    {errors.lastName}
                  </span>
                )}
              </div>
            </div>

            {/* ROW 2 */}
            <div className="formRow">
              <div className="inputBox">
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                />

                {errors.email && (
                  <span className="error">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="inputBox">
                <label>Mobile Number</label>

                <input
                  type="tel"
                  name="mobile"
                  placeholder="Enter mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                />

                {errors.mobile && (
                  <span className="error">
                    {errors.mobile}
                  </span>
                )}
              </div>
            </div>

            {/* ROW 3 */}
            <div className="formRow">
              <div className="inputBox">
                <label>Subject</label>

                <input
                  type="text"
                  name="subject"
                  placeholder="Enter subject"
                  value={formData.subject}
                  onChange={handleChange}
                />

                {errors.subject && (
                  <span className="error">
                    {errors.subject}
                  </span>
                )}
              </div>

              <div className="inputBox">
                <label>Upload Image</label>

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
                <label>Message</label>

                <textarea
                  name="message"
                  placeholder="Write your message..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>

                {errors.message && (
                  <span className="error">
                    {errors.message}
                  </span>
                )}
              </div>
            </div>

            <div className="buttonWrapper">
              <button type="submit">
                Submit Now
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Home;