const { messageModel } = require("../manager/mongo/models/messages.model");

const socketChat = (io) => {
    // Declaro el array donde se almacenarán los mensajes
    let messages = [];

    io.on('connection', socket => {
        console.log('Nuevo cliente conectado');
        console.log(socket.id);
    
        // Almacenar, emitir los logs y subirlos a la base de datos
        socket.on("message", async data => {
            messages.push(data);
            io.emit('messageLogs', messages);

            const newMessage = {
                user: data.user,
                message: data.message
            };
        
            try {
                const result = await messageModel.create(newMessage);
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        });
    
        // Escuchar el usuario ingresado
        socket.on("authenticated", data => {
            socket.broadcast.emit("newUserConnected", data);
        });
    });
};

module.exports = { socketChat };

