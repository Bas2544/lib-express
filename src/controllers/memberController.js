const Member = require('../models/memberModel');

exports.addMember = async(req , res)=>{
    try {
        let member = new Member({
            memberId:req.body.memberId,
            name:req.body.name,
            password:req.body.password,
            group:req.body.group,
            address:req.body.address,
            phoneNumber:req.body.phoneNumber,

        });
        let createMember = await member.save();

        res.status(200).json({
            msg:"Add Staff OK",
            data: createMember
        });
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            error:error
        });
    }
}

exports.updateMember = async (req,res)=>{
    // req.params.id = id ของ staff 
    // req.body = ข้อมูล staff ที่จะ update
    let member = {
        name:req.body.name,
        password:req.body.password,
        group:req.body.group,
        address:req.body.address,
        phoneNumber:req.body.phoneNumber,

    };
    Member.findByIdAndUpdate(req.params.id,member)
    .exec((err,data)=>{
        // findById อีกรอบเพื่อเอา data ใหม่
        Member.findById(req.params.id)
        .exec((err,data)=>{
            data.password=null;
            res.status(200).json({
                msg: "OK",
                data: data
            });
        });
    });
};

exports.getMember = async (req, res) => {

    Member.find()
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

exports.getMemberById = async (req, res) => {
    Member.findById(req.params.id)
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

exports.getMemberByName = async (req, res) => {
    let memberName = req.params.name;
    Member.find({
        name: {
            $regex: new RegExp(memberName),
            $options: 'i'
        }
    })
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

exports.deleteMember = async (req, res) => {
    Member.findByIdAndDelete(req.params.id)
        .exec((err) => {
            if (err) {
                res.status(500).json({
                    msg: err
                });
            } else {
                res.status(200).json({
                    msg: "Delete complete"
                });
            }
        });
};