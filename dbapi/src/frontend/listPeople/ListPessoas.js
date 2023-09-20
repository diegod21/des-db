import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListaDePessoas() {
  const [pessoas, setPessoas] = useState([]);
  const [buscaNome, setBuscaNome] = useState('');
  const [buscaCidade, setBuscaCidade] = useState('');
  const [buscaBairro, setBuscaBairro] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/pessoas')
      .then((response) => {
        setPessoas(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar pessoas:', error);
      });
  }, []);

  const pessoasFiltradas = pessoas.filter((pessoa) =>
    pessoa.nome.toLowerCase().includes(buscaNome.toLowerCase()) &&
    pessoa.cidade.toLowerCase().includes(buscaCidade.toLowerCase()) &&
    pessoa.bairro.toLowerCase().includes(buscaBairro.toLowerCase())
  );

  return (
    <div className='box'>
      <h4>Lista de Pessoas</h4>
        <div className='busca'>
  
          <label htmlFor='text'>Nome</label>
          <input
            type='text'
            value={buscaNome}
            onChange={(ev) => setBuscaNome(ev.target.value)}
          />
        </div>

        <div className='busca'>
          <label htmlFor='text'>Cidade</label>
          <input
            type='text'
            value={buscaCidade}
            onChange={(ev) => setBuscaCidade(ev.target.value)}
          />
        </div>

        <div className='busca'>
          <label htmlFor='text'>Bairro</label>
          <input
            type='text'
            value={buscaBairro}
            onChange={(ev) => setBuscaBairro(ev.target.value)}
          />
        </div>

        <div className='compflex'>
          <div>Lista de Pessoas</div>
          <div>Nome Empresa <br></br> Av. Euclides da Cunha, 190</div>
        </div>

        <table className='listTable'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Cidade</th>
              <th>Bairro</th>
            </tr>
          </thead>
          <tbody>
            {pessoasFiltradas.map((pessoa) => (
              <tr key={pessoa.id}>
                <td>{pessoa.id}</td>
                <td>{pessoa.nome}</td>
                <td>{pessoa.cidade}</td>
                <td>{pessoa.bairro}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
}

export default ListaDePessoas;
