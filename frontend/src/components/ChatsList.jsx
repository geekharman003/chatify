import UsersLoadingSkeleton from "./UsersLoadingSkeleton.jsx";
import NoChatsFound from "./NoChatsFound.jsx";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";

function ChatsList() {
  
  const {chatPartners,getMyChatPartners,isUsersLoading,setSelectedUser} = useChatStore();


  useEffect(()=> {
    getMyChatPartners();
  },[getMyChatPartners])

  if(isUsersLoading) return <UsersLoadingSkeleton />

  if(chatPartners.length === 0) return <NoChatsFound />

  return (
    chatPartners.map((partner) => (
        <div
          key={partner._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(partner)}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar online`}>
              <div className="size-12 rounded-full">
                <img src={partner.profilePic || "/avatar.png"} alt={partner.fullName} />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">{partner.fullName}</h4>
          </div>
        </div>
    ))
  )
}

export default ChatsList