import { createContext, useContext, useEffect, useRef, useState } from "react";

import {
    connectChatSocket,
    disconnectChatSocket
} from "../services/chatSocket";


const ChatContext = createContext();



export const ChatProvider = ({ children }) => {


    const socketRef = useRef(null);


    const [messages, setMessages] = useState([]);


    const [showNotification, setShowNotification] = useState(false);

    const [notificationMessage, setNotificationMessage] = useState("");



    const adminId = "6";


    const user = JSON.parse(
        localStorage.getItem("user")
    );


    const customerId = String(
        user?.user_id
    );



    useEffect(() => {


        if (!customerId) {
            return;
        }



        const socket = connectChatSocket(

            adminId,

            customerId,


            (message) => {


                console.log(
                    "GLOBAL MESSAGE:",
                    message
                );



                // Add incoming message to chat
                setMessages((prev)=>[
                    ...prev,
                    message
                ]);




                // Notification only for admin messages
                if(
                    String(message.sender_id) !== String(customerId)
                ){


                    setNotificationMessage(
                        message.message
                    );


                    setShowNotification(true);


                }


            }

        );



        socketRef.current = socket;



        return () => {


            disconnectChatSocket(
                socketRef.current
            );


            socketRef.current = null;


        };


    }, [customerId]);





    return (

        <ChatContext.Provider

            value={{

                socketRef,


                messages,

                setMessages,


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