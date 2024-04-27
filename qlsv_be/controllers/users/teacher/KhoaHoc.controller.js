//Làm giúp tôi đi, tôi không biết làm thế nào để cập nhật điểm cho sinh viên.// Assuming we have a model `Lesson` which corresponds to the database schema for lessons
const course = require('../../../models/course.model');

// Update lesson method
exports.updateLesson = async (req, res) => {
  try {
    const { courseCode } = req.params;
    const { content } = req.body; // New content for the lesson
    const files = req.files; // Uploaded files

    // Find the lesson by ID and update it with new content and files
    await course.findOneAndUpdate({ "courseCode": courseCode }, { content, files });

    res.status(200).json({ message: 'Lesson updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating lesson', error });
  }
};

