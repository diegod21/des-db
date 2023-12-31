import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header'

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
    <div className='listbox'>
      <Header formType="bairro"></Header>
      <div className='box'>

       <table className='listTable'>
          <thead>
            <tr>
              <th>Código</th>
              <th>Bairro</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {bairros.map(bairro => (
              <tr key={bairro.id}>
                <td>{bairro.id}</td>
                <td>{bairro.bairro}</td>
                <td>
                  <button onClick={() => handleDeleteBairro(bairro.id)} className='button deletebtn'>X</button>
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

export default Bairros;
