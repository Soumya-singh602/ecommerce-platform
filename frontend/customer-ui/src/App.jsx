import AppRoutes from "./routes/AppRoutes";
import Notification from "./components/chat/Notification";

import {
    ChatProvider,
    useChat
} from "./context/ChatContext";


function GlobalNotification(){

    const {
        showNotification,
        notificationMessage,
        setShowNotification
    } = useChat();


    return (

        <Notification

            show={showNotification}

            message={notificationMessage}

            onClose={() =>
                setShowNotification(false)
            }

        />

    );

}



export default function App(){

    return (

        <ChatProvider>

            <GlobalNotification />

            <AppRoutes />

        </ChatProvider>

    );

}