import React, {useEffect, useState} from "react";
import Header from "./Header";
import axios from "axios";

function Vendas(){

    const [vendas, setVendas] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:5000/vendas')
        .then(response => {
          if (response.data.length === 0) {
            console.log('A tabela de pessoas está vazia.');
          } else {
            setVendas(response.data);
            console.log(response)
          }
        })
        .catch(error => {
          console.error('Erro ao buscar dados das Vendas:', error);
        });
    }, []);
    return(
        <div>
            <h2>Vendas</h2>
            <Header  formType="vendas"></Header>

            <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      {vendas.map((venda) => (
        <tr key={venda.id}>
          <td>{venda.id}</td>
          <td>{venda.nome}</td>
          <td>{venda.subtotal}</td>
        </tr>
      ))}
    </tbody>
  </table>
        </div>
    )
}

export default Vendas