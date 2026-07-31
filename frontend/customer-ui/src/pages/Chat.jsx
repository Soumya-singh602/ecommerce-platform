import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { sendMessage, connectChatSocket } from "../services/chatSocket";

import { getChatHistory } from "../api/chatApi";

import { useChat } from "../context/ChatContext";



export default function Chat(){


    const [text, setText] = useState("");

    const { socketRef, messages, setMessages } = useChat();


    const adminId = String(import.meta.env.VITE_ADMIN_ID);
    console.log("ENV ADMIN ID =", import.meta.env.VITE_ADMIN_ID);
    console.log("ADMIN ID =", adminId);
    console.log("CUSTOMER ID =", customerId);


    const user = JSON.parse(
        localStorage.getItem("user")
    );


    const customerId = String(
        user?.user_id
    );



    useEffect(()=>{


        if(!customerId){

            console.log(
                "CUSTOMER ID NOT FOUND"
            );

            return;

        }



        const loadHistory = async()=>{

            try{


                const data = await getChatHistory(
                    adminId,
                    customerId
                );


                console.log(
                    "HISTORY:",
                    data
                );


                setMessages(data);


            }
            catch(error){


                console.log(
                    "HISTORY ERROR:",
                    error
                );


            }

        };



        loadHistory();





        // ==========================
        // CONNECT WEBSOCKET
        // ==========================


        const socket = connectChatSocket(

            adminId,

            customerId,

            (message)=>{


                console.log(
                    "NEW MESSAGE:",
                    message
                );


                setMessages(prev=>[

                    ...prev,

                    message

                ]);


            }

        );



        console.log(
            "SOCKET CREATED:",
            socket
        );



        socketRef.current = socket;



        console.log(
            "SOCKET REF:",
            socketRef.current
        );





        return ()=>{


            if(socketRef.current){


                socketRef.current.close();


            }


        };



    },[customerId]);








    const handleSend = ()=>{


        console.log(
            "SEND BUTTON CLICK"
        );



        if(!text.trim()){

            return;

        }



        console.log(
            "socketRef.current:",
            socketRef.current
        );



        if(socketRef.current){


            console.log(
                "readyState:",
                socketRef.current.readyState
            );


        }




        sendMessage(

            socketRef.current,

            text

        );



        setText("");



    };







    return (

        <MainLayout>


            <div className="max-w-5xl mx-auto py-10 px-4">


                <h1 className="text-3xl font-bold mb-6">

                    Chat With Admin

                </h1>




                <div
                className="
                border
                rounded-xl
                h-[500px]
                flex
                flex-col
                "
                >




                    <div
                    className="
                    flex-1
                    p-4
                    overflow-y-auto
                    "
                    >


                    {

                        messages.map((msg,index)=>(


                            <div

                            key={msg.id || index}

                            className={

                                String(msg.sender_id) === String(customerId)

                                ?

                                "text-right mb-3"

                                :

                                "text-left mb-3"

                            }

                            >


                                <span

                                className="
                                inline-block
                                bg-gray-200
                                rounded-lg
                                px-3
                                py-2
                                "

                                >


                                    <b>

                                        {msg.sender}

                                    </b>


                                    :

                                    {msg.message}



                                </span>


                            </div>


                        ))

                    }



                    </div>





                    <div

                    className="
                    border-t
                    p-3
                    flex
                    gap-2
                    "

                    >



                        <input

                        value={text}

                        onChange={(e)=>
                            setText(e.target.value)
                        }

                        className="
                        flex-1
                        border
                        rounded
                        px-3
                        "

                        placeholder="Type message..."

                        />




                        <button

                        onClick={handleSend}

                        className="
                        bg-blue-600
                        text-white
                        px-5
                        rounded
                        "

                        >

                            Send

                        </button>



                    </div>



                </div>


            </div>


        </MainLayout>

    );


}