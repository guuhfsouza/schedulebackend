const connection = require('../database/connection');


module.exports = {
    async index(request, response){
        const {idUser, date} = request.query;

        try{
            const profileSchedule = await connection('Schedule')
            .where('Schedule.idUser', idUser)
            .andWhere('Schedule.date', date)
            .join('Users', 'Users.idUser', '=', 'Schedule.idUser')
            .join('Service', 'Service.idService', '=', 'Schedule.idService')
            .select('Schedule.idSchedule','Schedule.client', 'Service.service', 'Schedule.date', 'Schedule.hour',
            'Schedule.status', 'Service.price', 'Users.nameUser' );

            return response.json(profileSchedule);
            
        } catch(err){
            return response.status(500).json({ error: err})
        }
        


    }   
}