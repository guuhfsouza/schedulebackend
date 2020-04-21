const connection = require('../database/connection');


module.exports = {

    async index(request, response) {
        const cpfStore = request.headers.authorization;
        
        try{
            const services = await connection('Service')
            .select('*')
            .where('cpfStore', cpfStore);

            return response.json(services);
 
        }catch (err){
            return response.status(500).json({error: err});
        }
    },

    async create(request, response){
        const {service, price, ative, cpfStore } = request.body;

        try{
            await connection('Service')
            .insert({
                service,
                price,
                ative,
                cpfStore
            })

            return response.json({ sucess : 'Serviço cadastrado com sucesso'});
        
        } catch (err){
            return response.status(500).json({ error: err });
        }
    },

    async update(request, response) {
        const cpfStore = request.headers.authorization;
        const {idService, service, price, ative} = request.body;

        try{
            const serviceUpdate = await connection('Service')
            .select('cpfStore')
            .where('idService', idService)
            .first();

            if(serviceUpdate.cpfStore !==  cpfStore){
                return response.json({ error: 'Item não pertence a loja.' });
            }

            await connection('Service')
            .where('idService', idService)
            .update({
                service,
                price,
                ative
            })

            return response.json({ sucess: 'Dados atualizados com sucesso.'})

        } catch(err){
            return response.status(500).json({error: err})
        }
    }
}