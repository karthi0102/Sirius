const mongoose = require('mongoose');
const {Schema} = mongoose
const bcrypt=require('bcrypt')
const userSchema = new Schema({
    username:{
        type:String,
        required:[true,'Username cannot be blank']
    },
    password:{
        type:String,
        required:[true,'Password cannot be blank']
    },
})
userSchema.statics.findAndValidate =  async(username,password)=>{
    const user= await this.findOne({username});
    const validPassword = await bcrypt.compare(password, user.password);
    return validPassword?user:false;
}

userSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next();
    this.password= await bcrypt.hash(this.password,12);
    next();
})
module.exports= new mongoose.model('User',userSchema)