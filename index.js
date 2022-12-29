import express from 'express';
import bodyParser from 'body-parser';
import Url from './urlSchema.js'
import mongoose from 'mongoose';
import cores from 'cors';
import path from "path";
import * as dotenv from 'dotenv'

dotenv.config();

const {MONGODB_URL} = process.env


mongoose.set('strictQuery', true);

const app = express();

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


//parse application/json
app.use(bodyParser.json());

app.use(cores());

app.use(express.static("./public"));


mongoose.connect(
  MONGODB_URL,() => {
      console.log("connected");

      app.listen(5000,() => {
        console.log('app running at port 5000');
      })

  }
  
)


app.get('/',(req,res) => {
    res.sendFile(path.join("./public/index.html"),{root:'./'});
})


app.get('/:shorturlhash',async(req,res) => {
  
  const shortUrlHash = req.params.shorturlhash

  const longUrl = await Url.findByShortUrl(shortUrlHash)

  console.log(longUrl);
  
  res.redirect(longUrl);

});


app.post('/getshorturl/',async(req,res) => {
    
  const longurl = req.body.longurl;

  console.log(req.body.longurl);

  const shorturl = await Url.findByLongUrl(longurl);

  const response = {
     shorturl : shorturl
  }

  res.json(response);

 
})
