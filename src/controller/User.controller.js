const user = require('./../users/Users');

class UserController {

     async post(request, response) {
        const { body } = request;
        const result = await user.create(body);
        return response.end(JSON.stringify(result));
    }

    async get(request, response) {
        const result = await user.findAll();
        return response.end(JSON.stringify(result));
    }



    async put(request, response) {
        const { id } = request.params;
        const { body } = request;

        try {
            await user.update(body, id);
            return response.end(
                JSON.stringify({
                    message: "Usuario alterado com sucesso."
                })
            )
        }
        catch (err) {
            return response.end(
                JSON.stringify({
                    message: err.message,
                })
            );
        }
    }

}

module.exports = { UserController }