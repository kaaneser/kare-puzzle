const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const ejs = require('ejs');
const port = process.env.PORT || 5000;
const route = require('./src/routes/router');
const methodOverride = require('method-override');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static('src/public'));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload())
app.use(
    methodOverride('_method', {
        methods: ['POST', 'GET'],
    })
)
app.use('/', route);

app.listen(port, () => console.log('App running in port: ', port));

module.exports = app;