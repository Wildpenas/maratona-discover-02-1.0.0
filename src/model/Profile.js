
    let data = {
        name:"Penas Nipute",
        avatar:"https://scontent.fmpm4-1.fna.fbcdn.net/v/t1.6435-9/49896691_2084261268321641_5697217171172622336_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=VD7sqxicwI4AX-nEc-T&tn=UO04H66EQuLAnJTM&_nc_ht=scontent.fmpm4-1.fna&oh=a6e7153edff65f6063d09879a0463237&oe=60DE9C10",
        "monthly-budget":3000,
        "days-per-week":5,
        "hours-per-day":5,
        "vacation-per-year":4,
        "value-hour":75
    };

    module.exports = {

        get(){
            return data
        },
        
        update(newData){
            data = newData
        }

    }
