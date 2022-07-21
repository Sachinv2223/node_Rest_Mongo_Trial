const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const empRouter = require('./routes/emp_routes');
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use('/emp',empRouter);

//normaly we dont we openly put username and password. For that we use "Dotenv" package
mongoose.connect('mongodb+srv://<username>:<password>@zeleozcluster.1aqpg.mongodb.net/employee_db?retryWrites=true&w=majority')
.then((res) => {
    console.log('Database connected successfully...')
}).catch((err) => {
    console.log('An error has been occured while connecting Database '+ err)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })