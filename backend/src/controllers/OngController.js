const connection = require('../database/connection')
const crypto = require('crypto')

module.exports = {

  async index (request, response) {
    const ongs = await connection('ongs').select('*')
  
    return response.json(ongs)
  },

  async create(request, response) {

  //Variavel para armazenar os dados enviado pelo usuario através do req.body, assim enviando apenas o necessario
  const { name, email, whatsapp, city, uf } = request.body;
  // utilizando o crypto para gerar uma id aleatoria e convertendo ela para string do tipo HEXADECIMAL
  const id = crypto.randomBytes(4).toString('HEX')

  //Inserindo os dados enviados pelo usuario e o id gerado automatico na tabela 'ongs' do banco de dados
  await connection('ongs').insert({
    id,
    name,
    email,
    whatsapp,
    city,
    uf,
  })

  return response.json({ id })
}}