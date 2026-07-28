export const connectChatSocket = (
    adminId,
    customerId,
    onMessage
) => {


    const token = localStorage.getItem("access");


    const socket = new WebSocket(
        `${import.meta.env.VITE_WS_URL}/ws/chat/${adminId}/${customerId}/?token=${token}`
    );


    console.log(
        "CONNECT CHAT:",
        adminId,
        customerId
    );


    socket.onopen = () => {

        console.log(
            "CHAT SOCKET CONNECTED"
        );

    };



    socket.onmessage = (event) => {


        const data = JSON.parse(event.data);


        console.log(
            "MESSAGE RECEIVED:",
            data
        );


        if(onMessage){

            onMessage(data);

        }


    };



    socket.onerror = (error)=>{

        console.log(
            "SOCKET ERROR:",
            error
        );

    };



    socket.onclose = (event)=>{

        console.log(
            "CHAT SOCKET CLOSED",
            event.code
        );

    };


    return socket;

};





export const sendMessage = (
    socket,
    message
)=>{


    if(
        !socket ||
        socket.readyState !== WebSocket.OPEN
    ){

        console.log(
            "SOCKET NOT CONNECTED"
        );

        return;

    }



    socket.send(

        JSON.stringify({

            message: message

        })

    );


};





export const disconnectChatSocket = (
    socket
)=>{


    if(socket){

        socket.close();

    }

};