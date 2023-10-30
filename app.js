const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const xml2js = require('xml2js'); // Importe a biblioteca xml2js
const xmlDataModel = require('./models/xmlData');

require('dotenv').config();

const app = express();
app.use(express.json()); // Adicione o middleware para análise de JSON

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/xml/upload', (req, res) => {
  const xmlData = req.body.xml; // Supondo que o XML seja enviado no corpo da solicitação com a chave "xml"

  const parser = new xml2js.Parser();

  parser.parseString(xmlData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erro na análise XML' });
    }

    // Agora você pode acessar os dados no objeto result e salvá-los no MongoDB
    const xmlObject = result;

    const newData = new xmlDataModel({
      campo1: xmlObject.dado1,
      campo2: xmlObject.dado2,
      // Adicione mais campos conforme necessário
    });

    newData.save((err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao salvar dados no banco de dados' });
      }

      return res.status(200).json({ message: 'Dados salvos com sucesso' });
    });
  });
});

app.listen(3000, () => {
  console.log('Servidor em execução na porta 3000');
});
