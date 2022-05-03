const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const fileUpload = require('express-fileupload')
const exphbs = require('express-handlebars');

const app = express()
const port = process.env.PORT || 5000


app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const pool = mysql.createPool({
    connectionLimit : 50,
    host: "127.0.0.1",
    user: "root",
    port:8889,
    database: "TheaterSystem",
    password: "root"
})

app.get('/', (req, res) => {
    res.send("Hello api")
})

app.get('/roles', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        connection.query('SELECT * from roles', (err, rows) => {
            connection.release() 
            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})

app.post('/roles', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        const params = req.body.params
        let sql = 'INSERT INTO `roles` (`id`, `title`, `position`, `gender`, `rank`) VALUES (?, ?, ?, ?, ?)';
        let data = [null, params.title,params.position,params.gender,params.rank ];
        connection.query(sql,data, (err, rows) => {
            connection.release() 
            if(!err) {
                res.send(`${params.title} has been added.`)
            } else {
                console.log(err)
            }
        })
    })
})

app.delete('/roles/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        console.log(req.params.id);
        connection.query('DELETE from roles WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() 
            if(!err) {
                res.send(`Record ID: ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }
        })
    })
})

app.get('/actors', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        connection.query('SELECT * from actors', (err, rows) => {
            connection.release() 
            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})

app.post('/actors', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        const params = req.body.params
        let sql = 'INSERT INTO `actors` (`id`, `fullname`, `position`,`rank`, `age` ,`gender` ) VALUES (?, ?, ?, ?, ?, ?)';
        let data = [null, params.fullname,params.position,params.rank,params.age, params.gender ];
        connection.query(sql,data, (err, rows) => {
            connection.release() 
            if(!err) {
                res.send(`${params.title} has been added.`)
            } else {
                console.log(err)
            }
        })
    })
})

app.delete('/actors/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        console.log(req.params.id);
        connection.query('DELETE from actors WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() 
            if(!err) {
                res.send(`Record ID: ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }
        })
    })
})

app.get('/staging', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        connection.query('SELECT * from stagings', (err, rows) => {
            connection.release() 
            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})

app.post('/staging', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        const params = req.body.params
        let sql = 'INSERT INTO `stagings` (`id`, `composition_number`, `actor_id`,`role_id`, `type_of_role` ,`data_of_appoinment`, `date_of_removal_from_role`, `producer` ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        let data = [null, params.composition_number,params.actor_id,params.role_id,params.type_of_role, params.data_of_appoinment, params.date_of_removal_from_role, params.producer ];
        connection.query(sql,data, (err, rows) => {
            connection.release() 
            if(!err) {
                res.send(`${params.composition_number} has been added.`)
            } else {
                console.log(err)
            }
        })
    })
})

app.delete('/staging/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        console.log(req.params.id);
        connection.query('DELETE from stagings WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() 
            if(!err) {
                res.send(`Record ID: ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }
        })
    })
})

app.listen(port, () => console.log(`Listen on port ${port}`))