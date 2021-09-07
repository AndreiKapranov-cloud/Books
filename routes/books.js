var express = require('express');
var router = express.Router();
var dbConn = require('../lib/db');
let language_parameter = '{language_id}';
var queryFunction = 'SELECT COALESCE(localization.title_translation, books.title) as title ' +
    'FROM books ' +
    'join language ' +
    'LEFT JOIN localization ON localization.book_id = books.book_id ' +
    'and localization.language_id = language.language_id ' +
    "WHERE language.language_id = " + language_parameter + " OR language.language_id IS NULL " +
    "order by books.book_id";

function processResult(req, res, err, rows) {
    if (err) {
        req.flash('error', err);
        // render to views/books/index.ejs
        res.render('books', {data: ''});
    } else {
        // render to views/books/index.ejs
        res.render('books', {data: rows});
    }
}

// display books page
router.get('/', function (req, res) {

    dbConn.query('select * from books', function (err, rows) {

        processResult(req, res, err, rows);
    });
});
//display pl page
router.get('/pl', function (req, res) {

    dbConn.query(queryFunction.replace(language_parameter, '1'), function (err, rows) {

        processResult(req, res, err, rows);
    });
});
//display by page
router.get('/ru', function (req, res) {

    dbConn.query(queryFunction.replace(language_parameter, '2'), function (err, rows) {
        processResult(req, res, err, rows);
    });
});
//display ru page
router.get('/by', function (req, res) {

    dbConn.query(queryFunction.replace(language_parameter, '3'), function (err, rows) {
        processResult(req, res, err, rows);
    });
});


module.exports = router;