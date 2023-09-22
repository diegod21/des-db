import React, { useEffect, useState } from 'react';
import axios from 'axios';

function VendasList() {
  const [prodVenda, setProdVenda] = useState('');
  const [pessoaVenda, setPessoaVenda] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/vendas')
      .then(response => {
        if (response.data.length === 0) {
          console.log('A tabela de pessoas está vazia.');
        } else {
          setVendas(response.data);
          console.log(response);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar dados das pessoas:', error);
      });
  }, []);

  const vendasFiltradas = vendas.filter((venda) => {
    const nomeLowerCase = venda.nome ? venda.nome.toLowerCase() : '';
    const produtoLowerCase = venda.produto ? venda.produto.toLowerCase() : '';
  
    return (
      nomeLowerCase.includes(pessoaVenda.toLowerCase()) &&
      produtoLowerCase.includes(prodVenda.toLowerCase()) &&
      (dataInicio === '' || venda.datav >= dataInicio) &&
      (dataFim === '' || venda.datav <= dataFim)
    );
  });
  

  return (
    <div className='box'>
      
      <h4>Lista de Vendas</h4>
       <div className='busca'>
         <label htmlFor='text'>Produto</label>
               <input
          type='text'
          value={prodVenda}
          onChange={ev => setProdVenda(ev.target.value)}
               />
       </div>

       <div className='busca'>
         <label htmlFor='text'>Nome</label>
               <input
          type='text'
          value={pessoaVenda}
          onChange={ev => setPessoaVenda(ev.target.value)}
               />
       </div>

       <div className='busca'>
         <label htmlFor='text'>Periodo de Venda</label>
               <input
          type='date'
          value={dataInicio}
          onChange={ev => setDataInicio(ev.target.value)}
               />
               <input
          type='date'
          value={dataFim}
          onChange={ev => setDataFim(ev.target.value)}
               />
       </div>
       <div className='compflex'>
          <div>Lista de Pessoas</div>
          <div>Nome Empresa <br></br> Av. Euclides da Cunha, 190</div>
        </div>
       <table className='listTable'>
          <thead>
            <tr>
              <th>Código</th>
              <th>Pessoa</th>
              <th>Sub-total</th>
            </tr>
          </thead>
          <tbody>
            {vendasFiltradas.map((venda) => (
              <tr key={venda.id}>
                <td>{venda.id}</td>
                <td>{venda.nome}</td>
                <td>{venda.subtotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
}

export default VendasList;
