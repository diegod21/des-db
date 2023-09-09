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
  
  const handleDeletePerson = (id) => {
    axios.delete(`http://localhost:5000/people/${id}`)
      .then(response => {
        console.log('Bairro excluído com sucesso!', response);
        
        setPessoas(pessoas.filter(pessoa => pessoa.id !== id));
      })
      .catch(error => {
        console.error('Erro ao excluir o bairro:', error);
      });
  };


  const formatTelefone = (telefone) => {
      return `(${telefone.slice(0, 2)}) ${telefone.slice(2)}`;
   
  };
  return (
    <div className='listbox'>
       <Header formType="people"></Header>
      <div className='box'>
        <table className='listTable'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Cidade</th>
          <th>Telefone</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {pessoas.map((pessoa) => (
          <tr key={pessoa.id}>
            <td>{pessoa.id}</td>
            <td>{pessoa.nome.charAt(0).toUpperCase() + pessoa.nome.slice(1)}</td>
            <td>{pessoa.cidade.charAt(0).toUpperCase() + pessoa.cidade.slice(1)}</td>
            <td>{formatTelefone(pessoa.telefone)}</td>
            <td>
                <button className="button deletebtn"  onClick={() => handleDeletePerson(pessoa.id)}>X</button>
                <button className="button changebtn">+</button>
            </td>

          </tr>
        ))}
      </tbody>
        </table>
      </div>
    </div>

  );
}

export default Pessoas;
