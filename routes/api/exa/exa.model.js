var ObjectId = require('mongodb').ObjectId;

var IndexVerified = false;

function mangasModelInit(db){
  let mangasModel = {};
  var mangasCollection = db.collection("Manga");

  if ( !IndexVerified) {
    mangasCollection.indexExists("sku_1", (err, rslt)=>{
      if(!rslt){
        mangasCollection.createIndex(
          { "sku": 1 },
          { unique: true, name:"sku_1"},
          (err, rslt)=>{
            console.log(err);
            console.log(rslt);
        });//createIndex
      }
    }); // indexExists
  }

  mangasModel.getAllMangas = (handler)=>{
    mangasCollection.find({}).toArray(
      (err, docs)=>{
        if(err){
          console.log(err);
          return handler(err, null);
        }
        return handler(null, docs);
      }
    );
  }

  mangasModel.saveNewManga = ( newManga, handler)=>{
    productsCollection.insertOne(newManga, (err, result)=>{
      if(err){
        console.log(err);
        return handler(err, null);
      }
      return handler(null, result);
    });
  }

  mangasModel.updateManga = (updateFields, mangatId, handler)=>{
      let mangaFilter = {"_id": new ObjectId(productId)};
      let updateObject = {
        "$set": {
                  "dateModified":new Date().getTime()
              },

  };
  mangasCollection.updateOne(
      mangaFilter,
      updateObject,
      (err, rslt)=>{
        if(err){
          console.log(err);
          return handler(err, null);
        }
        return handler(null, rslt);
      }
    );
  };
  return mangasModel
}

module.exports = mangasModelInit;
