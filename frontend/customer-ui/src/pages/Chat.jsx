import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import {
    connectChatSocket,
    sendMessage,
    disconnectChatSocket
} from "../services/chatSocket";



export default function Chat(){


    const [messages,setMessages] = useState([]);

    const [text,setText] = useState("");



    const adminId = "6";

    const customerId = localStorage.getItem("user_id");




    useEffect(()=>{


        connectChatSocket(

            adminId,

            customerId,


            (message)=>{


                console.log(
                    "NEW MESSAGE:",
                    message
                );


                setMessages((prev)=>[

                    ...prev,

                    message

                ]);


            }

        );



        return ()=>{

            disconnectChatSocket();

        };


    },[customerId]);





    const handleSend=()=>{


        if(!text.trim())
            return;



        sendMessage(text);



        setText("");

    };





return (

<MainLayout>


<div className="max-w-5xl mx-auto py-10 px-4">


<h1 className="text-3xl font-bold mb-6">

Chat With Admin

</h1>




<div className="
border
rounded-xl
h-[500px]
flex
flex-col
">


<div className="
flex-1
p-4
overflow-y-auto
">


{

messages.map((msg,index)=>(


<div

key={index}

className={

String(msg.sender_id) === String(customerId)

?

"text-right mb-3"

:

"text-left mb-3"

}

>


<span className="
inline-block
bg-gray-200
rounded-lg
px-3
py-2
">


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





<div className="
border-t
p-3
flex
gap-2
">


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