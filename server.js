const express = require('express');
const path = require('path');

const friendsRouter = require('./routes/friends.router');
const messagesRouter = require('./routes/messages.router');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const PORT = 3000;


//middleware - handles all requests
app.use((req,res,next) => {
    const start = Date.now(); //current time in ms i.e. start time
    next();
    const delta = Date.now() - start; //how much time it took to complete the request
    console.log(`${req.method} ${req.url} ${delta}ms`);

});

app.use('/site', express.static(path.join(__dirname,'public'))); //serves the frontend
app.use(express.json()); //automatically parses the req.body to json

app.get('/', (req, res) => {
    res.render('index', {
        title: 'My friends are VERYY Clever',
        caption: 'Let\'s go skiing',
    });
} );
app.use('/friends', friendsRouter);
app.use('/messages', messagesRouter);


app.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
});

