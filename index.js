const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res)=>{
    res.send('Ruta de Inicio de Nuestro Proyecto')
})

app.listen(PORT, ()=>{
    console.log(`Server on http://localhost:${PORT}`)
})
