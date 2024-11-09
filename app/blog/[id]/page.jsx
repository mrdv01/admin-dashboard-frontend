"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Calendar, Clock, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`
        );
        setBlog(data.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load blog post.");
        console.error("Error fetching blog post:", err);
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (isLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-gray-600">Blog post not found.</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Convert tags string to array if it's a string, or provide empty array as fallback
  const tagsArray = blog.tags
    ? typeof blog.tags === "string"
      ? blog.tags.split(",").map((tag) => tag.trim())
      : Array.isArray(blog.tags)
      ? blog.tags
      : []
    : [];

  return (
    <article className="p-6 max-w-4xl mx-auto">
      {/* Admin Panel Link */}
      <Link
        href="/admin/blogList"
        className="inline-flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Admin Panel</span>
      </Link>

      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">{blog.title}</h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
          {blog.created_at && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(blog.created_at)}</span>
            </div>
          )}
          {blog.read_time && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{blog.read_time} min read</span>
            </div>
          )}
        </div>
      </header>

      {/* Meta Description */}
      {blog.meta_description && (
        <div className="mb-8">
          <p className="text-lg text-gray-600 leading-relaxed">
            {blog.meta_description}
          </p>
        </div>
      )}

      {/* Main Content */}
      <div className="prose prose-lg max-w-none">{blog.content}</div>

      {/* Video Section */}
      {blog.video_url && (
        <div className="mt-12 p-6 bg-gray-50 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Related Video</h2>
          <a
            href={blog.video_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Watch on YouTube
          </a>
        </div>
      )}

      {/* Tags */}
      {tagsArray.length > 0 && (
        <div className="mt-8">
          <div className="flex flex-wrap gap-2">
            {tagsArray.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default BlogDetailPage;
