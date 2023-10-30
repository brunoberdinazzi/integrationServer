const express = require('express');
const mongoose = require('mongoose');
const xml2js = require('xml2js'); 
const xmlDataModel = require('./models/xmlData');

require('dotenv').config();

const app = express();
app.use(express.json()); 

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/xml/upload', (req, res) => {
  const xmlData = req.body.xml; 

  const parser = new xml2js.Parser();

  parser.parseString(xmlData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erro na análise XML' });
    }

    const xmlObject = result;

    const newData = new xmlDataModel({
      campo1: xmlObject.dado1,
      campo2: xmlObject.dado2,
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
