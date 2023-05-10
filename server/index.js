const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const lista_riscos = [{risco: 'fisico', categorias: ['bate o dedin', 'choque sei la']}, {risco: 'quimico', categorias: ['walter white', 'gases venenosos']}]

// DB conection
const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:123@localhost:5432/riscos-db')


app.get("/api", (req, res) => {
    res.json({message: 'server is running!'});
});

app.get("/api/riscos", (req, res) => {
    db.any(`SELECT * from public."Risco";`)
    .then((data) => {
      res.json({riscos: data})
    })
    .catch((error) => {
      console.log('ERROR:', error)
    })
})

app.get("/api/tipos_risco", (req, res) => {
    db.any(`SELECT * from public."TipoRisco";`)
    .then((data) => {
      res.json({tiporisco: data})
    })
    .catch((error) => {
      console.log('ERROR:', error)
    })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});