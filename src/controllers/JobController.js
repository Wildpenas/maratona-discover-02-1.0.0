const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')
module.exports = {
  
    create(req,res){
       return res.render( "job"); 
    },
    async save(req, res){
    

        //[ { name: 'tomate', 'daily-hours': '5', 'total-hours': '3' } ] //req.body
        const jobs = await Job.get();
    
        await Job.create({
            
            name: req.body.name,
            'daily-hours': req.body["daily-hours"],
            'total-hours': req.body["total-hours"],
                create_at: Date.now()   
        });

        console.log(jobs);

        return res.redirect("/");

    },
    async show(req,res){
        const jobs = await Job.get();
        const jobId = req.params.id;

        let job = jobs.find(job => Number(job.id) === Number(jobId))

        if(!job){

          return  res.send('Job not found!')

        }

        const profile = await Profile.get();
        job.budget = JobUtils.calculateBudget(job, profile["value-hour"])


        return res.render("job-edit", {job})
    },

    async update(req,res){
        const jobs = await Job.get();
        const jobId = req.params.id

        const job =     jobs.find(job => Number(job.id) === Number(jobId))

        if(!job){

          return  res.send('Job not found!')

        }
        

        const updatedJob = {
            ...job,
            name: req.body.name,
            'daily-hours': req.body['daily-hours'],
            'total-hours': req.body['total-hours']

        };
    
        
        const newJobs = jobs.map(job => {
            if(Number(job.id) === Number(jobId)){
                job = updatedJob
            }
            console.log(job)
            return job    
        });

        Job.update(newJobs)

        res.redirect('/job/' + jobId)
    },

    async delete(req,res){
        const jobId = req.params.id

        await Job.delete(jobId)


        return res.redirect('/')
    }
} 