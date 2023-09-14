import io from "socket.io-client";

class SocketService {
    constructor(options = {}) {
        const {
            url = "http://localhost:3000",
            autoConnect = true,
            reconnect = true,
            reconnectionAttempts = 3,
            reconnectionDelay = 1000,
            reconnectionDelayMax = 5000,
            query = {},
            transports = ["websocket", "polling"],
            timeout = 5000,
            events = {},
            logger = console,
            middleware = [],
            socketOptions = {},
        } = options;

        this.url = url;
        this.autoConnect = autoConnect;
        this.reconnect = reconnect;
        this.reconnectionAttempts = reconnectionAttempts;
        this.reconnectionDelay = reconnectionDelay;
        this.reconnectionDelayMax = reconnectionDelayMax;
        this.query = query;
        this.transports = transports;
        this.timeout = timeout;
        this.logger = logger;
        this.middleware = middleware;
        this.socketOptions = socketOptions;
        this.socket = null;

        if (this.autoConnect) {
            this.connect();
        }

        // Add custom event listeners from options
        Object.keys(events).forEach((event) => {
            this.on(event, events[`${event}`]);
        });
    }

    // Initialize the socket connection
    connect() {
        this.socket = io(this.url, {
            autoConnect: this.autoConnect,
            reconnection: this.reconnect,
            reconnectionAttempts: this.reconnectionAttempts,
            reconnectionDelay: this.reconnectionDelay,
            reconnectionDelayMax: this.reconnectionDelayMax,
            query: this.query,
            transports: this.transports,
            timeout: this.timeout,
            ...this.socketOptions,
        });

        // Add event listeners for socket events
        this.socket.on("connect", () => {
            this.logger.log("Connected to the WebSocket server");
        });

        this.socket.on("disconnect", () => {
            this.logger.log("Disconnected from the WebSocket server");
        });

        this.socket.on("error", (error) => {
            this.logger.error("WebSocket error:", error);
        });
    }

    // Close the socket connection
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    // Send a message to the server
    emit(event, data) {
        if (this.socket) {
            const message = { event, data };

            // Apply middleware to the message
            for (const middlewareFunction of this.middleware) {
                middlewareFunction(message);
            }

            this.socket.emit(event, message.data);
        } else {
            this.logger.warn("Socket not connected. Cannot send message.");
        }
    }

    // Add custom event listeners
    on(event, callback) {
        if (this.socket) {
            this.socket.on(event, callback);
        } else {
            this.logger.warn("Socket not connected. Cannot add event listener.");
        }
    }

    // Remove a custom event listener
    off(event, callback) {
        if (this.socket) {
            this.socket.off(event, callback);
        } else {
            this.logger.warn("Socket not connected. Cannot remove event listener.");
        }
    }
}

export default SocketService;
