const express = require('express');
const mysql = require('mysql');

const app = express();

app.listen(9000, () => {
    console.log("Server started");
})

//Creating connection to Database
const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mysql_js'
})

dbConnection.connect((err) => {
    if(err){
        console.log("Error " + err);
    }else{
        console.log("Mysql connected success");
    }
});


//Create database
app.get('/dbCreate', (req, res) => {
    let sql = 'CREATE DATABASE mysql_js';
    dbConnection.query(sql, (err, result) => {
        if(err){
            console.log("Error" + err);
        }else{
            res.send("Database created");
        }
    });
});

//Create table
app.get('/createStudentTable', (req, res) => {
    let sql = 'CREATE TABLE student(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50), address VARCHAR(50))';
    dbConnection.query(sql, (err, result) => {
        if(err){
            console.log("Error" + err);
        }else{
            console.log(result);
            res.send("Table created");
        }
    });
});

//Insert data
app.get('/insertStudent', (req, res) => {
    let student = {name: 'marry', address:'seatle'};
    let sql = 'INSERT INTO student SET ?';
    dbConnection.query(sql, student, (err, result) => {
        if(err){
            console.log("Error" + err);
        }else{
            console.log(result);
            res.send("Data inserted");
        }
    });
});

//Display data
app.get('/displayStudent', (req, res) => {
    let sql = "SELECT * FROM student";
    dbConnection.query(sql, (err, result) => {
        if(err){
            console.log("Error " + err);
        }else{
            console.log(result);
            res.send("Student data fetched");
        }
    });
});

//Get One student
app.get('/getOneStudent/:id', (req, res) => {
    let sql = `SELECT * FROM student WHERE id = ${req.params.id}`;
    dbConnection.query(sql, (err, result) => {
        if(err){
            console.log("Error " + err);
        }else{
            console.log(result);
            res.send(`student of ${req.params.id} fetched`);
        }
    });
});

//Update student
app.get('/updateStudent/:id', (req, res) => {
    let address = 'new mexico'
    let sql = `UPDATE student SET address = '${address}' where id = ${req.params.id}`;
    dbConnection.query(sql, (err, result) => {
        if(err){
            console.log("Error " + err);
        }else{
            console.log(result);
            res.send(`student of ${req.params.id} updated`);
        }
    });
});

//Delete student
app.get('/deleteStudent/:id', (req, res) => {
    let sql = `DELETE FROM student WHERE id = ${req.params.id}`;
    dbConnection.query(sql, (err, result) => {
        if(err){
            console.log("Error " + err);
        }else{
            console.log(result);
            res.send(`student of ${req.params.id} deleted`);
        }
    });
});