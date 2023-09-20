import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Formulario from './components/Form';
import Cart from "./components/Cart"
import TotalVendas from './components/Total';

function ProdutosForm() {
  const [totalVendas, setTotalVendas] = useState(0);
  const today = new Date().toISOString().substr(0, 10);
  const [cart, setCart] = useState([]);
  const [possibleNames, setPossibleNames] = useState([]);
  const [possibleProdutos, setPossibleProdutos] = useState([]);

  const [formData, setFormData] = useState({
    id: '',
    datav: today,
    nome: '',
    produto: '',
    produtoId: null,
    qtde: '',
    preco: '',
    subtotal: '',
  });


  useEffect(() => {
    axios.get('http://localhost:5000/pessoas')
      .then((response) => setPossibleNames(response.data))
      .catch((error) => console.error('Erro ao buscar nomes do banco de dados:', error));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/produtos')
      .then((response) => {
        if (response.data.length === 0) {
          console.log('A tabela de Produtos está vazia.');
        } else {
          setPossibleProdutos(response.data);
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
        produtoId: selectedProductDetails ? selectedProductDetails.id : null,
        preco: selectedProductDetails ? selectedProductDetails.preco : '',
        subtotal: selectedProductDetails
          ? selectedProductDetails.preco * formData.qtde
          : '',
      });
    } else if (name === 'qtde' || name === 'preco') {
      setFormData({
        ...formData,
        [name]: value,
        subtotal: formData.produtoId ? value * formData.preco : '',
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addToCart = () => {
    if (formData.produto && formData.qtde && formData.preco && formData.produtoId) {
      setCart([...cart, formData]);
      setFormData({
        id: '',
        datav: today,
        nome: '',
        produto: '',
        produtoId: null,
        qtde: '',
        preco: '',
        subtotal: calcularTotalVendas(),
      });
      setTotalVendas(calcularTotalVendas());
    } else {
      alert('Preencha todos os campos antes de adicionar ao carrinho.');
    }
  };

  const calcularTotalVendas = () => {
    let total = 0;
    for (const item of cart) {
      total += parseFloat(item.subtotal);
    }
    return total;
  };

  useEffect(() => {
    const newTotal = calcularTotalVendas();
    setTotalVendas(newTotal);
  }, [cart]);
  return (
    <div className='box flexbtn'>
      <div>
      <Formulario
          formData={formData}
          handleChange={handleChange}
          addToCart={addToCart}
          possibleNames={possibleNames}
          possibleProdutos={possibleProdutos}
        />
      <Cart 
          cart={cart}
          setCart={setCart}
          />
    
      </div>
      <TotalVendas 
      totalVendas={totalVendas} 
      cart={cart}
      formData={formData}
      />
    </div>
  );
}

export default ProdutosForm;
