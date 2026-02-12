import { useAuthStore } from "../store/useAuthStore";
import { LoaderIcon } from "lucide-react";

function ChatPage() {

  const {logout,isLoggingOut} = useAuthStore();


  return (
    <button style={{zIndex:10}} onClick={logout}>{isLoggingOut ? <LoaderIcon className="w-full h-5 animate-spin text-center" /> : "Logout"}</button>
  )
}

export default ChatPage