import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TotalVendas({ totalVendas, formData, cart }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    

    const items = cart.map((item) => ({
      id_produto: item.produtoId,
      id_venda: formData.id,
      preco: item.preco,
      qtde: item.qtde
    }));

    const vendaData = {
      data: formData.datav,
      pessoa: formData.nome,
      total: totalVendas,
      items,
    };
  

    const subtotal = cart.reduce((acc, item) => {
      return acc + parseFloat(item.subtotal);
    }, 0);

    const updatedFormData = {
      ...formData,
      subtotal: subtotal.toFixed(2), 
    };

    axios
      .post('http://localhost:5000/add-venda', updatedFormData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Dados enviados com sucesso!', response.data);
        navigate('/vendas');
      });
    axios
      .post('http://localhost:5000/add-item-venda', vendaData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Dados enviados com sucesso!', response.data);
        navigate('/vendas');
      })
      .catch((error) => {
        console.error('Erro ao enviar os dados da venda:', error);
      });
  };

  return (
    <div className='total'>
      <div className='button-group'>
        <button type="submit" onClick={handleSubmit} className='subbtn'>
          Confirmar
        </button>
        <button className='canbtn' onClick={() => navigate('/vendas')}>
          Cancelar
        </button>
      </div>
      <div>
        <p>Total:</p>
        <p className='totalBtn'>{totalVendas.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default TotalVendas;
