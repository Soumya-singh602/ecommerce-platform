let socket = null;


// ==============================
// CONNECT SOCKET
// ==============================

export const connectChatSocket = (

    adminId,

    customerId,

    onMessage

) => {


    socket = new WebSocket(

        `ws://localhost:8004/ws/chat/${adminId}/${customerId}/`

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
            "MESSAGE RECEIVED:",
            data
        );


        onMessage(data);


    };


    socket.onerror = (error) => {


        console.log(

            "SOCKET ERROR:",

            error

        );


    };


    socket.onclose = (event) => {

       console.log(
        "CHAT SOCKET CLOSED"
       );

       console.log(
        "CLOSE CODE:",
         event.code
       );

       console.log(
        "CLOSE REASON:",
         event.reason
       );

    };

};



// ==============================
// SEND MESSAGE
// ==============================

export const sendMessage = (message) => {


    if (

        socket &&

        socket.readyState === WebSocket.OPEN

    ) {


        socket.send(

            JSON.stringify({

                message: message

            })

        );


    }

    else {


        console.log(

            "Socket not connected"

        );


    }


};



// ==============================
// DISCONNECT
// ==============================

export const disconnectChatSocket = () => {


    if(socket){

        socket.close();

    }


};