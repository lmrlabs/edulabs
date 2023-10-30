const mongoose = require('mongoose');

const subunitSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
});

const unitSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subunits: [subunitSchema]
});

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    units: [unitSchema],
    description: {
        type: String
    },
});

let Course: any;

if (mongoose.models.Course) {
    Course = mongoose.model('Course');
  } else {
    Course = mongoose.model('Course', courseSchema, 'newcourses');
  }

export default Course;