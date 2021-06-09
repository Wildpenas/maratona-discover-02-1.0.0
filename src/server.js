const express = require("express");

const server = express()

const path = require('path')


//routes criando rotas
const routes = require("./routes")

//usando view/template engine
server.set('view engine', 'ejs')

//set é usado para fazer configuracoes no servidor

//mudar a localizacao da pasta viewa
server.set('views', path.join(__dirname, 'views'))
//habilitar arquivos estaticos
server.use(express.static("public"))

//usar o requ.body
server.use(express.urlencoded({ extended : true}))


//routes
server.use(routes)

//request, response
server.get('/', (req, res) => {

    //console.log('entrei no index')
    //console.log(__dirname + "/views/index.html")

    return res.sendFile(__dirname + "/views/index.html")

})


server.listen(3000, () => console.log('rodando...'))