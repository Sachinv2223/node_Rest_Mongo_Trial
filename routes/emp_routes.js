const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const empModel = require('../models/emp_model')

//post
router.post('/',async (req,res) => {
    console.log('Body :',req.body);
    try {

        const employee = new empModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age
        })

        await employee.save();
        res.json({
            success:1,
            message: 'Succesfully saved'
        })

    } catch (error) {
        res.json({
            success:0,
            message: 'Something went wrong while saving employee :' + error
        })
    }
})

//get ALL
router.get('/',async (req,res) => {

    try {
        let allEmployee = await empModel.find(); //always returns an array
        res.json({
            success: 1,
            message: 'Employee(s) listed successfully..',
            item: allEmployee
        }) 
    } catch (error) {
        res.json({
            success: 0,
            message: 'Error occured while listing all employees :'+ error 
        })
    }
})

//get By Id
router.get('/:id',async (req,res) => {

        let empId = req.params.id;
        console.log(empId);
        let validId = await mongoose.Types.ObjectId.isValid(empId);

        if(validId) {
        try {
            
            let Employ = await empModel.findById({_id: empId});
            console.log('Employee :',Employ)
            res.json({
                success: 1,
                message: 'Employee detail found successfully..',
                item: Employ
            })
        } catch (error) {
            res.json({
                success: 0,
                message: 'Error occured while finding employee detail.. :'+ error 
            })
        }
    }     
    else {
        res.json({
            success: 0,
            message: 'Invalid Employee ID :' 
        })
    }
})

//put
router.put('/:id',async (req,res) => {

    let empId = req.params.id;
    console.log(empId);
    let validId = await mongoose.Types.ObjectId.isValid(empId);

    if(validId) {
    try {
        let beforeUpdate = await empModel.findByIdAndUpdate({_id: empId},
            {$set: {firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    age: req.body.age}})
        let updatedData = await empModel.findById({_id: empId});
        res.json({
            success: 1,
            message: 'Employee detail Updated successfully..',
            Details_before: beforeUpdate,
            Details_after: updatedData
        })
    } catch (error) {
        res.json({
            success: 0,
            message: 'Error occured while updating employee detail.. :'+ error 
        })
    }
}     
else {
    res.json({
        success: 0,
        message: 'Invalid Employee ID :' 
    })
}
})

//delete
router.delete('/:id',async (req,res) => {

    let empId = req.params.id;
    console.log(empId);
    let validId = await mongoose.Types.ObjectId.isValid(empId);

    if(validId) {
    try {
        
        let Employ = await empModel.findByIdAndDelete({_id: empId});
        console.log('Employee :',Employ)
        res.json({
            success: 1,
            message: 'Employee detail deleted successfully..',
            Deleted_item: Employ
        })
    } catch (error) {
        res.json({
            success: 0,
            message: 'Error occured while deleting employee detail.. :'+ error 
        })
    }
}     
else {
    res.json({
        success: 0,
        message: 'Invalid Employee ID :' 
    })
}
})
    













//always use this to export
module.exports = router;