import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import Home from "./components/Home";
import { Toaster } from "react-hot-toast";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/user/Profile";

function App() {
  return (
    <Router>
    <div className="App">
      <Toaster position="top-center" />
      <Header />
      <div className="container">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/me/profile" element={<Profile />} />
        </Routes>
      </div>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
