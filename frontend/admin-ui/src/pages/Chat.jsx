import {
    useState,
    useEffect
} from "react";


import DashboardLayout from "../layouts/DashboardLayout";

import ChatSidebar from "../components/chat/ChatSidebar";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";


import {

    connectChatSocket,

    sendMessage

} from "../services/chatSocket";



export default function Chat() {


    const currentUserId = 6;


    const [selectedUser, setSelectedUser] = useState(null);



    // ==========================
    // CONNECT SOCKET
    // ==========================

    useEffect(() => {


        if(selectedUser){


            connectChatSocket(


                currentUserId,


                selectedUser.user_id,


                (message)=>{


                    console.log(

                        "NEW MESSAGE",

                        message

                    );


                }


            );


        }


    },[selectedUser]);




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


                    />



                    <ChatInput


                        selectedUser={selectedUser}


                        onSend={(message)=>{


                            sendMessage(message);


                        }}


                    />



                </div>



            </div>


        </DashboardLayout>

    );

}