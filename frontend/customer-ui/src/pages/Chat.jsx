import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { sendMessage } from "../services/chatSocket";
import { getChatHistory } from "../api/chatApi";
import { useChat } from "../context/ChatContext";


export default function Chat() {


    const [text, setText] = useState("");



    const {
        socketRef,
        messages,
        setMessages
    } = useChat();




    const adminId = String(
        import.meta.env.VITE_ADMIN_ID
    );



    let user = null;


    try {

        const storedUser =
            localStorage.getItem("user");


        user = storedUser
            ? JSON.parse(storedUser)
            : null;


    } catch(error){

        console.error(
            "Invalid user data:",
            error
        );

    }





    const customerId = user?.user_id
        ? String(user.user_id)
        : null;





    console.log(
        "ENV ADMIN ID =",
        import.meta.env.VITE_ADMIN_ID
    );


    console.log(
        "ADMIN ID =",
        adminId
    );


    console.log(
        "CUSTOMER ID =",
        customerId
    );







    // =========================
    // LOAD CHAT HISTORY ONLY
    // SOCKET IS HANDLED BY ChatContext
    // =========================

    useEffect(() => {


        if(!customerId){

            console.log(
                "CUSTOMER ID NOT FOUND"
            );

            return;

        }





        const loadHistory = async()=>{


            try{


                const data =
                    await getChatHistory(
                        adminId,
                        customerId
                    );



                console.log(
                    "HISTORY:",
                    data
                );



                // remove duplicate messages

                const uniqueMessages =
                    data.filter(
                        (msg,index,self)=>

                        index ===
                        self.findIndex(
                            item =>
                            item.id === msg.id
                        )

                    );



                setMessages(
                    uniqueMessages
                );



            }
            catch(error){


                console.log(
                    "HISTORY ERROR:",
                    error
                );


            }


        };



        loadHistory();



    },[
        adminId,
        customerId,
        setMessages
    ]);









    const handleSend = ()=>{


        console.log(
            "SEND BUTTON CLICK"
        );



        if(!text.trim()){

            return;

        }




        console.log(
            "SOCKET:",
            socketRef.current
        );




        if(socketRef.current){


            console.log(
                "READY STATE:",
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


            <div
                className="
                max-w-5xl
                mx-auto
                py-10
                px-4
                "
            >


                <h1
                    className="
                    text-3xl
                    font-bold
                    mb-6
                    "
                >

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
                            messages.map(
                                (msg,index)=>(


                                    <div

                                        key={`${msg.id}-${index}`}

                                        className={

                                            String(msg.sender_id)
                                            ===
                                            String(customerId)

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



                                )

                            )
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
                                setText(
                                    e.target.value
                                )
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