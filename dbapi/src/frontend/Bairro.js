import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header'

function Bairros() {
  const [bairros, setBairros] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/bairros')
      .then(response => {
        if (response.data.length === 0) {
          console.log('A tabela de cidades está vazia.');
        } else {
          setBairros(response.data);
          console.log(response)
        }
      })
      .catch(error => {
        console.error('Erro ao buscar dados dos Bairros:', error);
      });
  }, []);


  const handleDeleteBairro = (id) => {
    axios.delete(`http://localhost:5000/bairros/${id}`)
      .then(response => {
        console.log('Bairro excluído com sucesso!', response);
        
        setBairros(bairros.filter(bairro => bairro.id !== id));
      })
      .catch(error => {
        console.error('Erro ao excluir o bairro:', error);
      });
  };

  

  return (
    <div className='container'>
      <Header formType="bairro"></Header>
      <h2>Bairros</h2>
      <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
      </tr>
    </thead>
    <tbody>
      {bairros.map((bairro) => (
        <tr key={bairro.id}>
          <td>{bairro.id}</td>
          <td>{bairro.bairro} <button className='delbutton' onClick={() => handleDeleteBairro(bairro.id)}>Deletar</button></td>
        </tr>
      ))}
    </tbody>
  </table>
    </div>
  );
}

export default Bairros;
