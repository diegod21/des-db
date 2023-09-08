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
    <div className=''>
      <div className=''>
        <input
          type='text'
          placeholder='Buscar por nome'
          value={buscaNome}
          onChange={(ev) => setBuscaNome(ev.target.value)}
        />
        <input
          type='text'
          placeholder='Buscar por cidade'
          value={buscaCidade}
          onChange={(ev) => setBuscaCidade(ev.target.value)}
        />
        <input
          type='text'
          placeholder='Buscar por bairro'
          value={buscaBairro}
          onChange={(ev) => setBuscaBairro(ev.target.value)}
        />

        <table>
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
    </div>
  );
}

export default ListaDePessoas;
