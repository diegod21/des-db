import React, {useState,  useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function PeopleForm(){
    

  const navigate = useNavigate();

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
        navigate('/pessoas');
      }) }




    return(
        <div className='box flexbtn'>

          
            <form>
                <div className='input-group'>

                  <div className='labelflex w30'>

                    <label htmlFor='id'>Código:</label>
                    <input
                        className='w0'
                        type="number"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        />
                  </div>

                  <div className='labelflex w70'>
                    <label htmlFor='nome'>Nome:</label>
                    <input
                        className='w0'
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        />
                  </div>
                </div>


                 
                  <div className='input-group'>

                  <div className='labelflex w40'>
                    <label htmlFor='cidade'>Cidade</label>
                      <select name="cidade" value={formData.cidade} onChange={handleChange} className='w0'>
                       <option value=""></option>
                         {possibleCities.map((cidade) => (
                       <option key={cidade.id} value={cidade.nome}>
                          {cidade.cidade}
                        </option>
                         ))}
                      </select>
                  </div>

                    <div className='labelflex w40'>
                      <label htmlFor='bairro'>Bairro</label>
                      <select name="bairro" value={formData.bairro} onChange={handleChange} className='w0'>
                       <option value=""></option>
                         {possibleBairros.map((bairro) => (
                       <option key={bairro.id} value={bairro.bairro}>
                          {bairro.bairro}
                        </option>
                         ))}
                      </select>
                    </div>
                    
                    <div className='labelflex w20'>
                      <label htmlFor='cep'>CEP</label>
                      <input
                        className='w0'
                        type="text"
                        name="cep"
                        value={formData.cep}
                        onChange={handleChange}
                        />
                    </div>
                    </div>
                  <div className='input-group'>
                    
                  <div className='labelflex  w40'>
                    <label htmlFor='endereco'>Endereço</label>
                        <input
                        className='w0'
                        type="text"
                        name="endereco"
                        value={formData.endereco}
                        onChange={handleChange}
                        />
                  </div>

                    <div className='labelflex w30'>
                      <label htmlFor='numero'>Numero</label>
                      <input
                      className='w0'
                      type="text"
                      name="numero"
                      value={formData.numero}
                      onChange={handleChange}
                      />
                    </div>
                    
                    <div className='labelflex w40'>
                      <label htmlFor='complemento'>Complemento</label>
                      <input
                      className='w0'
                      type="text"
                      name="complemento"
                      value={formData.complemento}
                      onChange={handleChange}
                      />
                                        </div>
                    </div>

                <div className='input-group'>

                  <div className='labelflex w40'>
                    <label htmlFor='telefone'>Telefone</label>
                    <input
                    className='w0'
                        type="text"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        />
                  </div>

                  <div className='labelflex w70'>
                    <label htmlFor='email'>E-mail</label>
                    <input
                    className='w0'
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        />
                  </div>
                </div>
            </form>
            <div className='button-group'>
                <button type="submit" onClick={handleSubmit} className='subbtn'>Confirmar</button>
                <button className='canbtn' onClick={()=>{navigate('/pessoas')}}>Cancelar</button>
              </div>
        </div>
    )
}

export default PeopleForm