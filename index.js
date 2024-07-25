// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const app = express();

const PORT = 8080;

// GET - / - returns homepage
app.get('/', (req, res) => {
    res.send(pets);
    // serve up the public folder as static index.html file

});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// get all pets from the database
app.get('/api/v1/pets', (req, res) => {
    // send the pets array as a response
    res.send(pets)
});

// app.get('/api/v1/pets/:owner', (req, res) => {
//     // get the owner from the request
//     const owner = req.params.owner;
//     // find the pet in the pets array
//     const pet = pets.filter((pet) => pet.owner === owner);
//     // send the pet as a response
//     if (pet){
//         res.send(pet);
//     }else{
//         res.send("Pet Not Found")
    
//     }
// });

app.get('/api/v1/pets/owner', (req, res) => {
    // get the owner from the request query
    const owner = req.query.owner;
    console.log('Owner:', owner); // Add this line for debugging

    // find the pets owned by the specified owner
    const pet = pets.filter(pet => pet.owner === owner);

    // send the pets as a response
    if (pet.length > 0) {
        res.send(pet);
    } else {
        res.send("Pets Not Found");
    }
});
// http://localhost:8080/api/v1/pets/owner?owner=Jane

// get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    // get the name from the request
    const name = req.params.name;

    // find the pet in the pets array
    const pet = pets.find((pet) => pet.name === name);
    // const pet = pets.find(pet => pet.name === name);

    // send the pet as a response
    res.send(pet);

});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;