import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
