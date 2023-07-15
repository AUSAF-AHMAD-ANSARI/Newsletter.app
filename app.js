const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();


app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"))
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");

})
app.post("/", function(req, res) {

    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;

    //console.log(firstname, lastname, email);
    var data = {
        members: [{

            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstname,
                LNAME: lastname,
            }
        }]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us11.api.mailchimp.com/3.0/lists/7da439389c";
    const options = {
        method: "POST",
        auth: "ausaf:0049e0d176c9cb3ace8d18ad44efbda3-us11"
    }
    const request = https.request(url, options, function(response) {

        if (response.statusCode == 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    });
    request.write(jsonData);
    request.end();

});
app.post("/failure", function(req, res) {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function() {
    console.log("The server is working");
})




//api key ->    
//list id ->