import { useEffect } from "react";
import  Login  from "./components/pages/login.jsx";
import Register from "./components/pages/register.jsx";
import Home from "./components/pages/user/home.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import {Loader} from 'lucide-react';
import {Route, Routes, Navigate} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'


function App() {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  console.log({authUser});

  if(isCheckingAuth){
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }

  return (
    <div>
      
      <Routes>
        <Route path="/home" element={authUser? <Home/> : <Navigate to="/login"/>}/>
        <Route path="/signup" element={!authUser? <Register/> : <Navigate to="/home"/>}/>
        <Route path="/login" element={!authUser? <Login/> : <Navigate to="/home"/>}/>
      </Routes>

      <Toaster/>
    </div>
  )
}

export default App
