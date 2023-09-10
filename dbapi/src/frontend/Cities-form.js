import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Citiesform(){
    

  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    cidade: '',
    UF:'',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/add-citie', formData , {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log('Dados enviados com sucesso!', response.data);
        navigate('/cities')
      }) }




    return(
        <div className='box flexbtn'>
            <div>
              <form>
               <div className='input-group'>
              
                 <div className='labelflex w20'>
                   <label htmlFor='id'>Còdigo</label>
                     <input
                        className='w0'
                         type="number"
                         name="id"
                         value={formData.id}
                         onChange={handleChange}
                         />
                 </div>
                    <div className='labelflex w70'>
                      <label htmlFor='cidade'>Cidade</label>
                      <input
                        className='w0'
                         type="text"
                         name="cidade"
                         value={formData.cidade}
                         onChange={handleChange}
                         />
                    </div>
                   <div className='labelflex w20'>
                        <label htmlFor='UF'>Sigla UF</label>
                         <input
                         className='w0'
                        type="text"
                        name="UF"
                        value={formData.UF}
                        onChange={handleChange}
                        />
                   </div>
               </div>
              </form>
            </div>
            <div className='button-group'>
                <button type="submit" onClick={handleSubmit} className='subbtn'>Confirmar</button>
                <button className='canbtn' onClick={()=>{navigate('/cities')}}>Cancelar</button>
              </div>
        </div>
    )
}

export default Citiesform