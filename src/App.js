import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import Project from "./components/Project";
import { Home } from "./components/Home";
import { AuthContextProvider } from "./context/AuthContext";
import Protected from "./components/Protected";
import AOS from "aos";
import "aos/dist/aos.css";
import SignupAuth from "./components/SignupAuth";
import Explore from "./components/Explore";
import Yoursession from "./components/Yoursession";
import Profile from "./components/Profile";

function App() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <div className="App">
      <AuthContextProvider>
        {visible ? <Navbar /> : <div className="nav-app"></div>}
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/project"
              element={
                <Protected>
                  <Project />
                </Protected>
              }
            />
            <Route path="/signupauth" element={<SignupAuth />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/yoursession" element={<Yoursession />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
        <Footer />
      </AuthContextProvider>
    </div>
  );
}

export default App;
