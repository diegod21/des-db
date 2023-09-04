import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProdutosForm() {
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

    // Se o campo que está mudando for "produto", atualize o preço
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
          : '', // Calcule o subtotal automaticamente
      });
    } else if (name === 'qtde' || name === 'preco') {
      // Se o campo for "qtde" ou "preco", recalcule o subtotal
      setFormData({
        ...formData,
        [name]: value,
        subtotal: formData.produto
          ? value * formData.preco
          : '', // Calcule o subtotal automaticamente
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
      });
  };

  return (
    <div className='form'>
      <form>
        <input
          type="number"
          name="id"
          placeholder="id"
          value={formData.id}
          onChange={handleChange}
        />
        <input
          type="date"
          name="datav"
          placeholder="Data de venda"
          value={formData.datav}
          onChange={handleChange}
        />
        <select name="nome" value={formData.nome} onChange={handleChange}>
          <option value="">Selecione um nome</option>
          {possibleNames.map((name) => (
            <option key={name.id} value={name.nome}>
              {name.nome}
            </option>
          ))}
        </select>

        <select name="produto" value={formData.produto} onChange={handleChange}>
          <option value="">Selecione um Produto</option>
          {possibleProdutos.map((produto) => (
            <option key={produto.id} value={produto.produto}>
              {produto.produto}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="qtde"
          placeholder="Quantidade"
          value={formData.qtde}
          onChange={handleChange}
        />

        <input
          type="number"
          name="preco"
          placeholder="Preço"
          value={formData.preco}
          onChange={handleChange}
        />

        <input
          type="number"
          name="subtotal"
          placeholder="Sub-Total"
          value={formData.subtotal}
          onChange={handleChange}
        />
      </form>
      <button type="submit" onClick={handleSubmit}>
        Confirmar
      </button>
      <button>Cancelar</button>
    </div>
  );
}

export default ProdutosForm;
