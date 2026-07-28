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



    const adminId = "6";



    useEffect(() => {


        console.log(
            "ADMIN CONTEXT SOCKET START"
        );



        const socket = connectChatSocket(

            adminId,

            "7",


            (message) => {


                console.log(
                    "ADMIN GLOBAL MESSAGE:",
                    message
                );

                // Ignore admin's own message
                     if(String(message.sender_id) === String(adminId)){

                        return;

                    }



                setNotificationMessage(
                    message.message
                );


                setShowNotification(true);


            }

        );


        socketRef.current = socket;



        return () => {


            console.log(
                "ADMIN CONTEXT SOCKET CLEANUP"
            );


            disconnectChatSocket(
                socketRef.current
            );


            socketRef.current = null;


        };


    }, []);




    return (

        <ChatContext.Provider

            value={{

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