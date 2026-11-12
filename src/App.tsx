import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Decor from "./pages/Decor";

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* / = tela inicial; /:produto = tela do produto (produto inexistente volta para /). */}
      <Route path="/:produto?" element={<Decor />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
