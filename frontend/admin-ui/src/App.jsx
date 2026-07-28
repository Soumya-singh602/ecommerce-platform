import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";

import {
    ChatProvider
} from "./context/ChatContext";

import Notification from "./components/chat/Notification";

import {
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

            onClose={()=>
                setShowNotification(false)
            }

        />

    );

}




export default function App(){


    return (

        <BrowserRouter>

            <ChatProvider>

                <GlobalNotification />

                <AppRoutes />

            </ChatProvider>

        </BrowserRouter>

    );

}