export const connectDashboardSocket = (onMessage) => {

    const token = localStorage.getItem("access");

    const socket = new WebSocket(
        `${import.meta.env.VITE_WS_URL}/ws/dashboard/?token=${token}`
    );

    socket.onopen = () => {
        console.log("DASHBOARD SOCKET CONNECTED");
    };

    socket.onmessage = (event) => {

        const data = JSON.parse(event.data);

        console.log("DASHBOARD EVENT:", data);

        if (onMessage) {
            onMessage(data);
        }

    };

    socket.onerror = (error) => {
        console.log("DASHBOARD SOCKET ERROR:", error);
    };

    socket.onclose = () => {
        console.log("DASHBOARD SOCKET CLOSED");
    };

    return socket;
};

export const disconnectDashboardSocket = (socket) => {

    if (socket) {
        socket.close();
    }

};