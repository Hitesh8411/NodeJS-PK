const mongoose =require('mongoose');
const bcrypt =require('bcrypt');

// define the Person schema

const personSchema =new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,

    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

});

personSchema.pre('save', async function () {

    // Hash password only if modified
    if (!this.isModified('password')) return;

    try {

        // Generate salt
        const salt = await bcrypt.genSalt(10);

        // Hash password
        this.password = await bcrypt.hash(this.password, salt);

    } catch (err) {

        throw err;

    }
});
personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        // Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}
const Person =mongoose.model('Person',personSchema)
module.exports = Person;