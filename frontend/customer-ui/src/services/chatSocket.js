let socket = null;


export const connectChatSocket = (
    adminId,
    customerId,
    onMessage
) => {


    // close old socket
    if(socket){

        socket.close();

        socket = null;

    }



    const token = localStorage.getItem("access");


    socket = new WebSocket(
        `ws://localhost:8080/ws/chat/${adminId}/${customerId}/?token=${token}`
    );



    socket.onopen = () => {

        console.log(
            "CHAT SOCKET CONNECTED"
        );

    };



    socket.onmessage = (event) => {


        const data = JSON.parse(
            event.data
        );


        console.log(
            "SOCKET MESSAGE RECEIVED:",
            data
        );


        if(onMessage){

            onMessage(data);

        }


    };



    socket.onerror = (error) => {


        console.log(
            "CHAT SOCKET ERROR:",
            error
        );


    };



    socket.onclose = (event) => {


        console.log(
            "CHAT SOCKET CLOSED",
            event.code
        );


        // yaha socket=null nahi karna
        // kyunki old socket ka close
        // new socket ko affect kar sakta hai


    };


};





export const sendMessage = (message) => {


    console.log(
        "CURRENT SOCKET:",
        socket
    );



    if(!socket){


        console.log(
            "SOCKET NULL"
        );


        return;

    }



    if(socket.readyState !== WebSocket.OPEN){


        console.log(
            "SOCKET NOT OPEN:",
            socket.readyState
        );


        return;

    }



    socket.send(

        JSON.stringify({

            message: message

        })

    );


};





export const disconnectChatSocket = () => {


    if(socket){


        socket.close();


        socket = null;


        console.log(
            "SOCKET DISCONNECTED"
        );


    }


};