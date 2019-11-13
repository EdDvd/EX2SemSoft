var express = require('express');
var router = express.Router();

function initExaApi(db){

var mangasModel = require('./exa.model')(db);

//var fileModel = require('../filemodel');
//var mangaCollection = fileModel.getProducts();

router.get('/', function (req, res) {
  res.json({
    "entity": "manga",
    "version": "0.0.1"
  });
});


router.get('/all', function(req, res){

  mangasModel.getAllMangas((err, mangas)=>{
    if(err){
      res.status(404).json([]);
    } else {
      res.status(200).json(mangas);
    }
  });
});

router.post('/new', function(req, res){
//  if (req.user.roles.findIndex((o)=>{return o=="administrador"}) == -1) {
    // return res.status(401).json({"error":"Sin privilegio"});
  // }
   var newManga = Object.assign(
      {},
      req.body,
      { "Nombre":req.body.Nombre,
        "Autor":req.body.Autor,
        "PaisOrigen": req.body.Pais,
        "NumeroTomos":parseInt(req.body.Tomos),
        "Estado":req.body.Estado }
    );
   mangasModel.saveNewManga(newManga, (err, rslt)=>{
     if(err){
       res.status(500).json(err);
     }else{
       res.status(200).json(rslt);
     }
   });
});

router.put('/update/:mngid',
  function(req, res){
    var mangaIdToModify = req.params.mngid;
    var nombreToModify = req.body.nombre;
    var autorToModify = req.body.autor;
    var paisToModify = req.body.pais;
    var tomosToModify = parseInt(req.body.tomos);
    var estadoToModify = req.body.estado;

    mangasModel.updateManga(
      {Nombre:nombreToModify,
      Autor:autorToModify,
      PaisOrigen:paisToModify,
      NumeroTomos:tomosToModify,
      Estado:estadoToModify,
      (err, rsult)=>{
        if(err){
          res.status(500).json({"error":"Lo sentimos mucho, ha ocurrido un error."});
        }else{
          res.status(200).json(rsult);
        }
      }
      ); //updateProduct
  }
);
return router;
}

module.exports = initExaApi;
