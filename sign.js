const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const path = require("path");
const https = require("https");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/public"));



app.get("/", function(req,res){             //Gdy user wejdzie na główny route prześlij index.html
  res.sendFile(__dirname + "/index.html");
})


app.post("/", function(req,res){
  var name = req.body.fName;
  var nazwisko = req.body.sName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: name,
          LNAME: nazwisko
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);
  console.log(name, nazwisko, email);

  var url = "https://us10.api.mailchimp.com/3.0/lists/eaf6768dac"

  const options = {
    method: "POST",
    auth:"Milosz:4010dbfc57ee3eb7dbc4374333edf343-us10"
  }

  const request = https.request(url, options, function(response){
    response.on("data", function(){
      // console.log(JSON.parse(data));
    console.log(response.statusCode);

    if (response.statusCode === 200){
      res.sendFile(__dirname + "/success.html")
    }else{
      res.sendFile(__dirname + "/failure.html")
    }
    })

  })

  request.write(jsonData);
  request.end();

})


app.post("/failure.html", function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
})


//4010dbfc57ee3eb7dbc4374333edf343-us10
//audience id eaf6768dac
//
