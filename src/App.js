import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Test from "./components/Test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<CreateGroup />} />
        <Route path="/members" element={<AddMembers />} />
        <Route path="/expense" element={<XPathExpression />} />
        <Route path="/expense" element={<CenteredOverlayFrom /> } />
        <Route path="/expense" element={<XPathExpression />} /> */}
        <Route path="/" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
