import { Button, FileInput, Select, TextInput } from "flowbite-react";
import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const CreatePost = () => {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl m-7 font-semibold">Create post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title Name"
            required
            id="Title"
            className="flex-1 "
          />
          <Select>
            <option value="Uncategoried">Select A Category</option>
            <option value="technology">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="business">Business & Finance</option>
            <option value="education">Education</option>
            <option value="entertainment">Entertainment</option>
            <option value="news">News</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput type="file" accept="image/*" />
          <Button
            type="button"
            className="bg-gradient-to-r from-purple-500 to-pink-500 w-60 sm:w-50 text-white"
            size="sm"
            outline
          >
            Upload Image
          </Button>
        </div>

        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          //   onChange={(value) => {
          //     setFormData({ ...formData, content: value });
          //   }}
        />
        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-full hover:bg-gradient-to-l "
        >
          Publish Post
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
