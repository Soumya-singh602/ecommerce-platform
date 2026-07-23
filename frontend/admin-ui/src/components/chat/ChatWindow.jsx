import { useEffect, useState } from "react";

import { getChatHistory } from "../../services/chatService";


export default function ChatWindow({

    currentUserId,

    selectedUser

}) {

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);


    const fetchMessages = async () => {

        if (!selectedUser) {

            setMessages([]);

            return;

        }


        try {

            setLoading(true);


            const data = await getChatHistory(

                currentUserId,

                selectedUser.user_id

            );


            setMessages(data);


        } catch (error) {

            console.log(
                "CHAT HISTORY ERROR:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchMessages();

    }, [selectedUser]);


    return (

        <div className="flex-1 overflow-y-auto p-6 bg-slate-50 space-y-4">

            {/* Header */}

            <div className="border-b p-5">

                {

                    selectedUser ? (

                        <>

                            <h2 className="text-xl font-bold">

                                {selectedUser.name}

                            </h2>


                            <p className="text-sm text-gray-500">

                                {selectedUser.email}

                            </p>

                        </>

                    ) : (

                        <h2 className="text-xl font-bold">

                            Select Conversation

                        </h2>

                    )

                }

            </div>



            {/* Messages */}

            <div className="flex-1 overflow-y-auto p-6 bg-slate-50 space-y-4">


                {

                    loading ? (

                        <p>

                            Loading messages...

                        </p>

                    ) : messages.length === 0 ? (

                        <p className="text-gray-500">

                            No messages found

                        </p>

                    ) : (

                        messages.map((message) => (

                            <div

                                key={message.id}

                                className={

                                    `flex ${
                                        message.sender_id === currentUserId
                                        ? "justify-end"
                                        : "justify-start"
                                    }`

                                }

                            >

                                <div

                                    className={

                                        `max-w-sm px-4 py-3 rounded-2xl ${
                                            message.sender_id === currentUserId
                                            ? "bg-indigo-600 text-white"
                                            : "bg-white shadow"
                                        }`

                                    }

                                >

                                    <p>

                                        {message.message}

                                    </p>

                                </div>


                            </div>

                        ))

                    )

                }


            </div>


        </div>

    );

}