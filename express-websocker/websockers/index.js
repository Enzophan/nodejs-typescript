const WebSocket = require('ws');
const queryString = require('querystring');

const webSockerServer = (expressServer) => {
    const wss = new WebSocket.Server({
        noServer: true,
        path: "/websockets",
    });

    expressServer.on("upgrade", (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, (websocket) => {
            wss.emit("connection", websocket, request);
        });
    });

    wss.on('connection', function connection(websocketConnection, connectionRequest) {
        const [_path, params] = connectionRequest?.url?.split("?");
        const connectionParams = queryString.parse(params);

        // NOTE: connectParams are not used here but good to understand how to get
        // to them if you need to pass data with the connection to identify it (e.g., a userId).
        const paramsRequest = JSON.parse(JSON.stringify(connectionParams));
        console.log("connectionParams ", paramsRequest)

        websocketConnection.send(JSON.stringify({ message: 'Welcome!', userId: paramsRequest?.userId }))

        websocketConnection.on('message', (message, isBinary) => {
            const parsedMessage = JSON.parse(message);
            console.log('received: %s', parsedMessage);
            websocketConnection.send(JSON.stringify({ message: 'There be gold in them thar hills.' }))
            wss.clients.forEach(function each(client) {
                if (client !== websocketConnection && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(parsedMessage), { binary: isBinary });
                }
            });
        });

        //     ws.send('something');
    });

    return wss;
}

module.exports = webSockerServer