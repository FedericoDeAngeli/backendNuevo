import {Schema, model} from "mongoose"

export const CartSchema = new Schema({
    _id: {type: String, required: true},
    product: [{pid:{type: String, ref: "productos"},
            quantity: {type: Number}
    }]
},{
    strict: "throw",
    versionKey: false,
    statics: {},    
    methods:{}
})

export const dbCart = model("cart", CartSchema)