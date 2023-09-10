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
  

  const handleDeleteBairro = (id) => {
    axios.delete(`http://localhost:5000/city/${id}`)
      .then(response => {
        console.log('Bairro excluído com sucesso!', response);
        
        setCities(cities.filter(city => city.id !== id));
      })
      .catch(error => {
        console.error('Erro ao excluir o bairro:', error);
      });
  };
  

  return (
    <div className='listbox'>
      <Header formType="cities"></Header>
      <div className='box'>
        <table className='listTable'>
            <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>UF</th>
          <th>Ações</th>
        </tr>
            </thead>
            <tbody>
        {cities.map((city) => (
          <tr key={city.id}>
            <td>{city.id}</td>
            <td>{city.cidade}</td>
            <td>{city.UF}</td>
            <td>
                  <button onClick={() => handleDeleteBairro(city.id)} className='button deletebtn'>X</button>
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

export default Cities;
