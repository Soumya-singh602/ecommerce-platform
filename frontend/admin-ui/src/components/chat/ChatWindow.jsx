import { useEffect, useState } from "react";

import { getChatHistory } from "../../services/chatService";


export default function ChatWindow({

    currentUserId,

    selectedUser,

    messages,

}) {


    const [history, setHistory] = useState([]);

    const [loading, setLoading] = useState(false);



    const fetchMessages = async () => {


        if (!selectedUser) {

            setHistory([]);

            return;

        }


        try {

            setLoading(true);


            const data = await getChatHistory(

                currentUserId,

                selectedUser.user_id

            );


            setHistory(data);


        }

        catch(error){

            console.log(
                "CHAT HISTORY ERROR:",
                error
            );

        }

        finally{

            setLoading(false);

        }

    };



    useEffect(()=>{

        fetchMessages();

    },[selectedUser]);




    const allMessages = [

        ...history,

        ...messages

    ];



    console.log("HISTORY :", history);

    console.log("SOCKET MESSAGES :", messages);

    console.log("ALL MESSAGES :", allMessages);



    return (

        <>


        <div className="border-b bg-white p-5">


        {

            selectedUser ?

            (

                <>

                <h2 className="text-xl font-bold">

                    {selectedUser.name}

                </h2>


                <p className="text-sm text-gray-500">

                    {selectedUser.email}

                </p>


                </>

            )

            :

            (

                <h2 className="text-xl font-bold">

                    Select Conversation

                </h2>

            )


        }


        </div>




        <div className="flex-1 overflow-y-auto bg-slate-50 p-6 space-y-4">


        {

        loading ?

        (

            <p>
                Loading messages...
            </p>

        )

        :

        allMessages.length === 0 ?

        (

            <p className="text-gray-500">

                No messages found

            </p>

        )

        :

        allMessages.map((message,index)=>(


            <div

            key={`${message.id}-${index}`}

            className={`flex ${
                
                Number(message.sender_id) === Number(currentUserId)

                ?

                "justify-end"

                :

                "justify-start"

            }`}


            >


            <div

            className={`max-w-sm rounded-2xl px-4 py-3 ${
                
                Number(message.sender_id) === Number(currentUserId)

                ?

                "bg-indigo-600 text-white"

                :

                "bg-white shadow"

            }`}

            >


            <p>

                {message.message}

            </p>


            </div>


            </div>


        ))


        }


        </div>


        </>

    );

}