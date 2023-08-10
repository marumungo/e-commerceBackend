// Dto que agarra la informacion del usuario, y devuelve solo la informacion NO sensible
class UserDto {
    async hidePass(user) {
        const {password, ...restData} = user;
        return restData;
    };

    static getUserTokenFrom = (user) => {
        return {
            name: `${user.first_name} ${user.last_name}`,
            role: user.role,
            email: user.email
        };
    };
};

module.exports = {
    UserDto
};