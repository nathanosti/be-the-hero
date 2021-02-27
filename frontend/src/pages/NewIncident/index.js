import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api'

import { FiArrowLeft } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'

import './styles.css'

function NewIncident() {
  const [tittle, setTittle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const ongId = localStorage.getItem('ongId');
  const history = useHistory();

  async function handleNewncident(e) {
    e.preventDefault()

    const data = {
      tittle,
      description,
      value
    };

    try {
      await api.post('/incidents', data, {
        headers: {
          Authorization: ongId
        }
      })
      history.push('/profile')
    } catch (err) {
      alert('Erro ao cadastrar caso, tente novamente!')
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="BeTheHero" />

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link className='back-link' to='/profile'>
            <FiArrowLeft size={16} color='#E02041'/>
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewncident}>

          <input type="text" 
            placeholder='Título do caso'
            value={tittle}
            onChange={e => setTittle(e.target.value)}
          />
          <textarea type="text" 
            placeholder='Descrição'
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input type="text" 
            placeholder='Valor em reais'
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <div className="button-group">
            <Link className='button-secundary' to='/profile'>
              Cancelar
            </Link>
            <button type='submit' className='button' >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewIncident