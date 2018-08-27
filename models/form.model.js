const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formModel = new Schema({
    "formName": String,
    "formSchema": Schema.Types.Mixed,
    "uiSchema": Schema.Types.Mixed
}, {
    timestamps: true
});

// DB name: forms; collection name: schemas
// The mongoose model requires two arguments: a collection name, and a schema. 
module.exports = mongoose.model('schemas', formModel);