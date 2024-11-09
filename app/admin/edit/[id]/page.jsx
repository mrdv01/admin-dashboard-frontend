"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

const EditBlogPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    video_url: "",
    meta_title: "",
    meta_description: "",
    tags: "",
    status: "draft",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Fetch the blog data when the component mounts
    const fetchBlogData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`
        );

        // Access the first object in the data array
        console.log(data.data);
        setFormData(data.data); // Assuming `data.data` is an array containing one blog post object
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load blog data.");
        console.error("Error fetching blog data:", err);
        setIsLoading(false);
      }
    };

    fetchBlogData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`,
        formData
      );
      alert("Blog post updated successfully!");
      router.push("/admin");
    } catch (err) {
      setError("Failed to update blog post.");
      console.error("Error updating blog post:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <p>Loading blog data...</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Edit Blog Post</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Blog Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Blog Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium mb-2">Image URL</label>
          <input
            type="url"
            name="image_url"
            value={formData.image_url}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Video URL */}
        <div>
          <label className="block text-sm font-medium mb-2">Video URL</label>
          <input
            type="url"
            name="video_url"
            value={formData.video_url}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter YouTube or Vimeo URL"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
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
        <div>
          <label className="block text-sm font-medium mb-2">Meta Title</label>
          <input
            type="text"
            name="meta_title"
            value={formData.meta_title}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Meta Description
          </label>
          <textarea
            name="meta_description"
            value={formData.meta_description}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 h-24"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium mb-2">Tags</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter tags separated by commas"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2 bg-blue-600 text-white rounded-lg ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          } transition-colors`}
        >
          {isSubmitting ? "Updating..." : "Update Blog Post"}
        </button>
      </form>
    </div>
  );
};

export default EditBlogPage;
