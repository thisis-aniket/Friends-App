import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login1 from "./Components/Login/Login1";
import SignUp1 from "./Components/SignUp/SignUp1";
import DashBoard from "./Components/Dashboard/DashBoard";
import { PrivateRoute } from "./Components/PrivateRoutes/PrivateRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login1 />} />
        <Route path="/register" element={<SignUp1 />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
