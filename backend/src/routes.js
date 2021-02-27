const express = require('express')
const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

//Rota para efetuar login
routes.post('/sessions', SessionController.create)
//Rota de listagem de todas as ongs cadastradas
routes.get('/ongs', OngController.index)
//Rota para cadastro de uma nova Ong
routes.post('/ongs', OngController.create)
//Rota para cadastro de casos/incidents
routes.post('/incidents', IncidentController.create)
//Rota de listagem de todos os casos/incidents
routes.get('/incidents', IncidentController.index)
//Rota para deletear um caso/incidents
routes.delete('/incidents/:id', IncidentController.delete)
//Rota para listar todos os casos criado por uma Ong
routes.get('/profile', ProfileController.index)
module.exports = routes