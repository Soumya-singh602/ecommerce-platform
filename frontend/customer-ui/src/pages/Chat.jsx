import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { sendMessage } from "../services/chatSocket";

import { getChatHistory } from "../api/chatApi";

import { useChat } from "../context/ChatContext";



export default function Chat(){


    

    const [text, setText] = useState("");



    const { socketRef, messages, setMessages } = useChat();



    const adminId = "6";


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



    },[customerId]);







    const handleSend = ()=>{


        console.log(
            "SEND BUTTON CLICK"
        );



        if(!text.trim()){

            return;

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