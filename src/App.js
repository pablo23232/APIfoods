
const express = require('express');
const { send } = require('express/lib/response');
const app = express();
const validator = require('./utils/validator');
var valiTodos= require('./utils/validator');
var foods = [{id:1,nombre:"Pizza carbonara",ingredientes:["Champiñones","Queso","Bacon","Nata"],precio:9.90,urlImagen:"", categoria:"comida Italiana"}
,{id:2,nombre:"Dürum Feta Mixto",ingredientes:["Pollo","Ternera","Queso feta","Ensalada","Tomate","Salsa de yogurt"],precio:4.50,urlImagen:"",  categoria:"comida turca"},
{id:3,nombre:"Sopa de pollo",ingredientes:["Pollo","Garbanzos","Huevo duro","Fideos"],precio:3.30,urlImagen:"",categoria:"primer plato"},
{id:4,nombre:"Lentejas de la abuela",ingredientes:["Lentejas","Patata","Chorizo"],precio:4.30,urlImagen:"", categoria:"primer plato"}];
var orders = [];
valiTodos=foods;
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

isNotRepeated = (req,res,next) =>{
    if (foods.find(data => data.nombre== req.body.nombre)){
        return res.status(409).send("Conflicto");
    }
    return next();
};

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/foods/',(req, res) =>{
    res.send(foods);
})

app.post('/foods/', (req, res) => {
    console.log(req.body)
    let idParam = req.body.id;
    let newItem= req.body;
    console.log(newItem);
    if(!idParam){
            newItem.id=Math.max.apply(Math, foods.map(function(food) { return food.id; }))+1;
            if(foods[0]==undefined){
                newItem.id=1;
            }
    } 
    foods.push(newItem);
    res.status(201).json(newItem);
})

app.put('/foods/:id',validator.noId,isNotRepeated,(req, res) => {
    let task = foods.find(data => data.id== req.params.id);
    let index = foods.findIndex(data => data.id ==req.params.id);
    let newItem= req.body;
    foods.splice(index,1,req.body)
    res.status(200).json(newItem);
    res.send(task)
})

app.delete('/foods/:id', (req, res) => {
    let todoId = foods.find(data => data.id== req.params.id);
    let index = foods.findIndex(data => data.id ==req.params.id);
    if(todoId==undefined || index==undefined){
        res.status(404);
        res.send('No se ha podido borrar el dato con el id '+req.params.id).json
    } 
    else {
        foods.splice(index,1);
        res.send('Se ha borrado con exito el dato con el id '+req.params.id).json()
    }
})

app.get('/foods/:id',validator.noId, (req, res) => {
    let todoId = foods.find(data => data.id== req.params.id);
    if(todoId==null) res.status(404)
    res.send(todoId)
    
})

app.get('/foods/:task',(req,res)=>{
    let rep =false;
    foods.find(data => {if(data.task===req)rep=true});
    res=rep
    send(res);
})

app.get('/orders/',(req, res) =>{
    res.send(orders);
})

app.post('/orders/', (req, res) => {
    let idParam = req.body.id;
    let newItem= req.body;
    if(!idParam){
            newItem.id=Math.max.apply(Math, foods.map(function(todo) { return todo.id; }))+1;
            if(orders[0]==undefined){
                newItem.id=1;
            }
    } 
    foods.push(req.body);
    res.status(201).json(newItem);
})
app.delete('/orders/:id', (req, res) => {
    let todoId = foods.find(data => data.id== req.params.id);
    let index = foods.findIndex(data => data.id ==req.params.id);
    if(todoId==undefined || index==undefined){
        res.status(404);
        res.send('No se ha podido borrar el dato con el id '+req.params.id).json
    } 
    else {
        foods.splice(index,1);
        res.send('Se ha borrado con exito el dato con el id '+req.params.id).json()
    }
})
module.exports = app;
