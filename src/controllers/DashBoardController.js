const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {

index(req, res){
        
    const jobs = Job.get();
    const profile = Profile.get();


    let statusCount = {

        progress : 0,
        done : 0,
        total : jobs.length 

    }
    
        //total de horas/dia de cada job progress
        let jobTotalHours = 0;

        const updatedJobs = jobs.map((job) =>{
                //ajustes no job
                
        const remaing = JobUtils.remaingDays(job)
        const status = remaing <= 0 ? 'done' : 'progress'

        //somado quantidade de status

        statusCount[status] += 1;

        //total de horas/dia de cada job progress
        jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours
       
                
       

            return {
        ...job,
        remaing,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"])
        }

    
    })

        //qtdade de horas que quero trabalhar por dia menos quantidade de horas/dia de cada job progress
        const freeHours = profile["hours-per-day"] - jobTotalHours;

        return res.render( "index", {jobs : updatedJobs, profile:profile, statusCount, freeHours })
}

}
