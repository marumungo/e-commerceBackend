const { winstonLogger } = require("../config/loggers");
const { messageModel } = require("../dao/dataBase/models/messages.model");

const socketChat = (io) => {
    // Declaro el array donde se almacenarán los mensajes
    let messages = [];

    io.on('connection', socket => {
        winstonLogger.info('Nuevo cliente conectado');
        winstonLogger.info(socket.id);
    
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
                winstonLogger.info(result);
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

