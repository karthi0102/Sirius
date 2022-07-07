const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp',{useNewUrlParser:true,useUnifiedTopology:true})
.then( () => {
    console.log("Connection open")
}).catch(err => {
    console.log("OOPS !! ERROR")
})
mongoose.set('useFindAndModify',false)

const movieSchema = new mongoose.Schema({
    title:String,
    year:Number,
    score:Number,
    rating:Number
})

const Movie = mongoose.model('Movie',movieSchema);
// const bigil = new Movie({title:"Bigil" , year:2020 , score:80,rating:4});

// Movie.insertMany([
//     {title:"mersal",year:2019,score:89,rating:4.5},
//     {title:"kgf",year:2020,score:99,rating:4.7},
//     {title:"oh manapenne",year:2021,score:81,rating:4.8},
//     {title:"puli",year:2018,score:80,rating:4.0},
// ])
// .then( (data) =>{
//     console.log("IT WORKED")
//     console.log(data)
// })