var express = require('express');
var mongoose = require('mongoose');
var FormModel = require('../models/form.model.js');
var router = express.Router();

// base '/forms' route <=> '/''
router.get('/', function(req, res) {
    FormModel.find()
	    .then(formSchemas => {
	        res.send(formSchemas);
	    }).catch(err => {
	        res.status(500).send({
	            message: err.message || "Some error occurred while retrieving forms."
	        });
	    });
});

// /forms/{:formId}
router.get('/:formId', function(req, res) {    
    FormModel.findById(req.params.formId)
	    .then(form => {
	        if(!form) {
	            return res.status(404).send({
	                message: "Form not found with id " + req.params.formId,
	                form: form
	            });            
	        }
	        res.send(form);
	    }).catch(err => {
	        if(err.kind === 'ObjectId') {
	            return res.status(404).send({
	                message: "Form not found with id " + req.params.formId
	            });                
	        }
	        return res.status(500).send({
	            message: "Error retrieving Form with id " + req.params.formId
	        });
	    });
});

router.post('/:formId', function(req, res) {
    var form = new Form(req.body);
    form.save()
    res.status(200).send(form);
})


module.exports = router;