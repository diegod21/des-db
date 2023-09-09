import React, {useState,  useEffect} from 'react'
import axios from 'axios'

function PeopleForm(){
    
  const [possibleCities, setPossibleCities] = useState([]);
  const [possibleBairros, setPossibleBairros] = useState([]);
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

  useEffect(() => {
    axios
      .get('http://localhost:5000/bairros')
      .then((response) => {
        if (response.data.length === 0) {
          console.log('A tabela de Produtos está vazia.');
        } else {
          setPossibleBairros(response.data);
          console.log(response);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar dados dos Produtos:', error);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:5000/cities')
      .then((response) => {
        if (response.data.length === 0) {
          console.log('A tabela de Produtos está vazia.');
        } else {
          setPossibleCities(response.data);
          console.log(response);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar dados dos Produtos:', error);
      });
  }, []);


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
                      name="nome"
                      placeholder="Nome"
                      value={formData.nome}
                      onChange={handleChange}
                      />
                </div>


                 
                  <select name="cidade" value={formData.cidade} onChange={handleChange}>
                   <option value="">Selecione Uma Cidade</option>
                     {possibleCities.map((cidade) => (
                   <option key={cidade.id} value={cidade.nome}>
                      {cidade.cidade}
                    </option>
                     ))}
                  </select>

                  <select name="bairro" value={formData.bairro} onChange={handleChange}>
                   <option value="">Selecione Um Bairro</option>
                     {possibleBairros.map((bairro) => (
                   <option key={bairro.id} value={bairro.bairro}>
                      {bairro.bairro}
                    </option>
                     ))}
                  </select>

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