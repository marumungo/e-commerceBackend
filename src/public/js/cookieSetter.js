const { winstonLogger } = require("../../config/loggers");

const form = document.querySelector("#cookieForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const obj = {};
    data.forEach((value, key) => obj[key] = value);

    fetch("/api/pruebas/setCookieUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
    .then (respuesta => respuesta.json())
    .then (respuesta => winstonLogger.info(respuesta))
});

const getCookie = () => {
    winstonLogger.info(document.cookie)
};