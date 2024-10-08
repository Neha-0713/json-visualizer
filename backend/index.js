// importing expess
const express = require('express');
const UserRouter = require('./routers/UserRouter');
const RealstateRouter = require('./routers/RealStateRouter');
const cors = require('cors');

// initialize express
const app = express();

const port = 5000;

// middleware
app.use(cors({
    origin : 'http://localhost:3000'
}));

app.use(express.json());
app.use('/user', UserRouter);
app.use('/realstate', RealstateRouter);

// endpoint or route
app.get('/', (req, res) => {
    res.send('response from express');
});

app.get('/add', (req, res) => {
    res.send('response from add');
});

// getall
// update

// starting the express server
app.listen(port, () => {
    console.log('server started');
});