// using express+nodejs - very simple application just to understand docker.

const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000

app.get('/', (req , res) => {
    return res.json({message : "Hey, I'm Node Js + Express in container for docker test purpose."})
});

app.listen(PORT , () => console.log(`Server Running on port : ${PORT}`));
