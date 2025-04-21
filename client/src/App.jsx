import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import URLShortener from "./pages/URLShortener";
import UrlDetails from "./pages/UrlDetails";
// import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<URLShortener />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/urls/:shortUrl" element={<UrlDetails />} />
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
