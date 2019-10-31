const express = require('express')
var bodyParser = require("body-parser");
var path = '/Users/gaganhegde/Desktop/trioli/newfile.py'
const app = express()
var fs = require("fs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    const{spawn} = require('child_process');
    const pyProg = spawn('python',['newfile.py']);
    console.log(req.params);
  
        pyProg.stdout.on('data', function(data){
            console.log(data.toString());
            res.write(data);
            res.end();
        })
    })

app.post('/',(req,res)=>{
    var portion = req.body.code;
    fs.writeFile('newfile.py', portion, function (err) {
        if (err) 
            return console.log(err);
        console.log('File Written');
    });
    res.send("done");

})


app.listen(3003,()=> console.log("active on Port 3003!"));