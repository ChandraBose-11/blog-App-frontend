import { Button, FileInput, Select, Alert, TextInput } from "flowbite-react";
import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";

const CreatePost = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Uncategoried",
  });
  const [publishError, setPublishError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPublishError(null);
    setSuccessMessage(null);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("category", formData.category);
      if (file) data.append("image", file);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/post/create");

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          setUploadProgress(Math.round((event.loaded / event.total) * 100));
        }
      };

      xhr.onload = () => {
        const res = JSON.parse(xhr.responseText);
        if (xhr.status !== 201) {
          setPublishError(res.message);
        } else {
          setSuccessMessage("✅ Post created successfully!");
          setTimeout(() => navigate(`/post/${res.slug}`), 1500);
        }
        setUploadProgress(null);
      };

      xhr.onerror = () => {
        setPublishError("Something went wrong");
        setUploadProgress(null);
      };

      xhr.send(data);
    } catch (err) {
      setPublishError("Something went wrong");
      setUploadProgress(null);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Title & Category */}
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            value={formData.title}
            required
            className="flex-1 min-w-0"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            className="flex-1 min-w-0"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="Uncategoried">Select A Category</option>
            <option value="technology">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="business">Business & Finance</option>
            <option value="education">Education</option>
            <option value="entertainment">Entertainment</option>
            <option value="news">News</option>
          </Select>
        </div>

        {/* Image Upload */}
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {uploadProgress !== null && (
            <div className="w-16 h-16">
              <CircularProgressbar
                value={uploadProgress}
                text={`${uploadProgress}%`}
              />
            </div>
          )}
        </div>

        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt="preview"
            className="w-full h-72 object-cover"
          />
        )}

        {/* Post Content */}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          value={formData.content}
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
        />

        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
        >
          Publish
        </Button>

        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
        {successMessage && (
          <Alert className="mt-5" color="success">
            {successMessage}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
