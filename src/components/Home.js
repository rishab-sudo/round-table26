import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import Swal from "sweetalert2";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    tablerName: "",
    tableName: "",
    shirtSize: "",
    travellingStatus: "",
    spouseName: "",
    circleNumber: "",
    travellingKids: "",
    noOfChildren: "",
    child1Age: "",
    child2Age: "",
    child3Age: "",
    travellingMaid: "",
    numberOfBeds: "",
    chairmanMessage: "",
  });

  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "chairmanMessage" && value.length > 150) {
      setErrors({ ...errors, chairmanMessage: "Maximum 150 characters allowed" });
      return;
    }

    if (name === "travellingStatus" && value === "Alone") {
      setFormData({
        ...formData,
        travellingStatus: value,
        spouseName: "",
        circleNumber: "",
        travellingKids: "",
        noOfChildren: "",
        child1Age: "",
        child2Age: "",
        child3Age: "",
        travellingMaid: "",
        numberOfBeds: "",
      });
      setFile(null);
      setErrors({});
      return;
    }

    if (name === "travellingStatus" && value === "Couple") {
      setFormData({
        ...formData,
        travellingStatus: value,
        numberOfBeds: "",
      });
      setFile(null);
      setErrors({});
      return;
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleFile = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      Swal.fire({ icon: "error", title: "Invalid File", text: "Only image files are allowed" });
      return;
    }

    if (selected.size > 3 * 1024 * 1024) {
      Swal.fire({ icon: "error", title: "File Too Large", text: "Image size should be below 3MB" });
      return;
    }

    setFile(selected);
    setErrors({ ...errors, image: "" });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.travellingStatus) {
      newErrors.travellingStatus = "Please select travelling status";
    }

    if (!formData.tablerName.trim()) {
      newErrors.tablerName = "Tabler name is required";
    }

    if (!formData.tableName) {
      newErrors.tableName = "Table name is required";
    }

    if (!formData.shirtSize) {
      newErrors.shirtSize = "Please select shirt size";
    }

    // Couple-only validations
    if (formData.travellingStatus === "Couple") {
      if (!formData.numberOfBeds) {
        newErrors.numberOfBeds = "Please select number of beds";
      }

      if (!formData.spouseName.trim()) {
        newErrors.spouseName = "Circler/Spouse name required";
      }

      if (!formData.circleNumber.trim()) {
        newErrors.circleNumber = "Circle number required";
      }

      if (!formData.travellingKids) {
        newErrors.travellingKids = "Please select option";
      }

      if (formData.travellingKids === "Yes") {
        if (!formData.noOfChildren) {
          newErrors.noOfChildren = "Select number of children";
        }
        if (formData.noOfChildren >= 1 && !formData.child1Age) {
          newErrors.child1Age = "Enter Child 1 age";
        }
        if (formData.noOfChildren >= 2 && !formData.child2Age) {
          newErrors.child2Age = "Enter Child 2 age";
        }
        if (formData.noOfChildren >= 3 && !formData.child3Age) {
          newErrors.child3Age = "Enter Child 3 age";
        }
      }

      if (!formData.travellingMaid) {
        newErrors.travellingMaid = "Please select option";
      }
    }

    if (!formData.chairmanMessage.trim()) {
      newErrors.chairmanMessage = "Message is required";
    }

    if (formData.chairmanMessage.trim().length > 150) {
      newErrors.chairmanMessage = "Maximum 150 characters allowed";
    }

    if (!file) {
      newErrors.image =
        formData.travellingStatus === "Alone"
          ? "Please upload your individual photo"
          : "Please upload couple photo";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    navigate("/payment-details", {
      state: { formData, file },
    });
  };

  const isCouple = formData.travellingStatus === "Couple";
  const isAlone = formData.travellingStatus === "Alone";

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
            <h1>AAGM <span>2026</span></h1>
            <p>JAIPUR</p>
          </div>

          <form className="horizontalForm" onSubmit={handleSubmit}>
            <div className="formTitle">
              <h2>Register Now</h2>
            </div>

            {/* ROW - Travelling Status & Shirt Size */}
            <div className="formRow">
              <div className="inputBox">
                <label>Travelling Status</label>
                <select
                  name="travellingStatus"
                  value={formData.travellingStatus}
                  onChange={handleChange}
                >
                  <option value="">Select Status</option>
                  <option value="Alone">Alone</option>
                  <option value="Couple">Couple</option>
                </select>
                {errors.travellingStatus && (
                  <span className="error">{errors.travellingStatus}</span>
                )}
              </div>

              <div className="inputBox">
                <label>Shirt Size</label>
                <select
                  name="shirtSize"
                  value={formData.shirtSize}
                  onChange={handleChange}
                >
                  <option value="">Select Size</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
                {errors.shirtSize && (
                  <span className="error">{errors.shirtSize}</span>
                )}
              </div>
            </div>

            {/* ROW - Tabler Name & Table Name */}
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
                  <span className="error">{errors.tablerName}</span>
                )}
              </div>

              <div className="inputBox">
                <label>Table Name / Number</label>
                <select
                  name="tableName"
                  value={formData.tableName}
                  onChange={handleChange}
                >
                  <option value="">Select Table</option>
                  <option value="Kanpur RT 16">Kanpur RT 16</option>
                  <option value="Bareilly RT 45">Bareilly RT 45</option>
                  <option value="Pilibhit RT 74">Pilibhit RT 74</option>
                  <option value="Kanpur Cosmopolitan RT 111">Kanpur Cosmopolitan RT 111</option>
                  <option value="Kanpur Heritage RT 125">Kanpur Heritage RT 125</option>
                  <option value="Lucknow RT 136">Lucknow RT 136</option>
                  <option value="Allahabad RT 192">Allahabad RT 192</option>
                  <option value="Varanasi RT 196">Varanasi RT 196</option>
                  <option value="Lucknow Tigers RT 207">Lucknow Tigers RT 207</option>
                  <option value="Varanasi Royals RT 218">Varanasi Royals RT 218</option>
                  <option value="Patna RT 247">Patna RT 247</option>
                  <option value="Lucknow Mavericks RT 255">Lucknow Mavericks RT 255</option>
                  <option value="Varanasi Elite RT 278">Varanasi Elite RT 278</option>
                  <option value="Bhadohi RT 295">Bhadohi RT 295</option>
                  <option value="Shahjhanpur RT 298">Shahjhanpur RT 298</option>
                  <option value="Sitapur RT 318">Sitapur RT 318</option>
                  <option value="Moradabad RT 319">Moradabad RT 319</option>
                  <option value="Rudrapur RT 335">Rudrapur RT 335</option>
                  <option value="Mirzapur RT 336">Mirzapur RT 336</option>
                  <option value="Haldwani RT 348">Haldwani RT 348</option>
                  <option value="Bareilly Elite RT 364">Bareilly Elite RT 364</option>
                  <option value="Corbett RT 372">Corbett RT 372</option>
                  <option value="Kanpur Royals RT 384">Kanpur Royals RT 384</option>
                </select>
                {errors.tableName && (
                  <span className="error">{errors.tableName}</span>
                )}
              </div>
            </div>

            {/* COUPLE-ONLY FIELDS */}
            {isCouple && (
              <>
                {/* ROW - Spouse & Circle Number */}
                <div className="formRow">
                  <div className="inputBox">
                    <label>Name of Circler / Spouse</label>
                    <input
                      type="text"
                      name="spouseName"
                      placeholder="Enter name"
                      value={formData.spouseName}
                      onChange={handleChange}
                    />
                    {errors.spouseName && (
                      <span className="error">{errors.spouseName}</span>
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
                      <span className="error">{errors.circleNumber}</span>
                    )}
                  </div>
                </div>

                {/* ROW - Travelling With Kids */}
                <div className="formRow">
                  <div className="inputBox">
                    <label>Travelling With Kids</label>
                    <select
                      name="travellingKids"
                      value={formData.travellingKids}
                      onChange={handleChange}
                    >
                      <option value="">Select Option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {errors.travellingKids && (
                      <span className="error">{errors.travellingKids}</span>
                    )}
                  </div>
                </div>

                {/* CHILD DETAILS */}
                {formData.travellingKids === "Yes" && (
                  <>
                    <div className="formRow">
                      <div className="inputBox">
                        <label>No. of Children</label>
                        <select
                          name="noOfChildren"
                          value={formData.noOfChildren}
                          onChange={handleChange}
                        >
                          <option value="">Select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                        {errors.noOfChildren && (
                          <span className="error">{errors.noOfChildren}</span>
                        )}
                      </div>

                      {formData.noOfChildren >= 1 && (
                        <div className="inputBox">
                          <label>Child 1 Age</label>
                          <input
                            type="number"
                            name="child1Age"
                            value={formData.child1Age}
                            onChange={handleChange}
                            placeholder="Age"
                          />
                          {errors.child1Age && (
                            <span className="error">{errors.child1Age}</span>
                          )}
                        </div>
                      )}
                    </div>

                    {formData.noOfChildren >= 2 && (
                      <div className="formRow">
                        <div className="inputBox">
                          <label>Child 2 Age</label>
                          <input
                            type="number"
                            name="child2Age"
                            value={formData.child2Age}
                            onChange={handleChange}
                            placeholder="Age"
                          />
                          {errors.child2Age && (
                            <span className="error">{errors.child2Age}</span>
                          )}
                        </div>
                      </div>
                    )}

                    {formData.noOfChildren >= 3 && (
                      <div className="formRow">
                        <div className="inputBox">
                          <label>Child 3 Age</label>
                          <input
                            type="number"
                            name="child3Age"
                            value={formData.child3Age}
                            onChange={handleChange}
                            placeholder="Age"
                          />
                          {errors.child3Age && (
                            <span className="error">{errors.child3Age}</span>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* ROW - Travelling With Maid */}
                <div className="formRow">
                  <div className="inputBox">
                    <label>Travelling With Maid</label>
                    <select
                      name="travellingMaid"
                      value={formData.travellingMaid}
                      onChange={handleChange}
                    >
                      <option value="">Select Option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {errors.travellingMaid && (
                      <span className="error">{errors.travellingMaid}</span>
                    )}
                  </div>
                </div>

                {/* ROW - Number of Beds (Couple only) */}
                <div className="formRow">
                  <div className="inputBox">
                    <label>Number of Beds Required</label>
                    <select
                      name="numberOfBeds"
                      value={formData.numberOfBeds}
                      onChange={handleChange}
                    >
                      <option value="">Select Beds</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    {errors.numberOfBeds && (
                      <span className="error">{errors.numberOfBeds}</span>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* PHOTO - Label changes based on status */}
            {formData.travellingStatus && (
              <div className="formRow">
                <div className="inputBox fullWidth">
                  <label>
                    {isAlone ? "Upload Your Individual Photo" : "Upload One Couple Photo"}
                  </label>
                  <input type="file" accept="image/*" onChange={handleFile} />
                  {errors.image && (
                    <span className="error">{errors.image}</span>
                  )}
                </div>
              </div>
            )}

            {/* MESSAGE */}
            <div className="formRow">
              <div className="inputBox fullWidth">
                <label>A message for our Area Chairman</label>
                <textarea
                  name="chairmanMessage"
                  placeholder="Make it funky. Simple answers will invite heavy penalties during Sergeant Act."
                  value={formData.chairmanMessage}
                  onChange={handleChange}
                ></textarea>
                {errors.chairmanMessage && (
                  <span className="error">{errors.chairmanMessage}</span>
                )}
              </div>
            </div>

            <div className="buttonWrapper">
              <button type="submit">Submit Registration</button>
            </div>
          </form>
        </div>

        <div className="socialSection">
          <h3>Connect With Us</h3>
          <div className="socialIcons">
            <a href="https://www.instagram.com/rangdearea8?igsh=MTU0YmhqcmpsenE4NA==" target="_blank" rel="noreferrer" className="instagram">
              <FaInstagram />
            </a>
            <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="whatsapp">
              <FaWhatsapp />
            </a>
          </div>
        </div>

      </section>
    </>
  );
};

export default Home;