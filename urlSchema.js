import mongoose from "mongoose";
import shortid from "shortid";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const {ROOT_URL} = process.env


const urlSchema = mongoose.Schema({
    longUrl:{
        type: String,
        required:true
    },
    shortUrl:{
        type:String,
        required:true
    },
    clickCount:{
        type: Number,
        default: 0
    }
});



urlSchema.statics.findByLongUrl = async function(longUrl){
    
    let shorturl = await this.findOne({'longUrl':longUrl});
    
    

    if(shorturl != null) return (ROOT_URL + '/' + shorturl.shortUrl);
    
    shorturl = await this.create({'longUrl': longUrl,'shortUrl' : shortid.generate()});

    await shorturl.save()

    return (ROOT_URL + '/' + shorturl.shortUrl);
}

urlSchema.statics.findByShortUrl = async function(shortUrl){
    
    const longurl = await this.findOne({'shortUrl' : shortUrl});
    
    if(longurl != null) return (longurl.longUrl);

    return ROOT_URL;

}

const Url = mongoose.model('Url',urlSchema);

export default Url




