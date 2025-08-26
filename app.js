const express = require('express');
const app = express();
const cors = require('cors');
const model = require('./models/urlModel');
const { nanoid } = require('nanoid');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.post("/urls", async (req, res) => {
      const { longurl } = req.body;
      const shorturl = nanoid(6);
      if (!longurl) {
            return res.status(401).json({
                  message: "longurl required"
            })
      }
      try {
            const data = new model({ longurl, shorturl: shorturl })
            await data.save();
            return res.status(201).json({
                  message: "url is saved ",
                  shorturl: shorturl,
                  _id:data._id
            })
      }
      catch (e) {
            return res.status(500).json({
                  message: "Internal server Error"
            })
      }
})

app.get("/s/:shorturl", async (req, res) => {
      const { shorturl } = req.params;
      const url = await model.findOne({ shorturl });
      try {
            if (!url) {
                  return res.status(401).json({
                        message: "shorturl not found"
                  })
            }
            res.redirect(url.longurl);
      }
      catch (e) {
            return res.status(500).json({
                  message: "Internal Server Error"
            })
      }
})

app.delete("/delete/:id" ,async (req,res)=>{
      const{id}=req.params;
      if(!id){
            return res.status(400).json({
                  message:"Url required"
            })
      }
      try{
        const deletedData=await model.findByIdAndDelete(id);
         if(!deletedData){
             return res.status(404).json({
                   message:"url not found"
             })
         }
      return res.status(201).json({
              message:"url data has been deleted"
        }
      )
      }
      catch(e){
        return res.status(500).json({
             message:"Internal Server"
        })
      }
})

app.listen(5000);