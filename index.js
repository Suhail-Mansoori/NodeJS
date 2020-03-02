const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); 

var mysqlConnection = mysql.createConnection({
	host : "localhost",
	user: 'root',
	password: "",
	database:'employeedb'
});

mysqlConnection.connect((err) => {
	if (!err)
		console.log('DB is connected');
	else
		console.log('DB is failed'+ JSON.stringify(err, undefined, 2));
});

app.listen(3500, () => console.log('Express Server is running 3000'));

//Get All Employees
app.get('/employees', (req , res) => {
	mysqlConnection.query('SELECT * FROM employees', (err, rows, fields) => {
		if(!err)
		res.send(rows);
		else
		console.log(err);

	});
});

//Get an Employee
app.get('/employees/:id', (req , res) => {
	mysqlConnection.query('SELECT * FROM employees WHERE id = ?',[req.params.id], (err, rows, fields) => {
		if(!err)
		res.send(rows);
		else
		console.log(err);

	});
});

//Delete an Employee
app.delete('/employees/:id', (req , res) => {
	mysqlConnection.query('DELETE FROM employees WHERE id = ?',[req.params.id], (err, rows, fields) => {
		if(!err)
		res.send('Delete Succesfully');
		else
		console.log(err);

	});
});

//Insert an Employee
app.post('/employees', (req , res) => {
	var sql = "SET @id=?; SET @enrollment_no=?; SET @name=?; SET @role=?; SET @status=?; \ 
			CALL employeesAddOrEdit(@id,@enrollment_no,@name,@role,@status);";
	mysqlConnection.query('DELETE FROM employees WHERE id = ?',[req.params.id], (err, rows, fields) => {
		if(!err)
		res.send('Delete Succesfully');
		else
		console.log(err);

	});
});


