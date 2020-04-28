const connection = require('../database/connection');

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

    async update(request, response){
        const {email, password} = request.body;

        const getUser =  await (await connection('Users'))
        .select("*")
        .where('email', email).first();

        if(getUSer)
                return response.status(400).json({ warning: "E-mail não cadastrado em nossa base."});

        await connection('Users')
        .update({
            password
        })
        .where('idUser', getUser.idUser);
        
        return response.status(200).json({sucess: "Senha atualizada com sucesso."});
    }
}
