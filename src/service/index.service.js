const { ProductDao, UserDao, ContactDao, CartDao, TicketDao } = require("../dao/factory");
const CartRepository = require("../repositories/carts.repository");
const ContactRepository = require("../repositories/contacts.repository");
const ProductRepository = require("../repositories/products.repository");
const TicketRepository = require("../repositories/ticket.repository");
const UserRepository = require("../repositories/user.repository");

const productService = new ProductRepository(new ProductDao());
const userService = new UserRepository(new UserDao());
// const contactService = new ContactRepository(new ContactDao());
// const cartService = new CartRepository(new CartDao());
// const ticketService = new TicketRepository(new TicketDao());

module.exports = {
    productService,
    userService,
    // contactService,
    // cartService,
    // ticketService
};