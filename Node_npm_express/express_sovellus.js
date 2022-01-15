// https://www.npmjs.com/package/express
const express = require('express');
const { getPostcodes } = require('./api');

const app = express();
const PORT = process.env.PORT || 3000;

// postinumeron avulla postitoimipaikan nimi http://localhost:3000/postitoimipaikka?numero=99999
function getKeyAndValue(obj, key) {
    if (Object.keys(obj).filter(k => k === key).length > 0) {
        return { postinumero: key, toimipaikka: obj[key] };
    } else {
        return null;
    }
}

app.get('/postitoimipaikka', async function (req, res) {
    let postinumerot = await getPostcodes();
    let numero = req.query.numero;

    res.json(getKeyAndValue(postinumerot, numero));
});

// postitoimipaikan nimellä kaikki postinumerot http://localhost:3000/postitoimipaikka/porvoo/
function getKeyValue(obj, key) {
    let result = Object.keys(obj)
        .filter(k => obj[k] === key)
        .map(key => key)
    if (Object.keys(obj).filter(k => obj[k] === key).length > 0) {
        return { toimipaikka: key, postinumerot: result };
    } else {
        return "Postitoimipaikkaa ei löytynyt.";
    }
}

app.get('/postitoimipaikka/:kaupunki', async function (req, res) {
    let kaupungit = await getPostcodes();
    let kaupunki = req.params.kaupunki;
    var ignoreLetterSize = kaupunki.toUpperCase();

    res.json(getKeyValue(kaupungit, ignoreLetterSize));
});

app.listen(PORT, () => console.log(`Palvelin käynnissä portissa ${PORT}`));