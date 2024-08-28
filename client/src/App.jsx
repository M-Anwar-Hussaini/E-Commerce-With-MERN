import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import Home from "./components/Home";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
    <div className="App">
      <Toaster position="top-center" />
      <Header />
      <div className="container">
        <Routes>
        <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
