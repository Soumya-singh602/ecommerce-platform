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



    const adminId = String(
        import.meta.env.VITE_ADMIN_ID
    );



    useEffect(() => {



        if (!adminId) {


            console.log(
                "ADMIN ID MISSING"
            );


            return;

        }



        console.log(
            "ADMIN CONTEXT SOCKET START"
        );



        const socket = connectChatSocket(


            adminId,


            "all",


            (message) => {



                console.log(
                    "ADMIN GLOBAL MESSAGE:",
                    message
                );



                console.log(
                    "SENDER:",
                    message.sender_id
                );




                // admin ka apna message ignore

                if(
                    String(message.sender_id)
                    ===
                    String(adminId)
                ){


                    console.log(
                        "OWN MESSAGE IGNORE"
                    );


                    return;

                }




                console.log(
                    "SHOW NOTIFICATION"
                );



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



            if(socketRef.current){


                disconnectChatSocket(
                    socketRef.current
                );


            }


            socketRef.current = null;


        };



    }, [adminId]);





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