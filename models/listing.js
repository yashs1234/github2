const mongoose=require("mongoose");
const review = require("./review.js");
const { listingSchema } = require("../schema");

const listeningSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    image:{
        type:String,
        default:"https://images.unsplash.com/photo-1721804978859-d2f31f8cfcc8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set:(v) => v=="" ? "https://images.unsplash.com/photo-1721804978859-d2f31f8cfcc8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" :v
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"review"
    }
    ],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

listeningSchema.post("findOneAndDelete",async(listing)=>{
    await review.deleteMany({_id:{$in:listing.reviews}});
})

const listing=new mongoose.model("listing",listeningSchema);
module.exports=listing;