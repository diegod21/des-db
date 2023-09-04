import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header'

function Pessoas() {
  const [pessoas, setPessoas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/pessoas')
      .then(response => {
        if (response.data.length === 0) {
          console.log('A tabela de pessoas está vazia.');
        } else {
          setPessoas(response.data);
          console.log(response)
        }
      })
      .catch(error => {
        console.error('Erro ao buscar dados das pessoas:', error);
      });
  }, []);
  
  

  return (
    <div>
  <h2>Pessoas</h2>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Cidade</th>
        <th>Telefone</th>
      </tr>
    </thead>
    <tbody>
      {pessoas.map((pessoa) => (
        <tr key={pessoa.id}>
          <td>{pessoa.id}</td>
          <td>{pessoa.nome}</td>
          <td>{pessoa.cidade}</td>
          <td>{pessoa.telefone}</td>
        </tr>
      ))}
    </tbody>
  </table>
  <Header formType="people"></Header>
</div>

  );
}

export default Pessoas;
