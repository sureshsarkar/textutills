import "./styles.css";
import Signup from "./pages/Signup";
import Calculator from "./pages/Calculator";
import Textutils from "./pages/Textutils";
import Header from "./compoments/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Translator from "./pages/Translator";
import Footer from "./compoments/Footer";
export default function App() {
  return (
    <>
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Textutils />} />
          <Route path="/translator" element={<Translator/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/calculator" element={<Calculator />} /> {/* 404 page */}
        </Routes>
        <Footer/>
      </Router>

      {/* <Signup /> */}
      {/* <Calculator/> */}
      {/* <Textutils /> */}
    </>
  );
}
