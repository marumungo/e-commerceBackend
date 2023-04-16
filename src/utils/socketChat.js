const socketChat = (io) => {
    // Declaro el array donde se almacenarán los mensajes
    let messages = [];

    io.on('connection', socket => {
        console.log('Nuevo cliente conectado');
        console.log(socket.id);
    
        // Almacenar y emitir los logs
        socket.on("message", data => {
            messages.push(data);
            io.emit('messageLogs', messages);
        });
    
        // Escuchar el usuario ingresado
        socket.on("authenticated", data => {
            socket.broadcast.emit("newUserConnected", data);
        });
    });
};

module.exports = { socketChat };

