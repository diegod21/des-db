const express = require('express');
const app = express()
const connection = require('./database/impData')
const path = require('path');
const cors = require('cors');
app.use(express.json())


app.use(cors());

app.get('/cities', (req,res)=>{
  const query = 'SELECT * FROM cities';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar pessoas:', err);
      res.status(500).json({ error: 'Erro ao buscar pessoas' });
    } else {
      res.json(results);
    }
  });
})

app.get('/produtos', (req,res)=>{
  const query = 'SELECT * FROM produtos';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar pessoas:', err);
      res.status(500).json({ error: 'Erro ao buscar pessoas' });
    } else {
      res.json(results);
    }
  });
})

app.get('/bairros', (req,res)=>{
  const query = 'SELECT * FROM bairros';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar pessoas:', err);
      res.status(500).json({ error: 'Erro ao buscar pessoas' });
    } else {
      res.json(results);
    }
  });
})

app.get('/pessoas', (req, res) => {
  const query = 'SELECT * FROM pessoas';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar pessoas:', err);
      res.status(500).json({ error: 'Erro ao buscar pessoas' });
    } else {
      res.json(results);
    }
  });
}); 

app.get('/vendas', (req, res) => {
  const query = 'SELECT * FROM venda';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar pessoas:', err);
      res.status(500).json({ error: 'Erro ao buscar pessoas' });
    } else {
      res.json(results);
    }
  });
});


app.post('/add-people', (req, res) => {

  const { id, nome, cidade, bairro, cep, endereco, numero, complemento, telefone, email } = req.body;

  const query = 'INSERT INTO pessoas (id, nome, cidade, bairro, cep, endereco, numero, complemento, telefone, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [id, nome, cidade, bairro, cep, endereco, numero, complemento, telefone, email];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Erro ao inserir pessoa no banco de dados:', err);
      res.status(500).json({ error: 'Erro ao inserir pessoa' });
    } else {
      console.log('Pessoa inserida com sucesso!');
      res.status(200).json({ message: 'Pessoa inserida com sucesso!' });
    }
  });
});

app.post('/add-citie', (req, res) => {

  const { id, cidade, UF } = req.body;

  const query = 'INSERT INTO cities (id, cidade, UF ) VALUES (?, ?, ?)';
  const values = [id, cidade, UF ];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Erro ao inserir Cidade no banco de dados:', err);
      res.status(500).json({ error: 'Erro ao inserir Cidade' });
    } else {
      console.log('Pessoa inserida com sucesso!');
      res.status(200).json({ message: 'Cidade inserida com sucesso!' });
    }
  });
});

app.post('/add-bairro', (req, res) => {

  const { id, bairro } = req.body;

  const query = 'INSERT INTO bairros (id, bairro ) VALUES (?, ?)';
  const values = [id, bairro];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Erro ao inserir Bairro no banco de dados:', err);
      res.status(500).json({ error: 'Erro ao inserir Bairro' });
    } else {
      console.log('Bairro inserida com sucesso!');
      res.status(200).json({ message: 'Bairro inserida com sucesso!' });
    }
  });
});

app.post('/add-produto', (req, res) => {

  const { id, produto , preco } = req.body;

  const query = 'INSERT INTO produtos (id, produto , preco ) VALUES (?, ?, ?)';
  const values = [id, produto , preco];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Erro ao inserir Produto no banco de dados:', err);
      res.status(500).json({ error: 'Erro ao inserir Bairro' });
    } else {
      console.log('Produto inserida com sucesso!');
      res.status(200).json({ message: 'Produto inserida com sucesso!' });
    }
  });
});

app.post('/add-venda', (req, res) => {

  const { id, datav , nome , produto , qtde , preco , subtotal } = req.body;

  const query = 'INSERT INTO venda (id, datav , nome , produto , qtde , preco , subtotal ) VALUES (?, ?, ? , ?, ?, ? , ?)';
  const values = [id, datav , nome , produto , qtde , preco , subtotal];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Erro ao inserir Produto no banco de dados:', err);
      res.status(500).json({ error: 'Erro ao inserir Bairro' });
    } else {
      console.log('Produto inserida com sucesso!');
      res.status(200).json({ message: 'Produto inserida com sucesso!' });
    }
  });
});

app.delete('/bairros/:id', (req, res) => {
  const bairroId = req.params.id;

  const query = 'DELETE FROM bairros WHERE id = ?';

  connection.query(query, [bairroId], (err, result) => {
    if (err) {
      console.error('Erro ao excluir bairro:', err);
      res.status(500).json({ error: 'Erro ao excluir bairro' });
    } else {
      console.log('Bairro excluído com sucesso!');
      res.status(204).send();
    }
  });
});


const PORT = 5000
app.listen(PORT, () => {
  console.log(`Servidor backend está ouvindo na porta ${PORT}`);
});
