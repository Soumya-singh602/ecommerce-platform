import api from "./axios";

// ==============================
// Conversation List
// ==============================

export const getConversations = async (userId) => {

    const response = await api.get(
        `/chat/conversations/${userId}/`
    );

    return response.data;

};

// ==============================
// Chat History
// ==============================

export const getChatHistory = async (

    user1,

    user2

) => {

    const response = await api.get(

        `/chat/history/${user1}/${user2}/`

    );

    return response.data;

};

// ==============================
// Mark Messages Read
// ==============================

export const markMessagesRead = async (

    senderId,

    receiverId

) => {

    const response = await api.post(

        `/chat/read/${senderId}/${receiverId}/`

    );

    return response.data;

};

// ==============================
// Dashboard
// ==============================

export const getChatDashboard = async () => {

    const response = await api.get(
        "/chat/dashboard/"
    );

    return response.data;

};