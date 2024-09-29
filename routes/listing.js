const express=require("express");
const router=express.Router();

const wrapAysnc=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");

const listing=require("../models/listing.js");

const {isLoggedIn, isOwner,validListing}=require("../middleware.js");


const listingController=require("../controllers/listings.js");


const multer  = require('multer')
const storage=require("../cloudConfig.js")
const upload = multer({storage: storage })


router
.route("/")
.get(wrapAysnc(listingController.index))
// .post(isLoggedIn,validListing,wrapAysnc(listingController.createListing));
.post(upload.single('list[image]'), function (req, res, next) {
    res.send(req.file);
  })

  
router.get("/new",isLoggedIn,listingController.renderNewForm);
router
.route("/:id") 
.get(wrapAysnc(listingController.showListing))
.put(isLoggedIn,isOwner,wrapAysnc(listingController.updateListing)) 
.delete(isLoggedIn,isOwner,wrapAysnc(listingController.destroyListing));

router.get("/:id/edit",isLoggedIn,isOwner,wrapAysnc(listingController.renderEditForm));

module.exports=router;