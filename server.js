const express = require('express');
const mysql = require('mysql2');

let dbparams = {
    host: 'localhost',
    user: 'anuj',
    password: 'cdac',
    database: 'node_db',
	port:3306
};

const app = express();
app.use(express.static('statics'));

let con = mysql.createConnection(dbparams);

app.listen(5000, ()=>{
    console.log('Server is running on 5000...');
})

app.get('/bookdetails', (req, res)=>{
    console.log(req.query.bookid);
    let bookid = req.query.bookid;
    let output = {status: false, bookid: 0, bookname: "", price: 0};
    con.query('select * from book where bookid=?',[+bookid], (err, data)=>{
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            if (data[0] == undefined){
                console.log('undefined found');
            } else {
                console.log(data[0].bookid);
                console.log(data[0].bookname);
                console.log(data[0].price);

                output.status = true;
                output.bookid = data[0].bookid;
                output.bookname = data[0].bookname;
                output.price = data[0].price;
            }
        }
        res.send(output);
    })
})

app.get('/update', (req, res)=>{
    console.log(req.query.price);
    let price = req.query.price;
    let bookid = req.query.bookid;
    let output = {status: false};
    if (price){
        console.log('price is present');
        con.query('update book set price = ? where bookid = ?', [price, bookid],
        (err, data)=>{
            if (err) {
                console.log(err);
            } else {
                if (data.affectedRows == 1) {
                    output.status = true;
                }
            }
            res.send(output);
        })
    } else {
        console.log('price is absent');
        res.send(output);
    }
    
})

app.get('/',(req, res)=>{
    res.send('Root');
})