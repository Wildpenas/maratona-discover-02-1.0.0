const express = require('express')

const routes = express.Router()

const ProfileController = require('./controllers/ProfileController')




const Job = {
    data:[{
        id: 1,
        name: "Pizzaria Guloso",
         'daily-hours': 2,
          'total-hours': 1,
            create_at: Date.now(),     //atribuido data de criacao (hoje)
           
        },
    {
        id: 2,
        name: "OneTwo Project",
         'daily-hours': 3,
          'total-hours': 43,
            create_at: Date.now(),    //atribuido data de criacao (hoje)
           
        }
    ],

    controllers:{
        index(req, res){
            
            const updatedJobs = Job.data.map((job) =>{
                    //ajustes no job
                    
            const remaing = Job.services.remaingDays(job)
            const status = remaing <= 0 ? 'done' : 'progress'
                    
            
            return {
                ...job,
                remaing,
                status,
                budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
            }
            
        })
    
                return res.render( "index", {jobs : updatedJobs })
            },

        create(req,res){
           return res.render( "job"); 
        },
        save(req, res){
        

            //[ { name: 'tomate', 'daily-hours': '5', 'total-hours': '3' } ] //req.body

        
            const lastId = Job.data.length ? Job.data[Job.data.length - 1].id : 0;
            console.log(lastId);

            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                'daily-hours': req.body["daily-hours"],
                'total-hours': req.body["total-hours"],
                    create_at: Date.now()   
            });

            console.log(Job.data);

            return res.redirect("/");

        },
        show(req,res){
            const jobId = req.params.id;

            let job =     Job.data.find(job => Number(job.id) === Number(jobId))

            if(!job){

              return  res.send('Job not found!')

            }

            job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])


            return res.render(basePath + "job-edit", {job})
        },

        update(req,res){
            const jobId = req.params.id

            const job =     Job.data.find(job => Number(job.id) === Number(jobId))

            if(!job){

              return  res.send('Job not found!')

            }
            

            const updatedJob = {
                ...job,
                name: req.body.name,
                'daily-hours': req.body['daily-hours'],
                'total-hours': req.body['total-hours']

            }
        
            Job.data = Job.data.map(job => {
                if(Number(job.id) === Number(jobId)){
                    job = updatedJob
                }
                console.log(job)
                return job    
            })
            res.redirect('/job/' + jobId)
        },

        delete(req,res){
            const jobId = req.params.id

            Job.data =Job.data.filter(job => Number(job.id) !== Number(jobId))


            return res.redirect('/')
        }
    },

    services:{
        remaingDays(job){
            //calculo de tempo restante
        
            const remaingDays = (job['total-hours'] / job['daily-hours']).toFixed()
        
            const createdDate = new Date(job.create_at)
            const dueDay = createdDate.getDate() + Number(remaingDays)
            const dueDateInMs = createdDate.setDate(dueDay) 
        
            const timeDiffInMs =dueDateInMs - Date.now()
        
            // transformar milisegundos em dia
            const dayInMs = 1000 * 60 * 60 * 24
        
            const dayDiff = Math.ceil(timeDiffInMs / dayInMs)
            
        
            //restam x dias
            return dayDiff
        },
        calculateBudget:(job, valueHour) => valueHour * job['total-hours']

    }


}

routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)


module.exports = routes;

