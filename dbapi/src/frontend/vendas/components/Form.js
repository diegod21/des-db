import React from 'react';

function Formulario({ formData, handleChange, addToCart , possibleNames , possibleProdutos }) {
  return (
    <form>
          <div className='input-group'>
            <div className='labelflex w20'>
              <label htmlFor='id'>Código</label>
              <input
                className='w0'
                type="number"
                name="id"
                value={formData.id}
                onChange={handleChange}
              />
            </div>
            <div className='labelflex w20'>
              <label htmlFor='datav'>Data</label>
              <input
                className='w0'
                type="date"
                name="datav"
                value={formData.datav}
                onChange={handleChange}
              />
            </div>
            <div className='labelflex w70'>
              <label htmlFor='nome'>Pessoa</label>
              <select
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className='w0'
              >
                <option value=""></option>
                {possibleNames.map((name) => (
                  <option key={name.id} value={name.nome}>
                    {name.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='input-group border'>
            <div className='labelflex w30'>
              <label htmlFor='produto'>Produto</label>
              <select
                name="produto"
                value={formData.produto}
                onChange={handleChange}
                className='w0'
              >
                <option value="">Selecione um Produto</option>
                {possibleProdutos.map((produto) => (
                  <option key={produto.id} value={produto.produto}>
                    {produto.produto}
                  </option>
                ))}
              </select>
            </div>
            <div className='labelflex w20'>
              <label htmlFor='qtde'>Quantidade</label>
              <input
                className='w0'
                type="number"
                name="qtde"
                value={formData.qtde}
                onChange={handleChange}
              />
            </div>
            <div className='labelflex w20'>
              <label htmlFor='preco'>Preço</label>
              <input
                className='w0'
                type="number"
                name="preco"
                value={formData.preco}
                onChange={handleChange}
              />
            </div>
            <div className='labelflex w20'>
              <label htmlFor='subtotal'>Sub-Total</label>
              <input
                className='w0'
                type="number"
                name="subtotal"
                value={formData.preco * formData.qtde}
                onChange={handleChange}
              />
            </div>
            <div className='labelflex w20'>
              <label htmlFor='subtotal' className='hidden'>Adicionar</label>
              <button type="button" onClick={addToCart} className='add-to-cart-btn w0'>+</button>
            </div>
          </div>
        </form>
  );
}

export default Formulario;
