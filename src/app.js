const express = require("express");
// const FileStore = require("session-file-store");
const logger = require("morgan");

// Llamo a express
const app = express();

// Declaro el puerto en el que se ejecutará el código, utilizando socket.io
const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`);
});

const { Server } = require("socket.io");

const io = new Server(httpServer);

// Ejecuto la configuracion de la base de datos
const objectConfig = require("./config/objectConfig");

objectConfig.connectDB();

// Configuro handlebars
const handlebars = require("express-handlebars");

const path = require('path');
const hbs = handlebars.create({ defaultLayout: "main" });

hbs.handlebars.registerHelper('getProperty', (object, propertyName) => {
    return object[propertyName];
});

app.engine("handlebars", hbs.engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

// Lectura de código compatible
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/static", express.static(__dirname + "/public"));
app.use(logger("dev"));

// Llamo a cookie-parser y a session
const cookieParser = require("cookie-parser");
const session = require("express-session");

// const fileStore = FileStore(session);

// app.use(session({
    //     store: new fileStore({
        //         ttl: 10000 * 60,
        //         path: "./session",
        //         retries: 0
        //     }),
        
        //     secret: "palabraSecreta",
        //     resave: true,
//     saveUninitialized: true
// }));

const { create } = require("connect-mongo");

require('dotenv').config();
let url = process.env.MONGO_URL;

// app.use(session({
//     store: create ({
//         mongoUrl: url,
//         mongoOptions: {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         },
//         ttl: 10000 * 60
//     }),
    
//     secret: "palabraSecreta",
//     resave: true,
//     saveUninitialized: true
// }));

// Configuro passport
// const { initPassport, initPassportGithub } = require("./config/passportConfig");
const passport = require("passport");
const {initPassport} = require("./passport-jwt/passportConfig");

initPassport();
// initPassportGithub();
passport.use(passport.initialize());
// passport.use(passport, session);

app.use(cookieParser("palabra secreta"));

// Declaro el endpoint que utilizará socket.io y llamo a la funcion
app.get('/chat', (req, res)=>{
    res.render('chat', {})
});

// Llamo a las funciones de socket (en utils)
const { socketChat } = require("./utils/socketChat");
const { socketProducts } = require("./utils/socketProducts");

socketChat(io);
socketProducts(io);

// Llamo al archivo que contiene los Routers
const routerServer = require("./routes/index");

app.use(routerServer);
