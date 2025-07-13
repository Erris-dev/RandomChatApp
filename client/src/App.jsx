import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore.js";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

import Login from "./components/pages/login.jsx";
import Register from "./components/pages/register.jsx";
import Home from "./components/pages/user/home.jsx";
import ChatBox from "./components/templates/chatBox.jsx";
import EditProfile from "./components/pages/user/editProfile.jsx";

import UserLayout from "./components/templates/userLayout.jsx";

function App() {
  const { authUser, checkAuth, getMe, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={!authUser ? <Register /> : <Navigate to="/home" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/home" />} />

        {/* Protected Routes with Shared Layout */}
        {authUser && (
          <Route path="/" element={<UserLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="chat" element={<ChatBox />} />
            <Route path="settings/edit-profile" element={<EditProfile />} />
          </Route>
        )}
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to={authUser ? "/home" : "/login"} />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
