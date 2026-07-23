import { useState } from "react";

import { Send } from "lucide-react";


export default function ChatInput({

    onSend,

    selectedUser

}) {

    const [message, setMessage] = useState("");


    const handleSend = () => {


        if (!message.trim()) {

            return;

        }


        if (!selectedUser) {

            alert("Please select a conversation");

            return;

        }


        onSend(message);


        setMessage("");

    };


    return (

        <div className="border-t bg-white p-4">

            <div className="flex gap-3">


                <input

                    type="text"

                    value={message}

                    onChange={(e) => setMessage(e.target.value)}

                    placeholder="Type your message..."

                    className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"

                    onKeyDown={(e) => {

                        if (e.key === "Enter") {

                            handleSend();

                        }

                    }}

                />


                <button

                    onClick={handleSend}

                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 rounded-xl flex items-center gap-2"

                >

                    <Send size={18} />

                    Send

                </button>


            </div>

        </div>

    );

}