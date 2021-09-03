var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

// display books page
router.get('/', function(req, res, next) {

    dbConn.query('select * from books',function(err,rows)     {

        if(err) {
            req.flash('error', err);
            // render to views/books/index.ejs
            res.render('books',{data:''});
        } else {
            // render to views/books/index.ejs
            res.render('books',{data:rows});
        }
    });
});
//display pl page
router.get('/pl', function(req, res, next) {

    dbConn.query('select COALESCE (localization.title_translation, books.title)\n' +
        'AS title\n' +
        'from language join localization on language.language_id=localization.language_id\n' +
        'join books on books.book_id=localization.book_id where language = "pl"',function(err,rows)     {

        if(err) {
            req.flash('error', err);
            // render to views/books/index.ejs
            res.render('books',{data:''});
        } else {
            // render to views/books/index.ejs
            res.render('books',{data:rows});
        }
    });
});
//display ru page
router.get('/ru', function(req, res, next) {

    dbConn.query('select COALESCE (localization.title_translation, books.title)\n' +
        'AS title\n' +
        'from language join localization on language.language_id=localization.language_id\n' +
        'join books on books.book_id=localization.book_id where language = "ru"',function(err,rows)     {

        if(err) {
            req.flash('error', err);
            // render to views/books/index.ejs
            res.render('books',{data:''});
        } else {
            // render to views/books/index.ejs
            res.render('books',{data:rows});
        }
    });
});
//display by page
router.get('/by', function(req, res, next) {

    dbConn.query('select language.language COALESCE (localization.title_translation, books.title)\n' +
        'AS title\n' +
        'from language join localization on language.language_id=localization.language_id\n' +
        'join books on books.book_id=localization.book_id where language = "by"',function(err,rows)     {

        if(err) {
            req.flash('error', err);
            // render to views/books/index.ejs
            res.render('books',{data:''});
        } else {
            // render to views/books/index.ejs
            res.render('books',{data:rows});
        }
    });
});




module.exports = router;