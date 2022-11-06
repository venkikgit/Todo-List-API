const List = require('../model/list');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncError');

module.exports.createTodo = catchAsyncErrors(async (req,res)=>{
    const list = await List.create(req.body);
    res.status(201).json({success:true,list})

})

// Delete a task from list
module.exports.delete = catchAsyncErrors( async (req,res) =>{

    const list = await List.findById(req.params.id);
    if(!list){
        return res.status(500).json({
            success:false,
            message:"Task not Found"
        })
    }

    await list.remove();

    res.status(200).json({
        success:true,
        message:"Task deleted successfully"
    })
});

//Get all tasks

module.exports.getAll = catchAsyncErrors(async (req,res)=>{
    let {page,pageSize,fromDate,toDate} = req.query;
    if(!page) page =1;
    // if(!pageSize) pageSize= 5;    
    if(!page && !pageSize || !pageSize){pageSize= await List.count() ;
        // console.log(pageSize)
    };
    if(!fromDate) fromDate = '2022-11-01';
    if(!toDate) toDate =new Date();
    // console.log(pageSize);
    const skip = (page -1)*pageSize;

    const list = await List.find({'createdAt':{'$gte':fromDate,'$lte':toDate}}).skip(skip).limit(pageSize);
    res.status(200).json({success:true,fromDate:fromDate,toDate:toDate,page:page,pageSize:pageSize,list});
})

//update task
module.exports.update = catchAsyncErrors(async (req,res)=>{
    let list = await List.findById(req.params.id);
    if(!list){
        return res.status(500).json({
            success:false,
            message:"Product not Found"
        })
    }

    list = await List.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        list
    })
})
