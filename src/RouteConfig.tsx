import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Register from "./components/forms/Register";
import Login from "./components/forms/Login";
import Admin from "./pages/admin/admin";
import ProtectedAdmin from "./pages/admin/ProtectedAdmin";

export default function RouteConfig() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="*" element={<Homepage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedAdmin>
            <Admin />
          </ProtectedAdmin>
        }
      />
    </Routes>
  );
}
