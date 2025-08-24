import { useState, useEffect } from "react";
import apiCall from "#lib/axios"; // your axios instance
import { toast } from "react-toastify";
import Toast from "#utils/toastService";
import { useDispatch } from "react-redux";
import { setProfile } from "../store/userSlice";

export default function Profile() {
  const [formData, setFormData] = useState({
    fullName: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  // Load profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await apiCall.get("/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Set local state for form
        setFormData({
          fullName: data?.data?.fullName || "",
          image: null,
        });

        // ✅ Dispatch actual API data, not formData
        dispatch(
          setProfile({
            fullName: data?.data?.fullName,
            image: data?.data?.image, // assuming backend sends image URL
          })
        );
      } catch (err) {
        console.log({ err });
        if (err.response?.data?.statusCode === 401) {
          return Toast.error("Unauthorized access");
        }
        return Toast.error(err?.response?.data?.message);
      }
    };
    fetchProfile();
  }, [dispatch, token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const body = new FormData();
      body.append("fullName", formData.fullName);
      if (formData.image) {
        body.append("image", formData.image);
      }

      const response = await apiCall.post("/profile", body, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // Dispatch the updated profile data to Redux
      dispatch(setProfile(response.data.data));
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
      console.log({ err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Profile</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="fullName"
            className="form-control"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Profile Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
