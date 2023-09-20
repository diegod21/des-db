import React, {useEffect, useState} from "react";
import Header from "../components/Header";
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

    const handleDeleteVenda = (id) => {
      axios.delete(`http://localhost:5000/venda/${id}`)
        .then(response => {
          console.log('Venda excluído com sucesso!', response);
          
          setVendas(vendas.filter(venda => venda.id !== id));
        })
        .catch(error => {
          console.error('Erro ao excluir o Venda:', error);
        });
    };


    return(
        <div className="listbox">
            <Header  formType="vendas"></Header>
<div className="box">
  
      <table className="listTable">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Total</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {vendas.map((venda) => (
          <tr key={venda.id}>
            <td>{venda.id}</td>
            <td>{venda.nome}</td>
            <td>{venda.subtotal}</td>
            <td>
                  <button onClick={() => handleDeleteVenda(venda.id)} className='button deletebtn'>X</button>
                  <button className='button changebtn'>+</button>
                </td>
          </tr>
        ))}
      </tbody>
    </table>
</div>
        </div>
    )
}

export default Vendas