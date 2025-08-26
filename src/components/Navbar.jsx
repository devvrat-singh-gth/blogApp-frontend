import { Link } from "react-router";

const Navbar = function () {
  return (
    <header className="bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-3xl font-serif">
            Blog App
          </Link>
          <nav className="space-x-6">
            <Link
              to="/"
              className="relative text-white text-2xl font-semibold hover:text-amber-700 transition-colors after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-amber-700 hover:after:w-full after:transition-all"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="relative text-white text-2xl font-semibold hover:text-amber-700 transition-colors after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-amber-700 hover:after:w-full after:transition-all"
            >
              About
            </Link>
            <Link
              to="/blogs"
              className="relative text-white text-2xl font-semibold hover:text-amber-700 transition-colors after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-amber-700 hover:after:w-full after:transition-all"
            >
              Blogs
            </Link>
            <Link
              to="/add-blog"
              className="relative text-white text-2xl font-semibold hover:text-amber-700 transition-colors after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-amber-700 hover:after:w-full after:transition-all"
            >
              Add Blog
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
