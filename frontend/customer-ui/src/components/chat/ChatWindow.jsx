import {
useEffect,
useState
} from "react";


import {
connectChatSocket,
sendMessage
}
from "../../services/chatSocket";


import {
getHistory
}
from "../../api/chatApi";



function ChatWindow(){


const adminId=6;


const customerId=
localStorage.getItem("user_id");



const [messages,setMessages]=useState([]);


const [text,setText]=useState("");




useEffect(()=>{


loadHistory();


connectChatSocket(

adminId,

customerId,


(msg)=>{


setMessages(prev=>[

...prev,

msg

]);


}


);


},[]);





const loadHistory=async()=>{


const data =
await getHistory(
adminId,
customerId
);


setMessages(data);


};





const send=()=>{


sendMessage(text);


setText("");

};



return (

<div>


<h2>
Admin Support
</h2>



<div>

{
messages.map(
(msg)=>(

<div key={msg.id}>

{msg.sender} :
{msg.message}

</div>

)

)
}


</div>



<input

value={text}

onChange={
e=>setText(e.target.value)
}

/>


<button
onClick={send}
>
Send
</button>


</div>

)


}


export default ChatWindow;