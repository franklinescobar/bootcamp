const express = require('express');
const app = express();
const cors = require('cors')({origin: true});

const { server } = require('./src/config/config');

const guard = require('./src/guard/guard');

const userRoutes = require('./src/routes/user');
const accountRoutes = require('./src/routes/account');
const accountTypeRoutes = require('./src/routes/account-type');
const currencyRoutes = require('./src/routes/currency');
const exchangeRoutes = require('./src/routes/exchange');
const categoryRoutes = require('./src/routes/category');
const transactionRoutes = require('./src/routes/transaction');
const badRequestRoute = require('./src/routes/bad-request');


app.use(cors);

app.use(guard);

app.use(express.json());

app.use(userRoutes);
app.use(accountRoutes);
app.use(accountTypeRoutes);
app.use(currencyRoutes);
app.use(exchangeRoutes);


app.use(categoryRoutes);
app.use(transactionRoutes);
app.use(badRequestRoute);


app.listen(server.port, () => {
  console.log(`Server running on port: ${server.port}`);
});