const Employee = require('../models/Employee');
const validator = require('validator');

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    const empData = {
        emp_name: req.body.emp_name,
        emp_contact: req.body.emp_contact,
        emp_add: req.body.emp_add
    };

    // Input validation
    if (!validator.isLength(empData.emp_name, { min: 3, max: 255 })) {
        return res.status(400).send({
            message: "Employee name should be between 3 and 255 characters."
        });
    }

    if (!validator.isMobilePhone(empData.emp_contact)) {
        return res.status(400).send({
            message: "Invalid contact number format."
        });
    }

    const employee = new Employee(empData);
    employee.create((err, data) => {
        if (err)
            return res.status(500).send({
                message: err.message || "Some error occurred while creating the employee."
            });
        res.status(201).send(data);
    });
};

exports.findAll = (req, res) => {
    Employee.findAll((err, data) => {
        if (err)
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving employees."
            });
        res.send(data);
    });
};

exports.addData = (req, res) => {
    res.render('addData'); // Assuming you have a view template named 'addData'
};

exports.deleteOne = (req, res) => {
    const empId = req.body.emp_id;
    Employee.deleteOne(empId, (err, data) => {
        if (err)
            return res.status(500).send({
                message: err.message || "Some error occurred while deleting the employee."
            });
        res.status(202).send(data); // 202 Accepted is typically used for deletions
    });
};
