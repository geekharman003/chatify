import { useAuthStore } from "../store/useAuthStore";

function ChatPage() {

  const {user,isLoggedIn} = useAuthStore();

  console.log(user)
  console.log(isLoggedIn);


  return (
    <div>ChatPage</div>
  )
}

export default ChatPage