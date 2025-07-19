import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home.tsx";
import Login from "@/pages/Login.tsx";
import Register from "@/pages/Register.tsx";

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext.tsx";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while checking auth
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
