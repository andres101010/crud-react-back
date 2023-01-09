const { json } = require('express');
const express = require('express');
const mysql = require('mysql');

const DB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'user'
});


const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });
  app.use(json());

app.get('/',(req,res)=>{
    res.send("Welcome a to server of user")
});
app.get('/user',(req,res)=>{
   const sql = 'SELECT * from user'
   DB.query(sql,(err,result)=>{
    if(err) throw err;
    if (result.length > 0) {
        res.json(result)
    } else {
        res.send('No hay datos')
    }
   })
});
app.get('/user/:id',(req,res)=>{
    const {id} = req.params
   const sql = ` SELECT * from user WHERE iduser = ${id}`
   DB.query(sql,(err,result)=>{
    if(err) throw err;
    if (result.length > 0) {
        res.json(result)
    } else {
        res.send('No hay datos')
    }
   })
});
app.post('/newUser',(req,res)=>{
   const sql = 'INSERT INTO user SET ?'
   const objUser = {
    iduser: req.body.iduser,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    fechaDeNacimiento: req.body.fechaDeNacimiento
   }
   DB.query(sql,objUser,err =>{
    if(err) throw err
    res.send('Usuario añadido con exito!')
   })
});
app.put('/updateUser/:id',(req,res)=>{
   const id = req.params.id
   const {nombre,apellido,fechaDeNacimiento} = req.body
   const sql = `UPDATE user SET nombre = '${nombre}', apellido = '${apellido}', fechaDeNacimiento = '${fechaDeNacimiento}' WHERE iduser = ${id} `
   DB.query(sql,err =>{
    if(err) throw err
   })
   res.send('Usuario actualizado con exito!')
});
app.delete('/deleteUser/:id',(req,res)=>{
   const id = req.params.id
   const sql = `DELETE FROM user WHERE iduser = ${id}`
   DB.query(sql,err =>{
    if(err) throw err
   })
   res.send('Usuario eliminado con exito!')
});


app.listen(3002, ()=>{
    console.log('Servidor corriendo en puerto 3002')
});