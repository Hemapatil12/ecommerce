const port =4000;
const express=require("express");
const app=express();
const mongoose=require("mongoose")
const jwt =require("jsonwebtoken");
const multer =require("multer");
const path=require("path");
const cors =require("cors");

app.use(express.json());
app.use(cors());

//database connection with MongoDB
mongoose.connect="mongodb+srv://patilhema2705:Patil@2705@cluster0.co0yefh.mongodb.net/frontend";

//API Creation


app.get("/",(req,res)=>{
    res.send("Express App is running")

} )
app.listen(port,(error)=>{
    if(!error){
        console.log("server running on port"+port);
    }
    else{
       console.log('Error :'+error);  
    }
})


// Image storage engine
const storage=multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,'${file,fieldname}_${Date.now()}${path.extname(file.originalname)')
    }
})

const upload=multer({storage:storage})

//creating an upload image
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
res.json({
    success:1,
    image_url:'http://localhost:${port}/images/${req.file.filename}'
})
})

const product =mongoose.model("product",{
    id:{
        type:Number,
        required:true,

    },
    name:{
        type:String,
        required:true,

    },
    image:{
        type:String,
        required:true,

    },
    category:{
        type:String,
        required:true
    }
 new_price:{
        type:Number,
        required:true,

    },

old_price:{
    type:Number,
    required:true,
},
date:{
    type:date,
    default:Date.now(),
},
})
