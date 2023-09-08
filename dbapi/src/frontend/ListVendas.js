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

  const vendasFiltradas = vendas.filter(venda =>
    venda.nome.toLowerCase().includes(pessoaVenda.toLowerCase()) &&
    venda.produto.toLowerCase().includes(prodVenda.toLowerCase()) &&
    (dataInicio === '' || venda.datav >= dataInicio) &&
    (dataFim === '' || venda.datav <= dataFim)
  );

  return (
    <div>
      <input
        type='text'
        placeholder='Buscar por Produto'
        value={prodVenda}
        onChange={ev => setProdVenda(ev.target.value)}
      />
      <input
        type='text'
        placeholder='Buscar por Nome'
        value={pessoaVenda}
        onChange={ev => setPessoaVenda(ev.target.value)}
      />
      <input
        type='date'
        placeholder='Data Início'
        value={dataInicio}
        onChange={ev => setDataInicio(ev.target.value)}
      />
      <input
        type='date'
        placeholder='Data Fim'
        value={dataFim}
        onChange={ev => setDataFim(ev.target.value)}
      />
      <ul>
        {vendasFiltradas.map(venda => (
          <li key={venda.id}> {venda.id} {venda.nome} {venda.subtotal}</li>
        ))}
      </ul>
    </div>
  );
}

export default VendasList;
