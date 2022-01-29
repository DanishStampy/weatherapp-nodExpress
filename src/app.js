const express = require('express');
const hbs = require("hbs");
const path = require("path");
const app = express();

const weatherData = require('../utils/weatherData');

const port = process.env.PORT || 3000


const publicStaticDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set view path (which is on views folder). We can easily render the view file just by put the hbs file name.
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicStaticDirPath));


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App'
  })
})

app.get('/weather', (req, res) => {
  const address = req.query.address

  // Check if address is empty
  if(!address){
    return res.send({
      error: "You must enter any city name in search text box!"
    })
  }

  // Get weather data based on address(cityName) and output the result
  weatherData(address, (error, {temperature, description, cityName} = {}) => {
    if(error){
      return res.send({
        error
      })
    }
    //console.log(temperature, description, cityName)
    res.send({
      temperature,
      description,
      cityName
    })

  })
})

// error url
app.get("*", (req, res) => {
  res.render('404', {
    title: 'Page not found'
  })
})

// get port
app.listen(port, () => {
  console.log("server is running on :", port);
})