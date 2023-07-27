const { winstonLogger } = require('../config/loggers');
const { userModel } = require('../dao/dataBase/models/user.model');
const { createHash, isValidPassword } = require("../utils/bcryptHash");
const { CustomError } = require('../utils/CustomError/CustomError');
const { Error } = require('../utils/CustomError/Errors')
const { generateUserErrorInfo } = require('../utils/CustomError/info');
const { generateToken } = require("../utils/jwt");
const { sendMail } = require('../utils/sendMail');

const jwt = require('jsonwebtoken');
require("dotenv").config();

class SessionController {
    // Endpoint para registrarse
    registerSession = async (req, res, next) => {
        try {        
            const { username, first_name, last_name, email, password } = req.body;

            if (!username || !first_name || !last_name || !email || !password) {
                CustomError.createError({
                    name: 'User creation error',
                    cause: generateUserErrorInfo({
                        username,
                        first_name, 
                        last_name,
                        email,
                        password
                    }),
                    message: 'Error trying to created user',
                    code: Error.INVALID_TYPE_ERROR
                });
            };

            // Validar si ya existe el email
            const existUser = await userModel.findOne({email});
            if (existUser) {
                return res.send({status: "error", message: "el email ya está registrado"});
            };

            const newUser = {
                username,
                first_name,
                last_name,
                email,
                role: "user",
                password: createHash(password)
            };
            let resultUser = await userModel.create(newUser);
    
            let token = generateToken({
                username: username,
                first_name: first_name,
                last_name: last_name,
                email: email
            });
        
            // res.redirect('/'); 
            res.status(200).send({
                status: "success",
                message: "Usuario creado correctamente",
                token
            });
        } catch (error) {
            next(error);
        };
    };

