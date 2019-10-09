// jshint esversion: 6
// audience id: 2276380fc8
// API key: 4097b084659c82f694109456ab592a43-us20

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
   res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
   var userFirstName = req.body.firstName;
   var userLastName = req.body.lastName;
   var userEmail = req.body.email;

   var data = {
      members: [
         {
            email_address: userEmail,
            status: "subscribed",
            merge_fields: {
               FNAME: userFirstName,
               LNAME: userLastName
            }
         }
      ]
   };

   var jsonData = JSON.stringify(data);

   var options = {
      url: "https://us20.api.mailchimp.com/3.0/lists/2276380fc8",
      method: "POST",
      headers: {
         "Authorization": "angela1 4097b084659c82f694109456ab592a43-us20"
      },
      body: jsonData
   };

   request(options, (error, response, body) => {
      if (error) {
         res.sendFile(__dirname + "/failure.html");
      }
      else {
         if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
         }
         else {
            res.sendFile(__dirname + "/failure.html");
         }
      }
   });
});

app.post("/failure", function (req, res) {
   res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
   console.log("Server is running on port 3000.");
});