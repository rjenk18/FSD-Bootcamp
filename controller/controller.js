const Weight = require('../models/employees');

exports.getdefault = function(req, res) {
  res.send('You are on the root route');
};

exports.aboutus = function(req, res) {
  res.send('You are on the about us route');
};

exports.addweight = function(req, res) {
  let empName = req.body.empName;
  let empWeight = req.body.empWeight;
  res.send(`POST success, you sent ${empName} and ${empWeight}, thanks!`);
};

exports.getdocs = function(req, res) {
  Weight.find({}, function(err, results){
    if (err)
    res.end(err);
    res.json(results);
  });
  // res.send('You are on the getdocs route');
};

exports.getemployee = function(req, res) {
  let empToFind = req.params.employeeName;
  Weight.find({empName:empToFind})
  .then(results=>{
    if(!results.length)
      res.status(404).send('We could not find that name');
    else
      res.json(results);
  })
  .catch(err=>console.log(err.message))
};

exports.deletedoc = function(req, res) {
  let empToDelete = req.body.empName;
  Weight.deleteOne({empName:empToDelete}, function(err, result) {
    if (err)
      res.send(err);
    res.end(`Deleted ${empToDelete}`);
  });
};

exports.addnewdoc=function(req, res){
  let empName = req.body.empName;
  let empPass = req.body.empPass;
  const Weights = new Weight();
  Weights.empName = empName;
  Weights.empPass = empPass;
  Weights.save([], function(err) {
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
