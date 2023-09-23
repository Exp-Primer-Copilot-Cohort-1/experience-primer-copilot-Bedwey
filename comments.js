// Create web server
const express = require('express');
const app = express();
// Connect to MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/comment');
// Create schema
const CommentSchema = new mongoose.Schema({
  name: String,
  comment: String,
  date: Date
});
// Create model
const Comment = mongoose.model('Comment', CommentSchema);
// Create router
const router = express.Router();
// Create route
router.post('/comment', (req, res) => {
  // Create new comment
  const newComment = new Comment({
    name: req.body.name,
    comment: req.body.comment,
    date: new Date()
  });
  // Save comment
  newComment.save((err, comment) => {
    // Send response
    res.send(comment);
  });
});
// Use router
app.use('/', router);
// Start server
app.listen(3000);
console.log('Server listening on port 3000');
// Path: index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Comments</title>
    <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
  </head>
  <body>
    <form id="commentForm">
      <input type="text" name="name" placeholder="Name" /><br />
      <textarea name="comment" placeholder="Comment"></textarea><br />
      <input type="submit" value="Post Comment" />
    </form>
    <div id="output"></div>
    <script>
      // Send POST request on form submission
      $('#commentForm').submit((e) => {
        e.preventDefault();
        $.ajax({
          url: '/comment',
          type: 'POST',
          data: $('#commentForm').serialize(),
          success: (data) => {
            // Append comment to page
            $('#output').append('<p>Name: ' + data.name + '</p>');
            $('#output').append('<p>Comment: ' + data.comment + '</p>');
            $('#output').append('<p>Date: ' + data.date + '</p>');
          }
        });
      });
    </script>
  </body>
</html>