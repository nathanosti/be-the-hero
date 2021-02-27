const connection = require('../database/connection')

module.exports = {
  async delete(request, response) {
    const { id } = request.params
    //Verificando que ong esta logada através do ID da ong
    const ong_id = request.headers.authorization

    //Buscando no DB incidentes/casos que a ong criada tenha criado
    const incident = await connection('incidents').where('id', id).select('ong_id').first()

    /**
      *Verificando se o Id da Ong logada for de um incidente com Id diferente ou seja criado por outra Ongs, pra retorna uma
      mensagem de erro e nao realizar a exclusão do incident/caso
    */
    if(incident.ong_id !== ong_id) {
      return response.status(401).json({ error: 'Operation not permitted.' })
    }
    //Após verificar se o incident pertence a ong ai sim sera executado o delete no db
    await connection('incidents').where('id', id).delete()

    return response.status(204).send()
  },

  async index (request, response) {
    //Configurando paginação dos incidents, limitando quantidade a ser exibida por página!
    const { page = 1 } = request.query
    const incidents = await connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .limit(5)
    .offset((page - 1) * 5)
    .select([
    'incidents.*', 
    'ongs.name',
    'ongs.email', 
    'ongs.whatsapp', 
    'ongs.city', 
    'ongs.uf'])

    // Contando a quantia total de casos
    const [count] = await connection('incidents').count()
    // Armazenando o total de incidents no cabeçalho da resposta/response da aplicação(Header)
    response.header('X-Total-Count', count['count(*)'])

    return response.json(incidents)
  },

  async create (request, response) {
    const { tittle, description, value } = request.body
    const ong_id = request.headers.authorization

    const [id] = await connection('incidents').insert({
      tittle,
      description,
      value,
      ong_id
    })
    
    return response.json({ id })
  }
}