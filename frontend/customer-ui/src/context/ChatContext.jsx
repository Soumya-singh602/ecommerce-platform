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



    const [messages, setMessages] = useState([]);


    const [
        showNotification,
        setShowNotification
    ] = useState(false);



    const [
        notificationMessage,
        setNotificationMessage
    ] = useState("");



    const [
        customerId,
        setCustomerId
    ] = useState(null);




    const adminId = String(
        import.meta.env.VITE_ADMIN_ID
    );





    // =========================
    // LOAD LOGIN USER
    // =========================

    useEffect(() => {


        const loadUser = () => {


            const storedUser =
                localStorage.getItem("user");



            console.log(
                "LOAD USER:",
                storedUser
            );



            if(storedUser){


                const user =
                    JSON.parse(storedUser);



                setCustomerId(
                    String(user.user_id)
                );


            }


        };



        loadUser();



        window.addEventListener(
            "login",
            loadUser
        );



        return () => {


            window.removeEventListener(
                "login",
                loadUser
            );


        };


    }, []);







    // =========================
    // CONNECT SOCKET
    // =========================


    useEffect(() => {


        const token =
            localStorage.getItem("access");



        if(
            !token ||
            !customerId
        ){


            console.log(
                "CHAT WAITING FOR LOGIN",
                {
                    token,
                    customerId
                }
            );


            return;

        }




        console.log(
            "CONNECT CUSTOMER CHAT",
            {
                adminId,
                customerId
            }
        );





        const socket =
            connectChatSocket(

                adminId,

                customerId,


                (message)=>{


                    console.log(
                        "GLOBAL MESSAGE:",
                        message
                    );





                    // duplicate message remove

                    setMessages((prev)=>{


                        const exists =
                            prev.some(
                                item =>
                                item.id === message.id
                            );



                        if(exists){

                            return prev;

                        }



                        return [
                            ...prev,
                            message
                        ];


                    });






                    console.log(
                        "CHECK NOTIFICATION",
                        {
                            sender:
                            message.sender_id,

                            customer:
                            customerId
                        }
                    );





                    // other user message

                    if(

                        String(message.sender_id)
                        !==
                        String(customerId)

                    ){



                        console.log(
                            "SHOW CUSTOMER NOTIFICATION"
                        );



                        setNotificationMessage(
                            message.message
                        );



                        setShowNotification(
                            true
                        );


                    }



                }


            );





        socketRef.current =
            socket;







        return ()=>{


            console.log(
                "CHAT SOCKET CLEANUP"
            );



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


                notificationMessage,


                setNotificationMessage


            }}


        >


            {children}


        </ChatContext.Provider>


    );


};





export const useChat = () =>
    useContext(ChatContext);