
import React from 'react'
import Menu from './frontend/Menu'
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import People from './frontend/People'
import PeopleForm from './frontend/People-form'
import Cities from './frontend/Cities'
import Citiesform from './frontend/Cities-form';
import Bairros from './frontend/Bairro';
import BairroForm from './frontend/Bairro-form';
import Produtos from './frontend/Produtos';
import ProdutosForm from './frontend/Produto-form';
import Vendas from './frontend/Vendas'
import VendasForm from './frontend/Vendas-form'
import ListaPessoas from './frontend/ListPessoas'

function App() {

  return (

    <Router>
    <div>
      <Routes>

        <Route path="/" element={<Menu />} />
        <Route path="/pessoas" element={<People />} />
        <Route path="/people-form" element={<PeopleForm />} />
        <Route path="/Cities" element={<Cities />} />
        <Route path="/City-form" element={<Citiesform />} />
        <Route path="/bairro" element={<Bairros />} />
        <Route path="/bairro-form" element={<BairroForm />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/produtos-form" element={<ProdutosForm />} />
        <Route path="/vendas" element={<Vendas />} />
        <Route path="/vendas-form" element={<VendasForm />} />
        <Route path="/peoplelist" element={<ListaPessoas />} />



      </Routes>
    </div>
    </Router>
  );
}

export default App;
