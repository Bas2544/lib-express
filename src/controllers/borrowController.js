const Borrow = require("../models/borrowModel");


exports.getBorrows = async (req, res) => {
    Borrow.find()
        .exec((err, result) => {
            res.status(200).json({
                msg: "Ok",
                data: result
            })
        });
};


exports.borrowBook = async(req, res) => {
    try {
        let borrow = new Borrow(req.body);
     
        let createdBorrow = await borrow.save();

        
        let dDate = new Date(createdBorrow.borrowDate)
       
        let data = { 
            dueDate : dDate.setDate(dDate.getDate()+120)    
        };
   
        Borrow.findByIdAndUpdate(createdBorrow._id, data).exec((err, result)=>{
            Borrow.findById(createdBorrow._id)
                .exec((err, result)=>{
                    res.status(200).json({
                        msg: "Borrow savedeeeeeeeee",
                        data: result
                    });
                });
        });
    } catch (error) {
      
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};


exports.returnBook = async(req, res) => {
    let data = { 
        returnedDate : new Date(),
        receiver: req.body.receiver
    };
    Borrow.findByIdAndUpdate(req.params.id, data).exec((err, result)=>{
            Borrow.findById(req.params.id)
                .exec((err, result)=>{
                    res.status(200).json({
                        msg: "Return book saved",
                        data: result
                    });
                });
        });
};

exports.getBorrowDataByMember = async (req, res) => {
    let member_id = req.params.id;
    console.log(member_id);
    Borrow.find({ "borrower.member_id": member_id })
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

exports.getBorrowDataByBook = async (req, res) => {
    let book_id = req.params.id;
    console.log(book_id);
    Borrow.find({ "book.book_id": book_id })
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

exports.borrowBook02 = async(req, res)=>{
    try {
        //Find member
        let member = Member.find({ member_id: req.body.member_id });
        let book = Book.find({ book_id: req.body.book_id });
        let lender = Staff.find({ staff_id: req.body.staff_id });

        let borrow = new Borrow({
            borrower: {
                member_id: member.member_id,
                name: member.name
            },
            book:{
                book_id: book.book_id,
                name: book.name
            },
            lender:{
                staff_id: lender.staff_id,
                name: lender.name
            }
        });
        let createdBorrow = await borrow.save();
        
        let data = { 
    
            dueDate : dDate.setDate(dDate.getDate()+ 120)    
        };
        
        Borrow.findByIdAndUpdate(createdBorrow._id, data).exec((err, result)=>{
            Borrow.findById(createdBorrow._id)
                .exec((err, result)=>{
                    res.status(200).json({
                        msg: "Borrow save",
                        data: result
                    });
                });
        });
    } catch (error) {
       
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};


exports.addBorrow = async (req, res) => {
    try {
        // define a new product schema, define data from request body
        let borrow = new borrow({
            borrower: req.body.borrower,
            book: req.body.book,
            dateborrow: req.body.dateborrow,
            limit: req.body.limit,
            lender: req.body.lender,
            // student: req.body.student,
            // teacher:req.body.teacher
            // no reviews yet for now
        });
        // store result from saving
        let createdBorrow = await borrow.save();
        res.status(200).json({
            msg: "Add a Book complete.",
            data: createdBorrow
        });
    } catch (err) {
        // if there is an error, it will jump to here
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};