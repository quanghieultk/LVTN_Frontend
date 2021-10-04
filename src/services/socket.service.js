import io from "socket.io-client";

export const socketService = {
    connect
}
function connect() {
    return new Promise((resolve, reject) => {
        const socket = io.connect('http://localhost:8000',
            {
                query: "token="+ JSON.parse(localStorage.getItem("user")).token
            }
        );
        socket.on("connect", () => {
            resolve(socket);
        });
    })
}

