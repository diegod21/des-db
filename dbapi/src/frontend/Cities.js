import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header'

function Cities() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/cities')
      .then(response => {
        if (response.data.length === 0) {
          console.log('A tabela de cidades está vazia.');
        } else {
          setCities(response.data);
          console.log(response)
        }
      })
      .catch(error => {
        console.error('Erro ao buscar dados das cidades:', error);
      });
  }, []);
  
  

  return (
    <div className='container'>
      <Header formType="cities"></Header>
      <h2>Cidades</h2>
      <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>UF</th>
      </tr>
    </thead>
    <tbody>
      {cities.map((city) => (
        <tr key={city.id}>
          <td>{city.id}</td>
          <td>{city.cidade}</td>
          <td>{city.UF}</td>
        </tr>
      ))}
    </tbody>
  </table>
    </div>
  );
}

export default Cities;
