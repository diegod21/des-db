import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header'

function Produtos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/produtos')
      .then(response => {
        if (response.data.length === 0) {
          console.log('A tabela de Produtos está vazia.');
        } else {
          setProdutos(response.data);
          console.log(response)
        }
      })
      .catch(error => {
        console.error('Erro ao buscar dados dos Produtos:', error);
      });
  }, []);
  
  

  return (
    <div>
      <Header formType="produtos"></Header>
      <h2>Produtos</h2>
      <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Cidade</th>
      </tr>
    </thead>
    <tbody>
      {produtos.map((prod) => (
        <tr key={prod.id}>
          <td>{prod.id}</td>
          <td>{prod.produto}</td>
          <td>{prod.preco}</td>
        </tr>
      ))}
    </tbody>
  </table>
    </div>
  );
}

export default Produtos;
