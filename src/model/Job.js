let data = [{
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
];

module.exports = {

    get(){

        return data;

    },

    update(newJob){

        data = newJob;
    
    },
    delete(id){

        data =  data.filter(job => Number(job.id) !== Number(id))

    }

}