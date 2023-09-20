import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function ProdutosForm(){

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    produto: '',
    preco:'',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/add-produto', formData , {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log('Dados enviados com sucesso!', response.data);
        navigate('/produtos')
      }) }




    return(
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
  
                <div  className='labelflex w70'>
                  <label htmlFor='produto'>Produto</label>
                       <input
                       className='w0'
                          type="text"
                          name="produto"
                          value={formData.protudo}
                          onChange={handleChange}
                          />
                </div>
  
                <div className='labelflex w30'>
                  <label htmlFor='preco'>Preço Venda</label>
                          <input
                          className='w0'
                          type="number"
                          name="preco"
                          value={formData.preco}
                          onChange={handleChange}
                          />
                </div>
            </div>
              </form>
            </div>
            <div className='button-group'>
                <button type="submit" onClick={handleSubmit} className='subbtn'>Confirmar</button>
                <button className='canbtn' onClick={()=>{navigate('/produtos')}}>Cancelar</button>
              </div>
        </div>
    )
}

export default ProdutosForm