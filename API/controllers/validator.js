const { check, validationResult } = require('express-validator');
const fieldChecks = function() {
    return [
        check('empName', 'Name cannot be empty.').not().isEmpty()
    ]
};

const validate = function(req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    };
    res.status(400).end(errors.array()[0].msg);
}

module.exports = {
    fieldChecks,
    validate,
}