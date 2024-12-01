const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    skills: [{ skill: String }],
    github: { type: String, require: true},
    demo: {type: String, require: true}
})

module.exports = mongoose.model('Project', projectSchema);