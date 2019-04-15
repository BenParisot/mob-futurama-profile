const express = require('express');
const app = express();
const profilesRoutes = require('./routes/profiles');

app.use(express.json());
app.use('/profiles', profilesRoutes);
module.exports = app;
