import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Button, TextInput } from "flowbite-react";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../Redux/Slice/userSlice";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const filePickerRef = useRef();

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(
    currentUser?.profilePicture || ""
  );
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setImageFileUrl(currentUser.profilePicture || "");
      setFormData({
        username: currentUser.username || "",
        email: currentUser.email || "",
        password: "",
      });
    }
  }, [currentUser]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
      setImageUploadProgress(0);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      dispatch(updateStart());

      const data = new FormData();
      data.append("username", formData.username);
      data.append("email", formData.email);
      if (formData.password) data.append("password", formData.password);
      if (imageFile) data.append("profilePicture", imageFile);

      const res = await axios.put(`/api/user/update/${currentUser._id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setImageUploadProgress(percent);
        },
      });

      // Keep existing image if backend does not return profilePicture
      setImageFileUrl(res.data.profilePicture || currentUser.profilePicture);

      // Update Redux store
      dispatch(updateSuccess(res.data));

      // Clear password and file
      setImageFile(null);
      setFormData((prev) => ({ ...prev, password: "" }));
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Update failed");
      dispatch(updateFailure(err.response?.data?.message || err.message));
    }
  };

  if (!currentUser) return <div className="text-center p-5">Loading...</div>;

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageUploadProgress > 0 && imageUploadProgress < 100 && (
            <CircularProgressbar
              value={imageUploadProgress}
              text={`${imageUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imageUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || "/default-avatar.png"}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageUploadProgress > 0 && imageUploadProgress < 100
                ? "opacity-60"
                : ""
            }`}
          />
        </div>

        {error && <Alert color="failure">{error}</Alert>}

        <TextInput
          type="text"
          id="username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="email"
          placeholder="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:bg-gradient-to-l"
          outline
          pill
        >
          Update
        </Button>
      </form>
       <div className="text-red-500 flex justify-between mt-5">
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>

    
  );
};

export default DashProfile;
