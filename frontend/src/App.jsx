import { Navigate, Route, Routes } from "react-router"
import ChatPage from "./pages/ChatPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import { useAuthStore } from "./store/useAuthStore.js"
import { useEffect } from "react"
import PageLoader from "./components/PageLoader.jsx"
import { Toaster } from "react-hot-toast"

function App() {
  const {authUser,isCheckingAuth,checkAuth} = useAuthStore();

  useEffect(()=> {
    checkAuth();
  },[checkAuth])

  if(isCheckingAuth) return <PageLoader />;

  
  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
    <Routes>
      <Route path="/" element={authUser ? <ChatPage/> :  <Navigate to={"/login"}/>}></Route>
      <Route path="/login" element=  { authUser ? <Navigate to={"/"}/> : <LoginPage /> }></Route>
      <Route path="/signup" element={ authUser ? <Navigate to={"/"}/> : <SignUpPage/>}></Route>
    </Routes>
    
      <Toaster />
    </div>
  )
}

export default App