    // Endpoint para iniciar sesion
    loginSession = async (req, res) => {
        try {
            const { email, password } = req.body;
    
            // Validar que email y password NO esten vacíos
            if (!email || !password) {
                return res.send({status: "error", message: "El email y la contraseña son campos obligatorios!"});
            }
    
            // Validar que el usuario exista en la base de datos o que sea el especifico para ser admin
            const userDB = await userModel.findOne({email});
            if (!userDB) {
                if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
                    req.session.user = {
                    first_name: "Admin",
                    last_name: "Coder",
                    email: "adminCoder@coder.com",
                    role: "admin"
                    };
                } else {
                    return res.send({status: "error", message: "No existe ese usuario"});
                }
            } else {
                req.session.user = {
                    first_name: userDB.first_name,
                    last_name: userDB.last_name,
                    email: userDB.email,
                    role: "user"
                };
            };
    
            if(!isValidPassword(password, userDB)) {
                return res.status(401).send({
                    status: "error",
                    message: "El usuario o contraseña son incorrectos",
                })
            };
            
            const access_token = generateToken({
                first_name: userDB.first_name,
                last_name: userDB.last_name,
                email: userDB.email
            });

            res.send({status: "success", message: "El usuario inició correctamente"});
    
            // res.redirect('/api/products'); 
        } catch (err) {
            winstonLogger.error(err);
        };
    };

    // Endpoint para registrarse con passport
    registerPassport = async (req, res) => {
        res.send({status: "success", message: "El usuario se registró correctamente"});
        res.redirect("/api/sessions/login");
    };

    // Ruta de escape register
    registerPassportEscape = async (req, res) => {
        res.send({status: "error", error: "Falló la autenticación"});
    };

    // Endpoint para iniciar sesion con passport
    loginPassport = async (req, res) => {
        if (!req.user) {
            return res.status(401).send({status: "error", message: "Credencial inválida"});
        }
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            role: req.user.role
        }
        // res.send({status: "success", message: "Sesión iniciada"});
        res.redirect("/api/products");
    };

    // Ruta de escape login
    loginPassportEscape = async (req, res) => {
        res.send({status: "error", error: "Falló la autenticación"});
    };

    loginCookie = async (req, res) => {
        const {email, password} = req.body
    
        // Validar que el usuario exista en la base de datos o que sea el especifico para ser admin
        const userDB = await userModel.findOne({email});

        if (!userDB) {
            if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
                const access_token = generateToken({
                    first_name: "Coder",
                    last_name: "House",
                    email: email,
                    role: "admin"
                });
                
                return res
                .cookie('coderCookieToken', access_token,{
                    maxAge: 60*60*100,
                    httpOnly: true
                })
                .send({
                    status: 'success',
                    message: 'login success',
                    role: "admin"
                });
            } else {
                return res.send({status: "error", message: "No existe ese usuario"});
            };
        };

        if(!isValidPassword(password, userDB) || !userDB || !userDB.password) {
            return res.status(401).send({
                status: "error",
                message: "El usuario o contraseña son incorrectos",
            });
        };

        const access_token = generateToken({
            first_name: userDB.first_name,
            last_name: userDB.last_name,
            email: userDB.email,
            role: userDB.role
        });

        req.session.user = {
            first_name: userDB.first_name,
            last_name: userDB.last_name,
            email: userDB.email,
            role: userDB.role
        };
        
        res
        .cookie('coderCookieToken', access_token,{
            maxAge: 60*60*100,
            httpOnly: true
        })
        .send({
            status: 'success',
            message: 'login success',
            role: userDB.role
        });
    };
    
    // Endpoint para ingresar con Github con passport
    githubCallback = async (req, res) => {
        req.session.user = req.user;
        res.redirect("/api/products");
    };

    // Endpoint privado para admins
    privateAdmin = async (req, res) => {
        res.send("Esto solo puede verlo un admin");
    };

    // Endpoint para eliminar la sesion
    logoutSession = async (req, res) => {
        req.session.destroy(err => {
            if (err) {
                res.send({status: "error", error: err});
            }
            res.redirect("/");
        });
    };

    forgotPassword = async (req, res) => {
        const { email } = req.body;

        // Encontrar el usuario por correo electrónico
        const userDB = await userModel.findOne({ email });

        if (!userDB) {
            return res.status(401).send({status: 'error', message: 'El usuario no existe'})
        };    

        // Enviar el email de recuperacion al usuario
        sendMail(email);

        res.status(200).json({status: 'success', message:'Email de recuperación enviado correctamente'});
        // res.redirect("/api/sessions/login");
    };

    resetPassword = async (req, res) => {
        const { token } = req.query;
        const { password } = req.body;

        try {
            // Vericar el JWT token
            const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            winstonLogger.info(decodedToken);
            const { email } = decodedToken;

            // Encontrar si el usuario está creado
            const userDB = await userModel.findOne({ email });

            if (!userDB) {
                return res.status(401).send({ status: "error", message: "El usuario no esta registrado" });
            };

            // Verifico que la contraseña sea colocada
            if (!password) {
                return res.status(400).send({ status: "error", message: "La contraseña es obligatoria!" });
            };

            // Verifico que la contraseña no sea la misma que la actual
            if (isValidPassword(password, userDB)) {
                return res.status(400).send({ status: "error", message: "La contraseña debe ser diferente a la actual!" });
            };

            // Actualizar la contraseña
            userDB.password = createHash(password);
            await userDB.save();

            res.status(200).json({ status: 'success', message: 'Contraseña actualizada correctamente' });
        } catch (err) {
            // En caso de que el token ya no exista, redirecciono a la pagina de recuperación
            if (err instanceof jwt.TokenExpiredError) {
                return res.redirect("/api/sessions/forgotPassword");
            } else {
                winstonLogger.error(err);
            };
        };
    };

    sessionCounter = async (req, res) => {
        if (req.session.counter) {
            req.session.counter ++;
            res.send(`Se ha visitado el sitio ${req.session.counter} veces`);
        } else {
            req.session.counter = 1;
            res.send("Bienvenido");
        };
    };

    roleValidator = async (req, res) => {
        res.send(req.user);
    };
};

module.exports = new SessionController();