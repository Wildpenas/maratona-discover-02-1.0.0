const Database = require('../db/config')

module.exports = {

    async get(){

        const db = await Database()


        const jobs = await db.all(`SELECT * FROM jobs`)


        await db.close()

        return jobs.map(job =>({
            
                id: job.id,
                name:job.name,
                'daily-hours': job.daily_hours,
                'total-hours': job.total_hours,
                create_at: job.create_at 

            
        }));

    },

    update(newJob){

        data = newJob;
    
    },
    async delete(id){

        const db = await Database()

        await db.run(`DELETE FROM jobs WHERE id = ${id}`)

      await db.close()

    },
    async create(newJob){

        const db = await Database()


        await db.run(`INSERT INTO jobs(
            name,
            daily_hours,
            total_hours,
            create_at
        ) VALUES(
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob.create_at}
        )`)
    }

}