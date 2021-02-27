import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

import './styles.css'
import { FiArrowLeft } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault()

    const data ={
      name,
      email,
      whatsapp,
      city,
      uf,
    }

    try {
      
      const response = await api.post('/ongs',data)
      alert(`Seu ID de acesso: ${response.data.id}`)
      history.push('/')

    } catch(err) {
      alert('Erro no Cadastro, tente novamente!')
    }

  }
  
  return (
    <div className='register-container'>
      <div className="content">
        <section>
          <img src={logoImg} alt="BeTheHero" />

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
          <Link className='back-link' to="/">
            <FiArrowLeft size={16} color='#E02041'/>
            Já tenho cadastro
          </Link>
        </section>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Nome da ONGS' value={name} onChange={e => setName(e.target.value)} />
          <input type="email" placeholder='E-Mail' value={email} onChange={e => setEmail(e.target.value)} />
          <input type="text" placeholder='WhatsApp' value={whatsapp} onChange={e => setWhatsapp(e.target.value)}/>

          <div className="input-group">
            <input type="text" placeholder='Cidade'value={city} onChange={e => setCity(e.target.value)}/>
            <input type="text" placeholder='UF' style={{ width:80 }} value={uf} onChange={e => setUf(e.target.value)}/>
          </div>

          <button className='button' type='submit'>Cadastrar</button>
        </form>
      </div>
    </div>
  )
}

export default Register;