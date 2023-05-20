const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
const post = require("./models/post")

app.engine("handlebars", handlebars({defaultLatyout: "main"}))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({extends: false}))
app.use(bodyParser.json())

app.get("/", function(req,res){
    res.render("Home")
})

app.get("/pagcadastro", function(req,res){
    res.render("pagcadastrar")
})

app.post("/cadastrar", function(req,res){
    post.create({
        produto: req.body.produto,
        marca: req.body.marca,
        modelo: req.body.modelo
    }).then(function(){
        res.render("Home")
    }).catch(function(erro){
        res.send("Falha ao cadastrar os dados: " +erro)
    })
})

app.get("/consulta", function(req, res){
    post.findAll().then(function(post){
        res.render("consulta", {post})
    }).catch(function(erro){
        console.log("Erro ao carregar dados do banco: " + erro)
    })
})

app.get("/editar/:id", function(req, res){
    post.findAll({where: {'id': req.params.id}}).then(function(post){
        res.render("editar", {post})
    }).catch(function(erro){
        console.log("Erro ao carregar dados do banco: " + erro)
    })
})

app.get("/excluir/:id", function(req, res){
    post.destroy({where: {'id': req.params.id}}).then(function(){
        res.render("Home")
    }).catch(function(erro){
        console.log("Erro ao excluir ou encontrar os dados do banco: " + erro)
    })
})

app.post("/atualizar", function(req, res){
    post.update({
        produto: req.body.produto,
        marca: req.body.marca,
        modelo: req.body.modelo,
        descricao: req.body.descricao,
        palavraschaves: req.body.palavraschaves
    },{
        where: {
            id: req.body.id
        }
    }).then(function(){
        res.redirect("/consulta")
    })
})


app.listen(8081, function(){
    console.log("Servidor Ativo")
})