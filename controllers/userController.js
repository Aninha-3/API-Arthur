const User = require("../model/user");


//importar o bcrypt para criptografar a senha
const bcrypt = require("bcryptjs");

const userController = {

    //criar login 
    login: async (request, response) => {
        const { email, senha } = request.body;

        if (!email || !senha) {
            return response.status(400).json({
                msg: "Email e senha são obrigatórios"
            });
        }
    },
    create: async (request, response) => {
        try {
            const { nome, email, senha } = request.body;

            if (!nome || !email || !senha) {
                return response.status(400).json({
                    msg: "Campo incorreto ou vazio"
                });
            }

            const userEncontrado = await User.findOne({

                // SELECT * FROM users WHERE email = email
                where: {
                    email: email
                }
            });

            // Adequado ser os dois iguais

            if (userEncontrado) {
                return response.status(400).json({
                    msg: "Usuário ou Senha incorretos"
                });
            }

            const isCerto = await bcrypt.compare(senha, userEncontrado.senha);

            if (!isCerto) {
                return response.status(400).json({
                    msg: "Usuário ou Senha incorreta"
                });
            }

            // Payload -> Conteudo do token
            const payload = {
                id: userEncontrado.id,
                email: userEncontrado.email

            }

            // Token vai sobreviver por 1h
            // palavra secreta para criar o token  -> lady_gltter_divonica
            // bGFkeV9nbHR0ZXJfZGl2b25pY2E=
            const token = jwt.sign(payload, palavraSecreta, {
                expiresIn: "1h"
            });




            return response.status(201).json({
                msg: " O usuário foi crido com sucesso",
                userCriado
            })


            // senha criptografada
            const hashedSenha = await bcrypt.hash(senha, 10);
            const userCriado = await User.create({ nome, email, senha: hashedSenha });

        } catch (error) {
            console.log(error)
            return response.status(500).json({
                msg: " Ocorreu um erro ao acessar a API"
            })
        }
    },

    update: async (request, response) => {
        try {
            const { id } = request.params;
            const { nome, email, senha } = request.body;

            if (!nome || !email || !senha) {
                return response.status(400).json({
                    msg: "Campo inconrreto ou vazio"
                });
            }

            const userExiste = await User.findByPk(id);
            if (!userExiste) {
                return response.status(400).json({
                    msg: "Usuário não encontrado"
                });
            }

            await User.update({
                nome, email, senha
            }, {
                where: {
                    id: id
                }
            });
        } catch (error) {
            return response.status(500).json({
                msg: " Ocorreu um erro ao acessar a API"
            })
        }
    },
    findAll: async (request, response) => {
        try {
            const user = await User.findAll()

            return response.status(201).json(user)
        } catch (erro) {
            return response.status(500).json({
                msg: " Ocorreu um erro interno ao buscar todos os usuários"
            })
        }
    },
    delete: async (request, response) => {
        try {
            const { id } = request.params;
            const existeUser = await User.findByPk(id)


            if (!existeUser) {
                return response.status(400).json({
                    msg: "Usuário não foi encontrado"
                })
            }
            await User.destroy({
                where: {
                    id: id
                }
            })
            return response.status(200).json({
                msg: " O usuário foi deletado com sucesso"
            })

        } catch (erro) {
            return response.status(500).json({
                msg: " Ocorreu um erro ao deletar o usuário"
            })
        }
    },
    findById: async (request, response) => {
        try {

            const { id } = request.params;

            const userEncontrado = await User.findByPk(id);

            if (!existeUser) {

                return response.status(204).json({
                    msg: "Usuário não foi encontrado"
                })
            }
            return response.status(200).json(userEncontrado)

        } catch (error) {
            return response.status(500).json({
                msg: " Ocorreu um erro ao deletar o usuário"
            })
        }
    }
}

module.exports = userController;