import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header'

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

  const handleDeleteProduto = (id) => {
    axios.delete(`http://localhost:5000/produto/${id}`)
      .then(response => {
        console.log('produto excluído com sucesso!', response);
        
        setProdutos(produtos.filter(produto => produto.id !== id));
      })
      .catch(error => {
        console.error('Erro ao excluir o produto:', error);
      });
  };
  
  

  return (
    <div className='listbox'>
      <Header formType="produtos"></Header>
      <div className='box'>
        
        <table className='listTable'>
            <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Cidade</th>
          <th>Ações</th>
        </tr>
            </thead>
            <tbody>
        {produtos.map((prod) => (
          <tr key={prod.id}>
            <td>{prod.id}</td>
            <td>{prod.produto}</td>
            <td>{prod.preco}</td>
            <td>
                    <button onClick={() => handleDeleteProduto(prod.id)} className='button deletebtn'>X</button>
                    <button className='button changebtn'>+</button>
                  </td>
          </tr>
        ))}
            </tbody>
          </table>
      </div>
    </div>
  );
}

export default Produtos;
