import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  text: "",
  activeTab: "chats",
  messages: [],
  lastReceivedMessage: null,
  suggestions: [],
  chatPartners: [],
  contacts: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  setText: (text) => {
    set({ text });
  },

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ contacts: res.data });
    } catch (error) {
      set({ contacts: [] });
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");

      set({ chatPartners: res.data });
    } catch (error) {
      set({ chatPartners: [] });

      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });

    try {
      const res = await axiosInstance.get(`/messages/${userId}`);

      set({ messages: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser } = get();
    const { authUser } = useAuthStore.getState();

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };

    set((state) => ({
      messages: [...state.messages, optimisticMessage],
    }));
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData,
      );

      set((state) => ({
        messages: state.messages.map((msg) =>
          msg._id === tempId ? res.data : msg,
        ),
      }));
    } catch (error) {
      set((state) => ({
        messages: state.messages.filter((msg) => msg._id !== tempId),
      }));
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  getLastReceivedMessage: () => {
    const { authUser } = useAuthStore.getState();
    const { messages } = get();

    let lastMessage = null;

    messages.forEach((msg) => {
      if (msg.senderId !== authUser._id && msg.text) {
        lastMessage = msg;
      }
    });

    set({ lastReceivedMessage: lastMessage });
  },

  generateAutoSuggestions: async () => {
    const lastReceivedMessage = get().lastReceivedMessage;
    if (!lastReceivedMessage) return;

    try {
      const res = await axiosInstance.post("/messages/suggestions", {
        lastReceivedMessage: lastReceivedMessage.text,
      });

      set({ suggestions: res.data });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error generating suggestions",
      );
      set({ suggestions: [] });
    }
  },

  subscribeToMessages: () => {
    const selectedUser = get().selectedUser;

    // if no user is selected,we will not listen for newMessage event
    if (!selectedUser) return;

    const { socket } = useAuthStore.getState();

    socket.on("newMessage", (newMessage) => {
      // if selected user is not sender then return
      
      if (newMessage.senderId !== selectedUser._id) return;
      set((state) => ({
        messages: [...state.messages, newMessage],
      }));

      const notificationSound = new Audio("/sounds/notification.mp3");

      if (get().isSoundEnabled) {
        notificationSound.currentTime = 0;
        notificationSound
          .play()
          .catch(() => console.log("error in playing notification sound"));
      }
    });
  },

  unsubscribeFromMessages: () => {
    const { socket } = useAuthStore.getState();

    socket.off("newMessage");
  },
}));
