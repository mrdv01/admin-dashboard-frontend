"use client";

import { assets } from "@/Assets/assets";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";

// Configure Axios with the base URL from the environment variable
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const AddBlogPage = () => {
  const initialFormState = {
    title: "",
    image_url: "",
    video_url: "",
    meta_title: "",
    meta_description: "",
    tags: "",
    status: "draft",
    content: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      if (!formData.title.trim()) {
        throw new Error("Title is required");
      }

      if (!formData.image_url.trim()) {
        throw new Error("Thumbnail image is required");
      }

      if (!formData.content.trim()) {
        throw new Error("Content is required");
      }

      // Send data using axios
      const response = await api.post("/blogs", formData);

      if (response.data) {
        // Reset form on success
        setFormData(initialFormState);
        alert("Blog post created successfully!");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to create blog post";
      setError(errorMessage);
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 sm:p-12 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Create a New Blog Post</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image URL */}
        <div className="mt-4">
          <label className="text-xl">Image URL</label>
          <input
            type="url"
            name="image_url"
            value={formData.image_url}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Image URL"
            required
          />
        </div>

        {/* Blog Title */}
        <p className="text-xl mt-4">Blog Title</p>
        <input
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />

        {/* Video URL (Optional) */}
        <div className="mt-4">
          <label className="text-xl">Video URL (Optional)</label>
          <input
            type="url"
            name="video_url"
            value={formData.video_url}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter YouTube or Vimeo URL"
          />
        </div>

        {/* Blog Content */}
        <div className="mt-4">
          <label className="text-xl">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[200px]"
            placeholder="Write your blog content here..."
            required
          />
        </div>

        {/* SEO Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-medium">SEO Settings</h2>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Meta Title</label>
            <input
              type="text"
              name="meta_title"
              value={formData.meta_title}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter meta title"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Meta Description
            </label>
            <textarea
              name="meta_description"
              value={formData.meta_description}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 h-24"
              placeholder="Enter meta description"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Tags</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter tags separated by commas"
            />
          </div>
        </div>

        {/* Publish Options */}
        <div className="flex items-center justify-between pt-6">
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="draft">Save as Draft</option>
            <option value="published">Publish</option>
          </select>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 bg-blue-600 text-white rounded-lg 
              ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700"
              } 
              transition-colors`}
          >
            {isSubmitting
              ? "Saving..."
              : formData.status === "published"
              ? "Publish Blog"
              : "Save Draft"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlogPage;
