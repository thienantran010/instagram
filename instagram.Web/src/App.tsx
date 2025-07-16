import { Routes, Route } from "react-router-dom";
import Auth from "@/pages/Auth.tsx";
import Home from "@/pages/Home.tsx";

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext.tsx";

const ProtectedRoute = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
export default function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="/login" element={<Auth />} />
    </Routes>
  );
}
