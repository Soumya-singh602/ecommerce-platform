import {
    useState,
    useEffect,
    useCallback
} from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import ChatSidebar from "../components/chat/ChatSidebar";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";

import {
    connectChatSocket,
    disconnectChatSocket,
    sendMessage
} from "../services/chatSocket";


export default function Chat() {


    // Logged in Admin
    const currentUserId = 6;


    const [selectedUser, setSelectedUser] = useState(null);

    const [messages, setMessages] = useState([]);



    // ==========================
    // HANDLE INCOMING MESSAGE
    // ==========================

    const handleMessage = useCallback((message) => {


        console.log(
            "SOCKET MESSAGE :",
            message
        );


        setMessages((prev) => {


            const exists = prev.some(

                (item) => item.id === message.id

            );


            if (exists) {

                return prev;

            }


            return [

                ...prev,

                message

            ];


        });


    }, []);




    // ==========================
    // CONNECT SOCKET
    // ==========================

    useEffect(() => {


        if (!selectedUser?.user_id) {

            return;

        }


        console.log(

            "CONNECT CHAT:",

            currentUserId,

            selectedUser.user_id

        );


        // clear previous realtime messages
        setMessages([]);



        connectChatSocket(

            currentUserId,

            selectedUser.user_id,

            handleMessage

        );



        return () => {


            console.log(
                "CLEANUP SOCKET"
            );


            disconnectChatSocket();


        };


    }, [

        selectedUser?.user_id,

        handleMessage

    ]);





    return (

        <DashboardLayout>


            <div className="bg-white rounded-2xl shadow overflow-hidden h-[80vh] flex">



                <ChatSidebar


                    currentUserId={currentUserId}


                    selectedUser={selectedUser}


                    setSelectedUser={setSelectedUser}


                />




                <div className="flex-1 flex flex-col">



                    <ChatWindow


                        currentUserId={currentUserId}


                        selectedUser={selectedUser}


                        messages={messages}


                    />





                    <ChatInput


                        selectedUser={selectedUser}


                        onSend={(message)=>{


                            console.log(

                                "SEND MESSAGE:",

                                message

                            );


                            sendMessage(message);


                        }}


                    />



                </div>



            </div>



        </DashboardLayout>

    );

}