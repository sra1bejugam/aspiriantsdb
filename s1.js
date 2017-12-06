let express = require('express');
let app = express();
let http = require('http');
const fs = require('fs');
let prompt = require('prompt');
let bodyParser = require('body-parser');
//let mongo=require('mongodb');
let MongoClient = require('mongodb').MongoClient;
let urlencodedparser=app.use(bodyParser.urlencoded({extended:false}));
let jsonParser = bodyParser.json();

app.get('/', function(req, resp){
  resp.sendFile('./index.html',{root: './'});
});
let url = 'mongodb://localhost/test';
app.post('/',function(req, resp) {
    let teamSize = req.body.TeamSize;
    let Filename = req.body.FileName;
    fs.readFile(Filename,"utf8",function(err,contents){
    if (err) { return console.log(err);}
    let jsonContent = JSON.parse(contents);
    MongoClient.connect(url, function(err, db) {
        if(err){resp.send("Error: I am not able to connect to database.")}
        db.collection("aspiriants").insertMany(jsonContent, function(err, res) {
            if(err){resp.send("Error: I am not able to insert json contents into the database.")}});
           db.close();
    });
    info = jsonContent.length;
    form = teamSize;
    app.get('/db', function(req, resp){
    if ( form == parseInt(form,10) && form > 0 && form < info){
         MongoClient.connect(url, function(err, db) {
           if(err){resp.send("Error: I am not able to connect to database.")}
              db.collection("aspiriants").find({}).toArray(function(err,res){
        if (err) {resp.send("Error:I am not able to retreive aspiriants data from the database.");}
let value = 1;               
let maximum = info/form;        
let minimum = 1;                  
let ctemp = 1;
let resArray=[];
let z = info % form;
var aspList = res;
let i;
    if(z == 0){
            resArray.push(value);
        while ( value <= form ){
            resArray.push("<br />"+"Team"+value+"<br />");
                while ( minimum <= maximum ){
                let i = Math.floor(Math.random() * aspList.length);
                resArray.push(aspList[i]);
                resArray.push("<br />");
                aspList.splice(i, 1);                        
                minimum = minimum + 1;
                if ( minimum > maximum ){
                    minimum=1;
                    break;
                }
            }
            value = value + 1;
            if ( value > form ){
                value=1;
                break;
            }
        }
        let finalTeam = JSON.stringify(resArray);
        finalTeam = finalTeam.replace(/["'(){}]/g," ");
        resp.send(finalTeam);
    }                                                       
    else{
            while ( value <= form ){
               resArray.push("<br />"+"Team"+value+"<br />");
                while ( minimum <= maximum ){
                    let i = Math.floor(Math.random() * aspList.length);
                    let f = aspList[i];
                    resArray.push(f);
                    resArray.push("<br />");      
                    aspList.splice(i, 1);
                    minimum = minimum + 1;
                    if (minimum > maximum ){
                        minimum=1;
                        break;
                        }
                }
                value = value + 1;
                if ( value> form ){
                    value=1;
                    break;
                }
            }
                while (value <= form ){
                let ctemp = 1;                
                while ( ctemp <= z ){
                    resArray.push('Team'+value);
                    let i = Math.floor(Math.random() * aspList.length);
                    resArray.push(aspList[i]);
                    resArray.push("<br />");
                    aspList.splice(i, 1);
                     ctemp = ctemp+1;
                    value = value+1;
                    if ( ( ctemp > z ) || ( value > form ) ){
                        break;
                    }
                }
                if ((ctemp>z)||(value>form)){
                    let ctemp=1;
                    break;
                }
            }
            let finalTeam = JSON.stringify(resArray);
            finalTeam = finalTeam.replace(/["'(){}]/g," ");
            resp.send(finalTeam);
}
db.close();
});
});
}
else{resp.send("Please enter integers between one and "+info);}
});
    let Towrite = fs.createWriteStream("time.txt",{'flags':'a'});
    Towrite.write('I visited at '+ new Date()+'\n');
    Towrite.end();
});
});
app.listen(4040,function(){console.log('open local host- 4040');});