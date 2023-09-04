import React, {useState} from 'react'
import axios from 'axios'

function ProdutosForm(){
    
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
                    name="produto"
                    placeholder="produto"
                    value={formData.protudo}
                    onChange={handleChange}
                    />
                    <input
                    type="number"
                    name="preco"
                    placeholder="Preço"
                    value={formData.preco}
                    onChange={handleChange}
                    />
            </form>
            <button type="submit" onClick={handleSubmit}>Confirmar</button>
            <button>Cancelar</button>
        </div>
    )
}

export default ProdutosForm