import{Schema ,model} from 'mongoose'


const newSchema= new Schema({
   content:{
    type:Text
   },createdAt:{
    type:Date,
   default:Date.now
   },
})

const contentModel= model("content",newSchema)

module.exports 