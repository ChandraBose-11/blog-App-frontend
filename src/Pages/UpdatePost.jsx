import { Button, FileInput, Select, Alert, TextInput } from "flowbite-react";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";

const CATEGORY_OPTIONS = [
  { value: "Uncategoried", label: "Uncategoried" },
  { value: "technology", label: "Technology" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "business", label: "Business & Finance" },
  { value: "education", label: "Education" },
  { value: "entertainment", label: "Entertainment" },
  { value: "news", label: "News" },
];

const UpdatePost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [formData, setFormData] = useState(null); // initially null to wait for fetch
  const [publishError, setPublishError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Prefill post data
  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/post/${postId}`);
        const post = res.data && res.data.post ? res.data.post : res.data;

        if (!post) {
          setPublishError("Failed to fetch post data");
          return;
        }

        // Normalize category to match exactly one of the options
        const matchedCategory =
          CATEGORY_OPTIONS.find(
            (opt) =>
              opt.value.toLowerCase() === (post.category || "").toLowerCase()
          )?.value || "Uncategoried";

        setFormData({
          title: post.title || "",
          content: post.content || "",
          category: matchedCategory,
        });

        if (post.image) setFile(post.image);
      } catch (err) {
        console.error("Fetch post error:", err);
        setPublishError("Failed to fetch post data");
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData) return;

    setPublishError(null);
    setSuccessMessage(null);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("category", formData.category);

      if (file && file instanceof File) data.append("image", file);

      const xhr = new XMLHttpRequest();
      xhr.open("PUT", `/api/post/update/${postId}`);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable)
          setUploadProgress(Math.round((event.loaded / event.total) * 100));
      };

      xhr.onload = () => {
        const res = JSON.parse(xhr.responseText);
        if (xhr.status !== 200) {
          setPublishError(res.message);
        } else {
          setSuccessMessage("✅ Post updated successfully!");
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

  // Wait for formData to load before rendering
  if (!formData) return <div className="p-3 text-center">Loading post...</div>;

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
            <option value="" disabled>
              Select A Category
            </option>
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
            }}
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
            src={file instanceof File ? URL.createObjectURL(file) : file}
            alt="preview"
            className="w-full h-72 object-cover"
          />
        )}

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
          Update
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

export default UpdatePost;
