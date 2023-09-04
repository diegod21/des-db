import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListaDePessoas() {
  const [pessoas, setPessoas] = useState([]);

  useEffect(() => {
    
    axios.get('http://localhost:5000/pessoas')
      .then((response) => {
        setPessoas(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar pessoas:', error);
      });
  }, []);






  
    const [busca, setBusca] = useState('')
    const pessoasFiltradas = pessoas.filter((pessoa) =>
    pessoa.nome.toLowerCase().startsWith(busca.toLowerCase())
  );
  return (
    <div className='container'>
      <h1>Lista de Pessoas</h1>
      <div className='form'>
      <input type='text' 
      value={busca}
      onChange={(ev => setBusca(ev.target.value))}/>
      <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
      </tr>
    </thead>
    <tbody>
      {pessoasFiltradas.map((pessoa) => (
        <tr key={pessoa.id}>
          <td>{pessoa.id}</td>
          <td>{pessoa.nome}</td>
        </tr>
      ))}
    </tbody>
  </table>
      </div>
    </div>
      )
  }

export default ListaDePessoas;
