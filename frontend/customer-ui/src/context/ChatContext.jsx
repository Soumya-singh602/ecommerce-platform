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


    const storedUser = localStorage.getItem("user");


    const user = storedUser
        ? JSON.parse(storedUser)
        : null;



    const customerId = user?.user_id
        ? String(user.user_id)
        : null;



    useEffect(() => {


        const token = localStorage.getItem("access");



        if (!token || !customerId) {


            console.log(
                "CHAT WAITING FOR LOGIN",
                {
                    token,
                    customerId
                }
            );


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



                setMessages((prev)=>[
                    ...prev,
                    message
                ]);




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


            if(socketRef.current){

                disconnectChatSocket(
                    socketRef.current
                );

            }


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