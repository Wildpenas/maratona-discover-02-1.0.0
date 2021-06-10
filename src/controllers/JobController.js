const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')
module.exports = {
  
    create(req,res){
       return res.render( "job"); 
    },
    save(req, res){
    

        //[ { name: 'tomate', 'daily-hours': '5', 'total-hours': '3' } ] //req.body
        const jobs = Job.get();
    
        const lastId = jobs.length ? jobs[jobs.length - 1].id : 0;
        console.log(lastId);

        Job.create({
            id: lastId + 1,
            name: req.body.name,
            'daily-hours': req.body["daily-hours"],
            'total-hours': req.body["total-hours"],
                create_at: Date.now()   
        });

        console.log(jobs);

        return res.redirect("/");

    },
    show(req,res){
        const jobs = Job.get();
        const jobId = req.params.id;

        let job = jobs.find(job => Number(job.id) === Number(jobId))

        if(!job){

          return  res.send('Job not found!')

        }

        const profile = Profile.get();
        job.budget = JobUtils.calculateBudget(job, profile["value-hour"])


        return res.render("job-edit", {job})
    },

    update(req,res){
        const jobs = Job.get();
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

    delete(req,res){
        const jobId = req.params.id

        Job.delete(jobId)


        return res.redirect('/')
    }
} 