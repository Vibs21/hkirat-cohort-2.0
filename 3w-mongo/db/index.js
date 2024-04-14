const mongoose = require('mongoose');
const { number } = require('zod');

// Connect to MongoDB
mongoose.connect('mongodb+srv://vaibhavbajpayee2109:btv8U5TYzlFeqMUG@cluster0.itw4lsa.mongodb.net/coursesDb');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: { type: String, unique: true },
    password: String
});

const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
})

const CourseSchema = new mongoose.Schema({
    // Schema definition here   
    title: {type:String, required:true},  
    description: String,
    price: Number,
    imageLink: String
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}