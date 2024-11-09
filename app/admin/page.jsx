"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Page = () => {
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogStats();
  }, []);

  const fetchBlogStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs`
      ); // Adjust URL to your API endpoint

      // Calculate stats from the response data
      const blogs = response.data.data || [];

      const totalPosts = blogs.length;
      const publishedPosts = blogs.filter(
        (blog) => blog.status === "published"
      ).length;
      const draftPosts = blogs.filter((blog) => blog.status === "draft").length;

      setStats({
        total: totalPosts,
        published: publishedPosts,
        drafts: draftPosts,
      });
    } catch (err) {
      console.error("Error fetching blog stats:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <main className="flex-1 p-6 bg-gray-50">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            Error loading stats: {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium">Total Posts</h3>
            <p className="text-3xl font-bold mt-2">
              {loading ? (
                <span className="animate-pulse">...</span>
              ) : (
                stats.total
              )}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium">Published Posts</h3>
            <p className="text-3xl font-bold mt-2">
              {loading ? (
                <span className="animate-pulse">...</span>
              ) : (
                stats.published
              )}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium">Draft Posts</h3>
            <p className="text-3xl font-bold mt-2">
              {loading ? (
                <span className="animate-pulse">...</span>
              ) : (
                stats.drafts
              )}
            </p>
          </div>
        </div>

        {/* Optional: Refresh Button */}
        <button
          onClick={fetchBlogStats}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh Stats"}
        </button>
      </main>
    </div>
  );
};

export default Page;
