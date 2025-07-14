const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the portfolio directory
app.use(express.static(path.join(__dirname, '../')));

// In-memory storage for comments (in a real app, use a database)
let comments = [];

// Socket.io connection
io.on('connection', (socket) => {
    console.log('New client connected');
    
    // Send existing comments to new client
    socket.emit('load-comments', comments);
    
    // Handle new comment
    socket.on('add-comment', (comment) => {
        comments.unshift(comment); // Add new comment to beginning of array
        io.emit('new-comment', comment); // Broadcast to all clients
    });
    
    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});