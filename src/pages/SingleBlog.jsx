import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

const MASTER_PASSWORD = import.meta.env.VITE_MASTER_PASSWORD;

const PasswordModal = ({ onClose, onSubmit, error }) => {
  const [inputPassword, setInputPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(inputPassword);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Enter Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            className="w-full px-3 py-2 mb-4 border rounded"
            placeholder="Password"
            autoFocus
          />
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SingleBlog = function () {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState(null); // 'edit' or 'delete'
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSingleBlog() {
      try {
        const response = await axios.get(
          `https://blogapp-backend-vx02.onrender.com/api/v1/blogs/${id}?includePassword=true`
        );
        setBlog(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSingleBlog();
  }, [id]);

  function openPasswordModal(type) {
    if (!blog?.password) {
      if (type === "edit") {
        navigate(`/edit-blog/${id}`);
      } else if (type === "delete") {
        handleDeleteWithoutPassword();
      }
      return;
    }

    setActionType(type);
    setError("");
    setShowModal(true);
  }

  async function handleDeleteWithoutPassword() {
    try {
      await axios.delete(
        `https://blogapp-backend-vx02.onrender.com/api/v1/blogs/${id}`,
        { data: { password: blog.password || null } }
      );

      toast.success("Blog Deleted!!!");
      navigate("/blogs");
    } catch (error) {
      toast.error("Error deleting blog");
    }
  }

  async function handlePasswordSubmit(inputPassword) {
    if (inputPassword === blog.password || inputPassword === MASTER_PASSWORD) {
      setShowModal(false);
      if (actionType === "edit") {
        navigate(`/edit-blog/${id}`);
      } else if (actionType === "delete") {
        await handleDeleteWithoutPassword();
      }
    } else {
      setError("Incorrect password! Please try again.");
    }
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
      </div>
    );
  }
  if (!blog) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Blog Not Found
        </h1>
        <Link
          to="/blogs"
          className="bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
        >
          Back to All Blogs
        </Link>
      </div>
    );
  }

  const { author, content, createdAt, tags, title } = blog;

  return (
    <main>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-8">
            <Link
              to="/blogs"
              className="text-amber-500 hover:text-amber-700 mb-4 flex items-center gap-1"
            >
              <ArrowLeft />
              Back to All Blogs
            </Link>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>

            <div className="flex justify-between items-center text-gray-600 mb-6">
              <div>
                <span className="font-medium">By {author}</span>
                <span className="mx-2">.</span>
                <span>
                  {new Date(createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
                  onClick={() => openPasswordModal("edit")}
                >
                  Edit Blog
                </button>

                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
                  onClick={() => openPasswordModal("delete")}
                >
                  Delete Blog
                </button>
              </div>
            </div>
            {tags && tags.length > 0 && (
              <div className="mb-6">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mr-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="prose max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
              {content}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <PasswordModal
          onClose={() => setShowModal(false)}
          onSubmit={handlePasswordSubmit}
          error={error}
        />
      )}
    </main>
  );
};

export default SingleBlog;
