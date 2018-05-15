const express = require('express');
const app = express();

// Add headers
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Content-Type', 'application/json');

    next();
});

app.get('/', (req, res) => res.send('Hello!!!'));

app.get('/tasks', (req, res) => res.send([
	{
		id: '1',
		name: 'task 1 server',
		categoryId: '1',
	},
	{
		id: 2,
		name: 'task 2 server',
		categoryId: 2,
	}
]));

app.listen(3001, () => console.log('app is listening on port 3001'))
