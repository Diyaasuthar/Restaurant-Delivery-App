const { default: mongoose } = require("mongoose");

const deliveryPartnerModel = new mongoose.Schema({
    name:String,
    password:String,
    city:String,
    address:String,
    mobile:String
})

export const deliveryPartnerSchema = mongoose.models.deliverypartner || mongoose.model('deliverypartner',deliveryPartnerModel);