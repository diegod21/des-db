
import React from 'react'
import Menu from './frontend/Menu'
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import People from './frontend/people/People'
import PeopleForm from './frontend/people/People-form'
import Cities from './frontend/cities/Cities'
import Citiesform from './frontend/cities/Cities-form';
import Bairros from './frontend/bairro/Bairro';
import BairroForm from './frontend/bairro/Bairro-form';
import Produtos from './frontend/produtos/Produtos';
import ProdutosForm from './frontend/produtos/Produto-form';
import Vendas from './frontend/vendas/Vendas'
import VendasForm from './frontend/vendas/Vendas-form'
import ListaPessoas from './frontend/listPeople/ListPessoas'
import ListaVendas from './frontend/listSell/ListVendas'

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
        
        <Route path="/sellList" element={<ListaVendas />} />



      </Routes>
    </div>
    </Router>
  );
}

export default App;
