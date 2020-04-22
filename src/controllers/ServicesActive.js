const connection = require('../database/connection');


module.exports = {
    async index(request, response){
        const cpfStore = request.headers.authorization;

        try{
            const services = await connection('Service')
            .select('*')
            .where('cpfStore', cpfStore)
            .andWhere('ative'.trim(), 'S');

            return response.json(services);
 
        }catch (err){
            return response.status(500).json({error: err});
        }
    }   
}