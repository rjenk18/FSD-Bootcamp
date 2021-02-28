const jwt = require('jsonwebtoken');
const path = require("path");
const w = require('./../controllers/winston_config');
const Weight = require('../models/employees');
const User = require('../models/users');
exports.getdefault = function(req, res){
  res.sendFile(path.join(__dirname + '/../HTML/index.html'));
  //res.send('You are on the root route.');
};
//
exports.aboutus=function(req, res){
  res.send('You are on the about us route.');
};
//
exports.addweight=function(req, res){
  let empName = req.body.empName;
  let empWeight = req.body.empWeight;
  res.end(`POST success, you sent ${empName} and ${empWeight}, thanks!`);
};
//
exports.getdocs=function(req, res){
  Weight.find({}, function(err, results){
		if (err) {
      w.log( {
        level: 'error',
        message:err
      });
      res.status(503).send('Technical difficulties, please check with your Administrator!')
      }
		res.json(results);
	});
};
//
exports.getemployee = function(req, res) {
  let empToFind = req.params.employeeName;
  Weight.find({empName:empToFind}, function(err, results){
	if (err)
    res.end(err);
  if(!results.length)
    res.status(404).send('We could not find that name');
	res.json(results);
	});
};
//
exports.deletebyname = function(req, res) {
  let empToFind = req.params.employeeName;
  Weight.deleteOne({empName:empToFind}, function(err, results){
	if (err)
    res.end(err);
  if(!results.length)
    res.status(404).send('We could not deltet that name');
	res.end(`Deleted ${empToDelete}`);
	});
};
//
exports.addnewdoc = function(req, res) {
  let empName = req.body.empName;
  let empPass = req.body.empPass;
  const Weights = new Weight();
  Weights.empName = empName;
  Weights.empPass = empPass;
  Weights.save({}, function(err) {
		if (err)
			res.end(err);
		res.end(`Created ${empName}`);
  });
};
exports.updatedoc = function(req, res) {
  let empName = req.body.empName;
  let newPass = req.body.newPass;
  let query = { empName : empName };
  let data = { $set : {empPass : newPass } };
  Weight.updateOne(query, data, function(err, result) {
    if (err)
      res.send(err);
    res.end(`Updated ${empName}`);
  });
};
//
exports.addnewuser=function(req, res){
  let empName = req.body.empName;
  let empPass = req.body.empPass;
  const user = new User();
  user.empName = empName;
  user.empPass = empPass;
  user.save({}, function(err){
    if(err)
      res.end(err);
    res.end(`Created ${empName}`)
  });
};
//
exports.loginuser=function(req, res){
  let empName = req.body.empName;
	let empPass = req.body.empPass;
	User.find({empName:empName}, function(err, results){
	  if (err)
	    res.end(err);
    if(results[0].empPass == empPass){
      jwt.sign({
        empName:results[0].empName,
        userID:results[0]._id
      },
      "mysecret",
      {expiresIn : "1h"},
      function(err, token){
        if(err) throw err;
        res.end(token);
      })
    } else {
        res.end("Login failed");
      }
  });
};
//
exports.pugpage=function(req, res){
	res.render(
	  'pughome'
	)
};