
const UserRepository = require('../repositories/User.Repository');

const { createHmac } = require("crypto");

class Users {

    constructor() {
        this.users = [];
        this.userRepository = new UserRepository();
    }

    async create(body) {
        const { password } = body;
        const pwdEncrypt = createHmac("sha256", password).digest("hex");
         
        const dataUser = {
            ...body,
            password: pwdEncrypt,
        }

        const user = await this.userRepository.create(dataUser);
        return user;
    }

    async findAll() {
        return this.userRepository.findAll();
    }

    async update(body, id) {
        const userExist = await this.userRepository.findById(id);

        if (!userExist) {
            throw new Error("usuário não encontrado!");
        }

        const { password } = body;
        const pwdEncrypt = createHmac("sha256", password).digest("hex");
         
        console.log(userExist);
        const user = {
            ...body,
            password: pwdEncrypt,
        }
        
        await this.userRepository.update(user, id);
    }

}

module.exports = new Users();