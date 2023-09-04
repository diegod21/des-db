import React, {useState} from 'react'
import axios from 'axios'

function Citiesform(){
    
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
      }) }




    return(
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
                    type="text"
                    name="cidade"
                    placeholder="Cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                    />
                <input
                    type="text"
                    name="UF"
                    placeholder="Sigla UF"
                    value={formData.UF}
                    onChange={handleChange}
                    />
            </form>
            <button type="submit" onClick={handleSubmit}>Confirmar</button>
            <button>Cancelar</button>
        </div>
    )
}

export default Citiesform