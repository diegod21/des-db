import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProdutosForm() {
  const [totalVendas, setTotalVendas] = useState(0);
  const navigate = useNavigate();
  const today = new Date().toISOString().substr(0, 10);
  

  const [formData, setFormData] = useState({
    id: '',
    datav: today,
    nome: '',
    produto: '',
    qtde: '',
    preco: '',
    subtotal: '',
  });

  const [cart, setCart] = useState([]); // Adiciona o estado do carrinho

  const [possibleNames, setPossibleNames] = useState([]);
  const [possibleProdutos, setPossibleProdutos] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/pessoas')
      .then((response) => {
        setPossibleNames(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error('Erro ao buscar nomes do banco de dados:', error);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:5000/produtos')
      .then((response) => {
        if (response.data.length === 0) {
          console.log('A tabela de Produtos está vazia.');
        } else {
          setPossibleProdutos(response.data);
          console.log(response);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar dados dos Produtos:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'produto') {
      const selectedProductDetails = possibleProdutos.find(
        (produto) => produto.produto === value
      );

      setFormData({
        ...formData,
        [name]: value,
        preco: selectedProductDetails ? selectedProductDetails.preco : '',
        subtotal: selectedProductDetails
          ? selectedProductDetails.preco * formData.qtde
          : '',
      });
    } else if (name === 'qtde' || name === 'preco') {
      setFormData({
        ...formData,
        [name]: value,
        subtotal: formData.produto ? value * formData.preco : '',
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addToCart = () => {
    if (formData.produto && formData.qtde && formData.preco) {
      setCart([...cart, formData]); // Adiciona os dados do formulário atual ao carrinho
      setFormData({
        id: '',
        datav: today,
        nome: '',
        produto: '',
        qtde: '',
        preco: '',
        subtotal: calcularTotalVendas(), // Atualize o subtotal do carrinho aqui
      });
  
      // Atualize o total de vendas aqui
      setTotalVendas(calcularTotalVendas());
    } else {
      alert('Preencha todos os campos antes de adicionar ao carrinho.');
    }
  };
  

  const calcularTotalVendas = () => {
    let total = 0;
    for (const item of cart) {
      total += item.subtotal;
    }
  
    // Inclua o subtotal do formData no cálculo
    total += parseFloat(formData.subtotal);
  
    return total;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/add-venda', formData, {
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
    <div className='box flexbtn'>
      <div>
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
          <div className='input-group'>
            <div className='labelflex w40'>
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
                value={formData.preco*formData.qtde}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
        <button type="button" onClick={addToCart} className='add-to-cart-btn'>
          Adicionar ao Carrinho
        </button>
        <div className='cart'>
          <h3>Carrinho</h3>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.produto} - Quantidade: {item.qtde} - Subtotal: {item.subtotal}
              </li>
            ))}
          </ul>
        </div>
        <div className='total-vendas'>
  <h3>Total de Vendas</h3>
  <p>{totalVendas}</p>
</div>

      </div>
      <div className='button-group'>
        <button type="submit" onClick={handleSubmit} className='subbtn'>
          Confirmar
        </button>
        <button className='canbtn' onClick={() => navigate('/vendas')}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default ProdutosForm;
