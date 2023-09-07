import React, {useState} from 'react'
import axios from 'axios'
import Header from './Header';

function BairroForm(){
    
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
      }) }




    return(
        <div className='page-container'>
          <Header  formType="bairro"></Header>
          <div className='box'>
            
              <form>
                <div className='input-group'>
                  
                    <input 
                      className='w30'
                        type="number"
                        name="id"
                        placeholder="id"
                        value={formData.id}
                        onChange={handleChange}
                        />
                     <input
                     className='w70'
                        type="text"
                        name="bairro"
                        placeholder="Bairro"
                        value={formData.bairro}
                        onChange={handleChange}
                        />
                </div>
              </form>
              <div className='button-group'>
                <button type="submit" onClick={handleSubmit}>Confirmar</button>
                <button>Cancelar</button>
              </div>
          </div>
        </div>
    )
}

export default BairroForm