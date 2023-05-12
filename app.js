const { response } = require('express')
const express = require('express')
const https = require('https')
const bodyParser = require("body-parser")
const app = express()
app.use(bodyParser.urlencoded({extended : true}))

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/",function(req,res){
    const query = req.body.CityName

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=9aae0902ba4b0ca7452c989db8c73740&units=metric"
    https.get(url,function(response){
        console.log(response.statusCode)

        response.on('data',function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            res.write("<h1>The temperature is " + temp + "</h1>")
            const line = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            res.write("<h1>The Weather description is " + line + "</h1>")
            const link =  "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"
            res.write("<img src ="+ link + ">")
            res.send()
        }) 
    })
    
})


app.listen(3001,function(){
    console.log("The Server is running on port 3000")
})



