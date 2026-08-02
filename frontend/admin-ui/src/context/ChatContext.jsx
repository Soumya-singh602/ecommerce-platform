import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState
} from "react";

import {
    connectDashboardSocket,
    disconnectChatSocket
} from "../services/chatSocket";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

    const socketRef = useRef(null);

    const [showNotification, setShowNotification] = useState(false);

    const [notificationMessage, setNotificationMessage] = useState("");

    useEffect(() => {

        console.log("ADMIN DASHBOARD SOCKET START");

        const socket = connectDashboardSocket((data) => {

            console.log("DASHBOARD EVENT:", data);

            if (data.event !== "new_message") {
                return;
            }

            setNotificationMessage(
                `Customer ${data.customer_id}: ${data.last_message}`
            );

            setShowNotification(true);

        });

        socketRef.current = socket;

        return () => {

            console.log("ADMIN DASHBOARD SOCKET CLEANUP");

            if (socketRef.current) {

                disconnectChatSocket(socketRef.current);

            }

            socketRef.current = null;

        };

    }, []);

    return (

        <ChatContext.Provider
            value={{
                socketRef,
                showNotification,
                setShowNotification,
                notificationMessage,
                setNotificationMessage
            }}
        >

            {children}

        </ChatContext.Provider>

    );

};

export const useChat = () => useContext(ChatContext);