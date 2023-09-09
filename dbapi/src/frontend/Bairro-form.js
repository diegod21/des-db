import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Header from './Header';

function BairroForm(){
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    bairro: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/add-bairro', formData , {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log('Dados enviados com sucesso!', response.data);
         navigate('/bairro');
      }) }




    return(
        <div className='page-container'>
          <Header  formType="bairro"></Header>
          <div className='box flexbtn'>
            
              <div>
                <form>
                  <div className='input-group'>

                  <label htmlFor='id'>ID:</label>
                      <input
                        className='w30'
                          type="number"
                          name="id"
                          value={formData.id}
                          onChange={handleChange}
                          />
                     <label htmlFor='bairro'>Bairro:</label>      
                       <input
                       className='w70'
                          type="text"
                          name="bairro"
                          value={formData.bairro}
                          onChange={handleChange}
                          />
                  </div>
                </form>
              </div>
              <div className='button-group'>
                <button type="submit" onClick={handleSubmit} className='subbtn'>Confirmar</button>
                <button className='canbtn' onClick={()=>{navigate('/bairro')}}>Cancelar</button>
              </div>
          </div>
        </div>
    )
}

export default BairroForm