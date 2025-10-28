import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Register from "./components/forms/Register";
import Login from "./components/forms/Login";
import ProtectedAdmin from "./pages/admin/ProtectedAdmin";
import Admin from "./pages/admin/Admin";
import Booking from "./pages/admin/booking/Booking";
import User from "./pages/admin/user/User";

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
      >
        <Route path="booking" element={<Booking />} />
        <Route path="user" element={<User />} />
      </Route>
    </Routes>
  );
}
