var express = require('express');
var router = express.Router();
const ProductModel = require('../modules/ProductModule');
const userModel = require('../modules/UserModule');





// Handle product creation
router.get('/createproduct', async function(req, res, next) {
  try {
    const newproduct = await ProductModel.create({
        userId:"66bf3abacc3806b4c1f2ce1c",
        productId:"fwt44850",
        description:"fabulous days ever groom dress",
        price:500,
        inventory:50
    });
    res.send(newproduct);
    const user = await userModel.findOne({_id:"66bf3abacc3806b4c1f2ce1c"});
    user.products.push(newproduct._id);
    user.save();
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).send('Error creating product');
  }
});

module.exports = router;
