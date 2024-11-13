import { useState } from "react";
import Nav from "./components/HomePageCompo/Nav";
import Footer from "./components/HomePageCompo/Footer";
import Home from "./pages/home/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Nav />
      <Home />
      <Footer />
    </>
  );
}

export default App;
