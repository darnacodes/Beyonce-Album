const { response } = require('express');
const express = require('express');
const app = express();
let albums= require("./albums.json") 

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello Express')
});

app.get('/albums',function (request, response) {
    response.send(albums)
});

app.get('/albums/:id',function (request, response) {
    const id=request.params.id
    console.log(id)

   const album= albums.find(album=> album.albumId== id)
   console.log(album)

    response.send(album)
});

app.post("/albums", function (request, response){
    const album= request.body
    console.log(album)
albums.push(album)
    response.status(201).send({success:true})
})

app.delete("/albums/:id", function (request, response){
    const id= request.params.id
    const albumFiltered= albums.filter(function (album){
        return album.albumId != id})
    albums=albumFiltered
    response.send({success:true})
})

//update album method PUT
app.put("/album/:id", function (request, response){
const id= request.params.id

//when using map store the returned value 
albums=albums.map(function (album){
    if (album.albumId== id){
        return {
            albumId: "11",
            artistName: request.body.artistName,
            collectionName: request.body.collectionName,
            artworkUrl100:request.body.artworkUrl100,
            
            releaseDate: request.body.releaseDate,
            primaryGenreName: request.body.primaryGenreName,
            url:request.body.url  
        }
    }else{
        return album
    }
})


    response.send({success: true})
})


app.listen(3000, () => console.log("Server is up and running"))
