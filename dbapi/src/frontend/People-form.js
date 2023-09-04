import React, {useState} from 'react'
import axios from 'axios'

function PeopleForm(){
    
  const [formData, setFormData] = useState({
    id: '',
    nome: '',
    cidade: '',
    bairro: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    telefone: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/add-people', formData , {
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
                    name="nome"
                    placeholder="Nome"
                    value={formData.nome}
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
                    name="bairro"
                    placeholder="Bairro"
                    value={formData.bairro}
                    onChange={handleChange}
                    />


                <input
                    type="text"
                    name="cep"
                    placeholder="CEP"
                    value={formData.cep}
                    onChange={handleChange}
                    />

                <input
                    type="text"
                    name="endereco"
                    placeholder="Endereço"
                    value={formData.endereco}
                    onChange={handleChange}
                    />

                <input
                    type="text"
                    name="numero"
                    placeholder="Numero"
                    value={formData.numero}
                    onChange={handleChange}
                    />

                
                <input
                    type="text"
                    name="complemento"
                    placeholder="Complemento"
                    value={formData.complemento}
                    onChange={handleChange}
                    />

                <input
                    type="text"
                    name="telefone"
                    placeholder="Telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    />


                <input
                    type="text"
                    name="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleChange}
                    />
            </form>
            <button type="submit" onClick={handleSubmit}>Confirmar</button>
            <button>Cancelar</button>
        </div>
    )
}

export default PeopleForm