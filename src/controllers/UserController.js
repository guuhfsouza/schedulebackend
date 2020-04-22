const connection = require('../database/connection');
const generatePass = require('../utils/generatePass');

module.exports = {

    
    async index(request, response) {
        const email = request.headers.email;
        const pass = request.headers.password;

        const users = await connection('Users')
        .where('email', email)
            .andWhere('password', pass)
            .first()
            .select('idUser','email', 'cpf_People', 'active', 'typeUser', 'nameUser');        
        
        if(!users){
            return response.status(400).json({error : 'Cadastro não existente. Verifique seu usuário e senha caso'
            +  'já tenha se cadastrado.'});            
        }
        else{
            return response.status(200).json(users);
        }
    },
    
    async create(request, response) {
        const { cpf_People, email, password, active, typeUser, nameUser} = request.body;
        

        try {
            const usersValidation = await connection('Users').select('*')
            .where(
                'email', email)
                .andWhere('cpf_People', cpf_People)
                .first();
            
            if(!usersValidation){
                 
                const date = new Date();
                const created_At = date.getDate() + '/' +
                (date.getMonth()+1).toString() + '/' + date.getFullYear();
                console.log(created_At);

                const pass = generatePass();
                await connection('Users').insert({
                    cpf_People,
                    email, 
                    password : pass,
                    created_At,
                    active,
                    typeUser,
                    nameUser
                });

                return response.json({sucess: "Usuário criado com sucesso. Sua senha de acesso é: " + pass}); //quebra galho
            }
            else{
                return response.status(400).json({ error: "Usuário já existe para sua loja. Favor recuperar senha."});
            }
        }
        catch (err){
            return response.status(500).json({error: err});
        }

    },

    async update(request, response) {
        const {idUser, email, password, active, typeUser, nameUser} = request.body;
        try{
            await connection('Users').update({
                email,
                password,
                active,
                typeUser,
                nameUser
            }).where('idUser', idUser);
            
            return response.json({sucess: "Atualização efetuada com sucesso"}); //quebra galho
        }
        catch (err){
            return response.status(500).json( {error: err});
        }
    }

}