// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const Employee = require('../models/Employee');
// const Address = require('../models/Address');

// // Create a new user
// router.post('/users', (req, res) => {
//   const user = new User(req.body);
//   user.save((err, doc) => {
//     if (err) {
//       res.status(400).send(err);
//     } else {
//       res.status(201).send(doc);
//     }
//   });
// });

// // Get all users
// router.get('/users', (req, res) => {
//   User.find({})
//     .populate('Address')
//     .populate('Employee')
//     .exec((err, docs) => {
//       if (err) {
//         res.status(400).send(err);
//       } else {
//         res.send(docs);
//       }
//     });
// });

// // Get a user by ID
// router.get('/users/:id', (req, res) => {
//   User.findById(req.params.id)
//     .populate('Address')
//     .populate('Employee')
//     .exec((err, doc) => {
//       if (err) {
//         res.status(400).send(err);
//       } else {
//         res.send(doc);
//       }
//     });
// });

// // Update a user by ID
// router.put('/users/:id', (req, res) => {
//   User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, doc) => {
//     if (err) {
//       res.status(400).send(err);
//     } else {
//       res.send(doc);
//     }
//   });
// });

// // Delete a user by ID
// router.delete('/users/:id', (req, res) => {
//   User.findByIdAndDelete(req.params.id, (err, doc) => {
//     if (err) {
//       res.status(400).send(err);
//     } else {
//       res.send(doc);
//     }
//   });
// });

// // Create a new employee
// router.post('/employees', (req, res) => {
//   const employee = new Employee(req.body);
//   employee.save((err, doc) => {
//     if (err) {
//       res.status(400).send(err);
//     } else {
//       res.status(201).send(doc);
//     }
//   });
// });

// // Get all employees
// router.get('/employees', (req, res) => {
//   Employee.find({})
//     .populate('user_id')
//     .exec((err, docs) => {
//       if (err) {
//         res.status(400).send(err);
//       } else {
//         res.send(docs);
//       }
//     });
// });

// // Get an employee by ID
// router.get('/employees/:id', (req, res) => {
//   Employee.findById(req.params.id)
//     .populate('user_id')
//     .exec((err, doc) => {
//       if (err) {
//         res.status(400).send(err);
//       } else {
//         res.send(doc);
//       }
//     });
// });

// // Update an employee by ID
// router.put('/employees/:id', (req, res) => {
//   Employee.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, doc) => {
//     if (err) {
//       res.status(400).send(err);
//     } else {
//       res.send(doc);
//     }
//   });
// });

// // Delete an employee by ID
// router.delete('/employees/:id', (req, res) => {
//   Employee.findByIdAndDelete(req.params.id, (err, doc) => {
//     if (err) {
//       res.status(400).send(err);
//     } else {
//       res.send(doc);
//     }
//   });
// });

