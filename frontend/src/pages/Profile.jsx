import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./profile.css";
import Footer from "../components/Footer";

function Profile() {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/profile", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err.response?.data || err);
      });
  }, []);

  const uploadImage = async () => {
    if (!image) {
      alert("Select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/profile/upload",
        formData,
        {
          withCredentials: true,
        }
      );

      setUser(res.data);
      alert("Profile Updated");
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    await axios.get(
      "http://localhost:5000/api/logout",
      {
        withCredentials: true,
      }
    );

    window.location.href = "/";
  };

  // Loading Screen
  if (!user) {
    return (
      <>
        <Navbar />
        <h2
          style={{
            textAlign: "center",
            marginTop: "100px",
          }}
        >
          Loading...
        </h2>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-banner"></div>

          <div className="profile-content">
            <img
              src={
                user.profileImage
                  ? `http://localhost:5000/uploads/${user.profileImage}`
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Profile"
              className="profile-img"
            />

            <h1 className="profile-name">
              {user.name}
            </h1>

            <p className="profile-email">
              {user.email}
            </p>

            <p className="profile-role">
              {user.role.toUpperCase()}
            </p>

            <div className="profile-stats">
              <div className="stat-card">
                <h2>12</h2>
                <p>Orders</p>
              </div>

              <div className="stat-card">
                <h2>
                  {
                    (
                      JSON.parse(
                        localStorage.getItem(
                          "wishlist"
                        )
                      ) || []
                    ).length
                  }
                </h2>
                <p>Wishlist</p>
              </div>

              <div className="stat-card">
                <h2>
                  {
                    (
                      JSON.parse(
                        localStorage.getItem(
                          "cart"
                        )
                      ) || []
                    ).length
                  }
                </h2>
                <p>Cart</p>
              </div>
            </div>

            <div className="upload-section">
              <input
                type="file"
                onChange={(e) =>
                  setImage(
                    e.target.files[0]
                  )
                }
              />

              <button
                className="upload-btn"
                onClick={uploadImage}
              >
                Upload Photo
              </button>
            </div>

            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;