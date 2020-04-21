const connection = require('../database/connection');

module.exports = {
    
    async index (request, response){
        
        const cpfStore = request.headers.cpf;
        const emailStore = request.headers.email;

        try{
            const profile = await connection('People')
            .where('cpf', cpfStore)
            .andWhere('email', emailStore)
            .first()
            .select('*');

            if(!profile ){
                return response.status(400).json({error: "Dados ainda não cadastrados."})
            }

            return response.json(profile);

        }catch (err){
            return response.status(500).json({error: err})
        }
    },

    async create(request, response) {
        const { name, cpf, city, uf, phone, email} = request.body;

        try{

            //construção da data
            const date = new Date();
            const created_at = date.getDate() + '/' +
            (date.getMonth()+1).toString() + '/' + date.getFullYear();

            var profileValidation = await connection('People')
            .select('*')
            .where('cpf', cpf)
            .first();
        

            if(!profileValidation){

                await connection('People')
                .insert({
                    name,
                    cpf, 
                    city, 
                    uf, 
                    phone, 
                    email, 
                    created_at   
                });
        
                return response.status(200).json({sucess: "Dados salvos com sucesso."});
            }
            else{
                return response.status(400).json({alert: "Dados já cadastrados."});
            }
        }
        catch (err){
            return response.status(500).json({error: err});
        }

    },

    async update(request, response){

        const cpfStore = request.headers.authorization;
        const {idPeople, name, city, uf, phone, email} = request.body;

        try{
            
            const aut = await connection('People')
            .where('idPeople', idPeople)
            .select('cpf')
            .first();

            if(aut.cpf !== cpfStore){
                return response.status(400).json({ badrequest: "Alterações não permitidas."});
            }

            await connection('People')
            .update({
                name, 
                city, 
                uf, 
                phone, 
                email, 
            })
            .where('idPeople', idPeople)
            .andWhere('cpf', cpfStore);

            return response.json({ sucess: "Dados atualizados com sucesso"});
        }
        catch (err){
            return response.status(500).json({ error: err});
        }

    }
}