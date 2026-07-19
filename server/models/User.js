import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    image_url:{
        type: String,
        require: true,
    },
    collagename: {
        type: String,
        require: true,
    },
    bio:{
        type:String,
        require:true
    },
    skill: {
        type: Array,
        require: true,
    },
    githublink:{
        type: String,
    },
    linkedinlink:{
        type: String,
    },
    protfolio:{
        type:String,
    },
    studentCode:{
        type:String,
        require: true,

    },
    section:{
        type:String,
        require: true,
    },
    phoneNumber:{
        type:Number,
        require: true,
    },
    password:{
        type:String,
        require: true,
    }
},{ timestamps: true });
const User = mongoose.model("User", userSchema);
export default User;