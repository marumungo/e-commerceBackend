const {faker} = require('@faker-js/faker')

const generateProducts= ()=>{
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        category: faker.commerce.productAdjective(),
        stock: faker.string.numeric(),
        code: faker.database.mongodbObjectId(),
        imageUrl: faker.image.url()
    };
};

module.exports = {
    generateProducts
}

// exports.generateUser = () => {
//     let numOfProductos = parseInt(faker.string.numeric(1, {bannedDigits: ['0']}))
//     let products = [];
//     for (let i = 0; i < numOfProductos; i++) {
//         products.push(generateProduct())        
//     };

//     return {
//         first_name: faker.person.firstName(),
//         last_name: faker.person.lastName(),
//         sex: faker.person.sex(),
//         birthDate: faker.date.birthdate(),
//         phone: faker.phone.number(),
//         image: faker.image.avatar(),
//         id: faker.database.mongodbObjectId(),
//         email: faker.internet.email(),
//         products
//     };
// };