const socket = io();

// Declaro los elementos del html segun su id
const input = document.getElementById('text');
const log = document.getElementById('messages');

let user;
let chatbox = document.getElementById("chatbox");

// Alerta en el inicio para poner el usuario
swal.fire({
    title: "Identificate",
    input: "text",
    text: "Ingresar nombre",
    inputValidator: (value) => {
        return !value && "El nombre es obligatorio";
    },
    allowOutsideClick: false
}).then (result => {
    user = result.value;
    socket.emit("authenticated", user);
});

// En caso de apretar enter, que se emita el mensaje, y el input quede vacío
chatbox.addEventListener('keyup', evt => {
    if(evt.key === "Enter"){
        if (chatbox.value.trim().length > 0) {
            socket.emit("message", {
                user, message: chatbox.value
            })
        }
        chatbox.value = "";
    }
});

// Estructura html que contendrá los mensajes que se emitan
socket.on("messageLogs", data => {
    let log = document.getElementById("messageLogs");
    let messages = "";
    data.forEach(({user, message}) => {
        messages += `<li>${user} dice: ${message}</li>`
    });
    log.innerHTML = messages;
});

// Escucho desde el servidor el usuario conectado
socket.on("newUserConnected", user => {
    if (!user) {
        return;
    };

    swal.fire({
        toast: true,
        position: "top-right",
        showConfirmButton: false,
        timer: 5000,
        title: `${user} se ha unido al chat`,
        icon: "success"
    });
});
