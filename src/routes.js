const express = require('express')

const routes = express.Router()

//const basePath = __dirname + "/views/";  //refatorando

const Profile ={
    data:{
        name:"Penas Nipute",
        avatar:"https://scontent.fmpm4-1.fna.fbcdn.net/v/t1.6435-9/49896691_2084261268321641_5697217171172622336_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=VD7sqxicwI4AX-nEc-T&tn=UO04H66EQuLAnJTM&_nc_ht=scontent.fmpm4-1.fna&oh=a6e7153edff65f6063d09879a0463237&oe=60DE9C10",
        "monthly-budget":3000,
        "days-per-week":5,
        "hours-per-day":5,
        "vacation-per-year":4,
        "value-hour":75
    },
    controllers:{
        index(req,res){
                return res.render(basePath + "profile", { profile : Profile.data })
        },

        update(req,res){
            //req.body para pegar os dados
            const data = req.body

            //definar quantas semanas tem um ano :52
            const weeksPerYear = 52

            //remover as semanas de ferias do ano, para pegar quantas semanas tem em um mes
            const weeksPerMonth =( weeksPerYear - data["vacation-per-year"] )/ 12

            //total de horas por semana estou trabalhando
            const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

            //horas trabalhadas por mes
            const monthlyTotalHours = weeksPerMonth * weekTotalHours

            //qual sera o valor da minha hora?
            const valueHour = data["monthly-budget"] / monthlyTotalHours

            Profile.data = data

            Profile.data ={
                ...Profile.data,
                ...req.body,
                "value-hour":valueHour
            }

            return res.redirect('/profile')
        }
    }
}

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
    
                return res.render(/*basePath+*/ "index", {jobs : updatedJobs })
            },

        create(req,res){
           return res.render(/*basePath +*/ "job"); 
        },
        save(req, res){
            //console.log("salvar dados...")

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


//request, response
/*
o ejs usa o render em vez do sendFile e conhece o camiho para a pasta view
routes.get('/', (req, res) =>  res.sendFile(basePath + "/index.html"))
routes.get('/job', (req, res) =>  res.sendFile(basePath + "/job.html"))
routes.get('/job/edit', (req, res) =>  res.sendFile(basePath + "/job-edit.html"))
routes.get('/profile', (req, res) =>  res.sendFile(basePath + "/profile.html"))
*/


routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)


module.exports = routes;

