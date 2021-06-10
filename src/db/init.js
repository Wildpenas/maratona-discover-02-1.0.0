const Database = require('./config')

const initDb ={
   async init(){


//abrindo a base de dados
const db = await Database();


await db.exec(`CREATE TABLE profile(

    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    avatar TEXT,
    monthly_budget INT,
    days_per_week INT,
    hours_per_day INT,
    vacation_per_year INT,
    value_hour INT
)`
);

await db.exec(`CREATE TABLE jobs(

    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    daily_hours INT,
    total_hours INT,
    create_at DATETIME
    
)`
);

await db.run(`INSERT INTO profile(

    name,
    avatar,
    monthly_budget,
    days_per_week,
    hours_per_day,
    vacation_per_year,
    value_hour
) VALUES(
    "Penas Nipute",
    "https://scontent.fmpm4-1.fna.fbcdn.net/v/t1.6435-9/49896691_2084261268321641_5697217171172622336_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=VD7sqxicwI4AX-nEc-T&tn=UO04H66EQuLAnJTM&_nc_ht=scontent.fmpm4-1.fna&oh=a6e7153edff65f6063d09879a0463237&oe=60DE9C10",
    3000,
    5,
    5,
    4,
    75
)`);

await db.run(`INSERT INTO jobs(

    
    name,
    daily_hours,
    total_hours,
    create_at
) VALUES(
    "Pizzaria Guloso",
    2,
    1,
    1623356560651
)`);

await db.run(`INSERT INTO jobs(

    
    name,
    daily_hours,
    total_hours,
    create_at
) VALUES(
    "OneTwo Project",
    3,
    43,
    1623356756651
)`);


//fechar a base de dados
 await db.close();

    }
}

initDb.init()