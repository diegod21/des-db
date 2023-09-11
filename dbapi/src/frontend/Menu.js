import './css/global.css'
import { Link } from 'react-router-dom';
import Footer from './footer'

function Menu (){
    return(
        <div className='container'>
           <table className='menutable'>
        <thead>
          <tr>
            <th>Cadastro</th>
            <th>Movimento</th>
            <th>Relatório</th>
            <th colSpan="3">Admin</th>
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
            <td><Link to="/sellList" className='list'>Lista de Vendas</Link></td>
          </tr>
          <tr>
            <td><Link to="/pessoas" className='list'>Pessoas</Link></td>
          </tr>
          <tr>
            <td><Link to="/produtos" className='list'>Produtos</Link></td>
          </tr>
        </tbody>
        <colgroup>
          <col />
          <col />
          <col />
          <col style={{ width: "33%" }} />
          <col style={{ width: "33%" }} />
          <col style={{ width: "33%" }} />
        </colgroup>
      </table>
     <Footer></Footer>
        </div>
        
    )
}
export default Menu