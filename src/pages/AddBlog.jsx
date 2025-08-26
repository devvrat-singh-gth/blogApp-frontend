import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { SquarePen } from "lucide-react";
import { toast } from "react-toastify";

const AddBlogs = function () {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const newBlog = {
      title,
      content,
      author,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
      password: password.trim() !== "" ? password.trim() : undefined, // Only send password if it's non-empty
    };

    try {
      setIsLoading(true);
      await axios.post(
        "https://blogapp-backend-vx02.onrender.com/api/v1/blogs",
        newBlog
      );
      navigate("/blogs");
      toast("New Blog Added!!!!!!!");
    } catch (error) {
      console.log(error);
      toast("Error creating blog. Please try again!!!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="max-w-2xl mx-auto">
      <h1 className="flex items-center justify-center gap-2 text-4xl text-gray-700 font-bold mb-8 text-center dark:bg-gray-100">
        Write a New Blog <SquarePen width={32} height={32} />
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white-rounded-lg shadow-md p-6"
      >
        {/* Title */}
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Title*
          </label>
          <input
            type="text"
            id="title"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent"
            placeholder="Enter your Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Author */}
        <div className="mb-6">
          <label
            htmlFor="author"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Author*
          </label>
          <input
            type="text"
            id="author"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent"
            placeholder="Your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        {/* Content */}
        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Content*
          </label>
          <textarea
            id="content"
            required
            rows={12}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent"
            placeholder="Write your Blog Content here....."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <label
            htmlFor="tags"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Tags*
          </label>
          <input
            type="text"
            id="tags"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent"
            placeholder="Enter tags separated by commas (e.g., technology, react, programming)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Password (optional)
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent"
            placeholder="Set a password to protect this blog"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <small className="text-sm text-gray-500">
            [Current PWD: {password || "None"}]
          </small>
        </div>

        {/* Submit button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Publishing ...." : "Publish Blog"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default AddBlogs;
