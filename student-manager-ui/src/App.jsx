import { useState } from "react";
import ListStudents from "./pages/ListStudents";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateStudent from "./pages/CreateStudent";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SelfCheck from "./pages/selfCheck";
import Test from "./pages/Test";
import FinalTest from "./pages/FinalTest";


FinalTest

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
          <Header />
          <main style={{ minHeight: '80vh' }}>
      <Routes>
        <Route path="/" element={<ListStudents />} />

        <Route path="/add-student" element={<CreateStudent />} />
        <Route path='/self-check' element={<SelfCheck />} />
        <Route path='/test' element={<Test/>} /> 
        <Route path='/final-test' element={<FinalTest/>} />

      </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
