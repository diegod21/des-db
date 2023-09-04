import React from 'react';
import './css/global.css'
import { Link } from 'react-router-dom';

function Menu (){
    return(
        <div className='container flexbox'>
            <table>
      <thead>
        <tr>
          <th>Cadastro</th>
          <th>Movimento</th>
          <th>Relatório</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><Link to="/bairro" className='list'>Bairro</Link></td>
          <td><Link to="/vendas" className='list'>Vendas</Link></td>
          <td><Link to="/peoplelist" className='list'>Lista de pessoas</Link></td>
        </tr>
        <tr>
          <td><Link to="/cities" className='list'>Cidades</Link></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td><Link to="/pessoas" className='list'>Pessoas</Link></td>
          <td></td>
          <td></td>
        </tr>

        <tr>
          <td><Link to="/produtos" className='list'>Produtos</Link></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
        </div>
        
    )
}
export default Menu