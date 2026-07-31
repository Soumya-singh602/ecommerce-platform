import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState
} from "react";

import {
    connectChatSocket,
    disconnectChatSocket
} from "../services/chatSocket";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

    const socketRef = useRef(null);

    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    const adminId = String(import.meta.env.VITE_ADMIN_ID);

    const user = JSON.parse(localStorage.getItem("user"));

    const customerId = user?.user_id
        ? String(user.user_id)
        : null;

    useEffect(() => {

        if (!adminId || !customerId) {

            console.log("ADMIN CHAT WAITING...", {
                adminId,
                customerId
            });

            return;
        }

        console.log("ADMIN CONTEXT SOCKET START");

        const socket = connectChatSocket(

            adminId,
            customerId,

            (message) => {

                console.log("ADMIN GLOBAL MESSAGE:", message);
                console.log("Sender:", message.sender_id);

                // Ignore messages sent by admin himself
                if (String(message.sender_id) === String(adminId)) {

                    console.log("OWN MESSAGE - IGNORE");
                    return;

                }

                console.log("SHOW NOTIFICATION");

                setNotificationMessage(message.message);
                setShowNotification(true);

            }

        );

        socketRef.current = socket;

        return () => {

            console.log("ADMIN CONTEXT SOCKET CLEANUP");

            if (socketRef.current) {

                disconnectChatSocket(socketRef.current);

            }

            socketRef.current = null;

        };

    }, [adminId, customerId]);

    return (

        <ChatContext.Provider
            value={{
                socketRef,
                showNotification,
                setShowNotification,
                notificationMessage
            }}
        >

            {children}

        </ChatContext.Provider>

    );

};

export const useChat = () => useContext(ChatContext);