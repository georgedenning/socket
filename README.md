# @gden/socket

![NPM License](https://img.shields.io/npm/l/@gden/socket?label=)

<!-- ![NPM Downloads](https://img.shields.io/npm/dw/@gden/socket?label=) -->

`@gden/socket` is a JavaScript library that provides a versatile and configurable WebSocket client service for handling WebSocket connections in your applications.

## Installation

```shell
npm install @gden/socket
```

### Importing the Package:

```js
import SocketService from '@gden/socket';
```

## Usage

Once you've imported the `SocketService` class, you can create WebSocket connections and manage events.

### Creating a Socket Connection

```js
import SocketService from '@gden/socket';

// Initialize a new WebSocket connection with optional configuration options
const socket = new SocketService(options);
```

### Listening for WebSocket Events

You can listen for WebSocket events, such as incoming messages, using the on method:

```js
socket.on('message', msg => {
    // Handle incoming message
    console.log('Received message:', msg);
});
```

### Sending Messages

You can send messages to the server using the emit method:

```js
const sendMessage = msg => {
    // Send a message to the server
    socket.emit('message', msg);
};

sendMessage('Hello, server!');
```

### Disconnecting from the WebSocket

To gracefully close the WebSocket connection, you can use the disconnect method:

```js
socket.disconnect();
```

### Demo usage:

```js
import SocketService from '@gden/socket';

const socket = new SocketService(options);

let messages = [];

socket.on('messages', msgs => {
    messages = msgs;
});

socket.on('message', msg => {
    messages.push(msg);
});

const sendMessage = msg => {
    socket.emit('message', msg);
};

sendMessage('test');
```

## Configuration Options

When creating a `SocketService` instance, you can pass in various configuration options to customize its behavior. Here are the available options:

-   `url` (string): The WebSocket server URL.
-   `autoConnect` (boolean): Automatically connect on instantiation.
-   `reconnect` (boolean): Enable reconnection on disconnect.
-   `reconnectionAttempts` (number): Number of reconnection attempts.
-   `reconnectionDelay` (number): Initial delay before reconnection (in milliseconds).
-   `reconnectionDelayMax` (number): Maximum delay between reconnection attempts (in milliseconds).
-   `query` (object): Custom query parameters to send during the WebSocket handshake.
-   `transports` (array): Available transport methods.
-   `timeout` (number): Connection timeout (in milliseconds).
-   `events` (object): Custom event listeners.
-   `logger` (object): Logger for connection events and errors.
-   `middleware` (array): Middleware functions to apply to outgoing messages.
-   `socketOptions` (object): Additional socket.io-client options.

## License

This project is licensed under the terms of the [MIT license](/LICENSE).
