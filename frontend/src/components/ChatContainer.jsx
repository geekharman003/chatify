import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore"
import { useAuthStore } from "../store/useAuthStore.js";
import ChatHeader from "./ChatHeader.jsx";
import NoChatHistoryPlaceHolder from "./NoChatHistoryPlaceHolder.jsx"
import MessageInput from "./MessageInput.jsx";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton.jsx";
import { useRef } from "react";

function ChatContainer() {

  const {authUser} = useAuthStore();
  const {messages,getMessagesByUserId,selectedUser,isMessagesLoading} = useChatStore();

  const scrollRef = useRef(null);


  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
  },[getMessagesByUserId,selectedUser])

  useEffect(() => {
    if(scrollRef.current) {
      scrollRef.current.scrollIntoView({behavior:"smooth"});
    }
  },[messages]);



   return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
              >
                <div
                  className={`chat-bubble relative ${
                    msg.senderId === authUser._id
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {msg.image && (
                    <img src={msg.image} alt="Shared" className="rounded-lg h-48 object-cover" />
                  )}
                  {msg.text && <p className="mt-2">{msg.text}</p>}
                  <p className="text-xs mt-1 opacity-75 flex justify-end items-center gap-1">
                    {new Date(msg.createdAt).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ): isMessagesLoading ? <MessagesLoadingSkeleton /> : (
          <NoChatHistoryPlaceHolder name={selectedUser.fullName} />
        )}

        {/* scrolls the messages to top */}
        <div ref={scrollRef}></div>
      </div>
      <MessageInput />

    </>
  );
}

export default ChatContainer