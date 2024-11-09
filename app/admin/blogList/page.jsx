"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import Link from "next/link";

const BlogPage = () => {
  const [blogData, setBlogData] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1); // Current page
  const [limit] = useState(5); // Number of blogs per page
  const [totalPages, setTotalPages] = useState(1); // Total pages (to be calculated)
  const router = useRouter();

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs?page=${page}&limit=${limit}`
      );

      setBlogData(data.data); // Assuming `data.data` is an array of blog posts
      setTotalPages(data.pagination.totalPages); // Assuming the backend returns `totalPages` in the response
    } catch (err) {
      setError("Failed to load blogs");
      console.error("Error fetching blogs:", err);
    }
  };

  const handleEdit = (id) => {
    router.push(`/admin/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`);
      alert("Blog post deleted successfully!");
      setBlogData(blogData.filter((blog) => blog.id !== id));
    } catch (err) {
      setError("Failed to delete blog post");
      console.error("Error deleting blog post:", err);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Blog List</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4">
        {blogData.length > 0 ? (
          blogData.map((blog) => (
            <div key={blog.id} className="p-4 border rounded-lg">
              <Link href={`/blog/${blog.id}`}>
                <h2 className="text-xl font-bold">{blog.title}</h2>
              </Link>

              <p className="text-gray-600">{blog.meta_description}</p>

              <div className="mt-4 space-x-4">
                <button
                  onClick={() => handleEdit(blog.id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No blogs found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogPage;
