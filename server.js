const express = require('express');

const friendsRouter = require('./routes/friends.router');

const app = express();

const PORT = 3000;



//middleware - handles all requests
app.use((req,res,next) => {
    const start = Date.now(); //current time in ms i.e. start time
    next();
    const delta = Date.now() - start; //how much time it took to complete the request
    console.log(`${req.method} ${req.url} ${delta}ms`);

});

app.use(express.json()); //automatically parses the req.body to json

app.use('/friends', friendsRouter);
app.use('/messages', messagesRouter);


app.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
});