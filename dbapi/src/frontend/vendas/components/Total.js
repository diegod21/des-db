import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TotalVendas({ totalVendas, formData, cart }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calcula o subtotal antes de enviar os dados
    const subtotal = cart.reduce((acc, item) => {
      return acc + parseFloat(item.subtotal);
    }, 0);

    // Atualiza o formData com o subtotal calculado
    const updatedFormData = {
      ...formData,
      subtotal: subtotal.toFixed(2), // Converte para duas casas decimais
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
