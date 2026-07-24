let socket = null;


export const connectChatSocket = (
    adminId,
    customerId,
    onMessage
) => {

    if (socket) {
        socket.close();
    }


    const token = localStorage.getItem("access");


    socket = new WebSocket(
        `ws://localhost:8080/ws/chat/${adminId}/${customerId}/?token=${token}`
    );


    socket.onopen = () => {
        console.log("CHAT SOCKET CONNECTED");
    };


    socket.onmessage = (event) => {

        const data = JSON.parse(event.data);

        console.log("MESSAGE RECEIVED:", data);


        if(onMessage){
            onMessage(data);
        }

    };


    socket.onerror = (error)=>{
        console.log("SOCKET ERROR:",error);
    };


    socket.onclose = (event)=>{

        console.log(
            "CHAT SOCKET CLOSED",
            event.code
        );

        socket=null;
    };

};



export const sendMessage=(message)=>{


    if(!socket || socket.readyState !== WebSocket.OPEN){

        console.log("Socket not connected");

        return;
    }


    socket.send(
        JSON.stringify({
            message:message
        })
    );

};



export const disconnectChatSocket=()=>{

    if(socket){

        socket.close();

        socket=null;
    }

};