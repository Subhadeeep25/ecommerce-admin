import {mongoose,Schema,models} from 'mongoose';
const ProductSchema = new Schema({
    title:{type: String,requied:true},
    description: String,
    price: {type: Number,requied:true},
});
 export const Product=models.Product||mongoose.model('Product',ProductSchema);