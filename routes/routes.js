const controller = require('../controller/controller');
module.exports = function(router){
  router.get('/', controller.getdefault);

  router.get('/addweight', controller.addweight);

  router.get('/aboutus', controller.aboutus);

  router.post('/addweight', controller.addweight);

  router.get('/aboutus', function(req, res) {
    res.send("You are on the about us route");
  });

  router.get('/getdocs', controller.getdocs);

  router.get('/getemployee/:employeeName', controller.getemployee);

  router.delete('/deletedoc/:employeeName', controller.deletedoc);

  router.route('/addnewdoc').post(controller.addnewdoc);

  router.put('/updatedoc', controller.updatedoc);
};
