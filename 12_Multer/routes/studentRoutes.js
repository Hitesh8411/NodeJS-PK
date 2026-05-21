const express = require('express');
const router =express.Router();
const Student =require('../models/Student');

router.post('/create',async(req,res) =>{
    try{
        const{name,age,email,phone,address} =req.body;

        const newStudent =new Student({
            name,
            age,
            email,
            phone,
            address
        });
        await newStudent.save();
        res.status(201).json({message:'student created successfully', student:newStudent});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:'Error creating student record'});

    }
})

module.exports = router;