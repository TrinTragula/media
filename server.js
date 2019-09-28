const express = require('express');
const path = require('path');
const app = express();
const db = require("./db.js");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'build')));

const getAllQuery = `SELECT * FROM esami`;
const insertQuery = `INSERT INTO esami (nome, crediti, voto) VALUES (?, ?, ?)`;
const deleteQuery = `DELETE FROM esami WHERE id=?`;

app.get('/ping', (_, res) => {
    return res.send('pong');
});

app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/esami', (_, res) => {
    return db.all(getAllQuery, [], (err, rows) => {
        if (err) {
            return res.status(500).send('Non sono riuscito a leggere i dati necessari');
        }
        return res.send(rows.reverse());
    });
});

app.post('/esami', (req, res) => {
    const nome = req.body.nome;
    const crediti = parseInt(req.body.crediti);
    const voto = parseInt(req.body.voto);

    if (!nome || !crediti || !voto) {
        return res.status(400).send('Tutti i parametri sono necessari');
    }

    return db.run(insertQuery, [nome, crediti, voto], function (err) {
        if (err) {
            return res.status(400).send('Impossibile inserire l\'esame');
        }
        // get the last insert id
        res.send({
            lastID: this.lastID
        });
    });
});

app.delete('/esami', (req, res) => {
    const id = req.body.id;
    if (!id) {
        return res.status(400).send('Fornire l\'id dell\'esame da eliminare');
    }

    return db.run(deleteQuery, id, function (err) {
        if (err) {
            return res.status(400).send('Impossibile rimuovere l\'esame');
        }
        // get the last insert id
        res.send({
            cahnges: this.changes
        });
    });
});

app.listen(process.env.PORT || 8080);