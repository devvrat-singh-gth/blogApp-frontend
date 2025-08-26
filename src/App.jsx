import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom"; // Corrected the import
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import AllBlogs from "./pages/AllBlogs";
import AddBlogs from "./pages/AddBlog";
import SingleBlog from "./pages/SingleBlog";
import EditBlog from "./pages/EditBlog";
import { ToastContainer } from "react-toastify";


import Navbar from "./components/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blogs" element={<AllBlogs />} />
            <Route path="/add-blog" element={<AddBlogs />} />
            <Route path="/blog/:id" element={<SingleBlog />} />
            <Route path="/edit-blog/:id" element={<EditBlog />} />
          </Routes>
        </div>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
};

export default App;
