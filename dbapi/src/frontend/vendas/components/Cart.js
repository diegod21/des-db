import React from 'react';

function Carrinho({ cart , setCart }) {


    const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.produtoId !== productId);
    setCart(updatedCart);
      };
  return (
    <div className='prodBox'>
          <table className='listTable'>
            <thead>
              <tr>
                <th>Código</th>
                <th>Produto</th>
                <th>Qtde</th>
                <th>Vr.Unitario</th>
                <th>Sub-Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((prod) => (
                <tr key={prod.produtoId}>
                  <td>{prod.produtoId}</td>
                  <td>{prod.produto}</td>
                  <td>{prod.qtde}</td>
                  <td>{prod.preco}</td>
                  <td>{prod.subtotal}</td>
                  <td>
                    <button onClick={() => removeFromCart(prod.produtoId)}className='button deletebtn'>X</button>
                    <button className='button changebtn'>+</button> 
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  );
}

export default Carrinho;
