// Dto que agarra la informacion del usuario, y devuelve solo la informacion NO sensible
class UserDto {
    async hidePass(user) {
        const {password, ...restData} = user;
        return restData;
    };
};

module.exports = {
    UserDto
};