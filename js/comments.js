document.addEventListener('DOMContentLoaded', function() {
    // Connect to Socket.io server
    const socket = io('http://localhost:3000'); // Change to your server URL
    
    // DOM elements
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.getElementById('commentsList');
    const commentName = document.getElementById('commentName');
    const commentText = document.getElementById('commentText');
    
    // Load existing comments
    socket.on('load-comments', (comments) => {
        renderComments(comments);
    });
    
    // Handle new comment
    socket.on('new-comment', (comment) => {
        addCommentToDOM(comment);
    });
    
    // Form submission
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (commentName.value.trim() === '' || commentText.value.trim() === '') {
            alert('Please fill in all fields');
            return;
        }
        
        const newComment = {
            name: commentName.value.trim(),
            text: commentText.value.trim(),
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(commentName.value.trim())}&background=random`
        };
        
        // Emit new comment to server
        socket.emit('add-comment', newComment);
        
        // Clear form
        commentName.value = '';
        commentText.value = '';
    });
    
    // Render all comments
    function renderComments(comments) {
        commentsList.innerHTML = '';
        
        if (comments.length === 0) {
            commentsList.innerHTML = '<p>No comments yet. Be the first to comment!</p>';
            return;
        }
        
        comments.forEach(comment => {
            addCommentToDOM(comment);
        });
    }
    
    // Add single comment to DOM
    function addCommentToDOM(comment) {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment-item';
        commentElement.innerHTML = `
            <div class="comment-header">
                <div class="comment-author">
                    <img src="${comment.avatar}" alt="${comment.name}">
                    <div class="comment-author-info">
                        <h4>${comment.name}</h4>
                        <p>${comment.date}</p>
                    </div>
                </div>
            </div>
            <div class="comment-text">
                ${comment.text}
            </div>
        `;
        
        // Add animation
        commentElement.style.opacity = '0';
        commentElement.style.transform = 'translateY(20px)';
        commentsList.prepend(commentElement);
        
        // Trigger animation
        setTimeout(() => {
            commentElement.style.transition = 'all 0.3s ease';
            commentElement.style.opacity = '1';
            commentElement.style.transform = 'translateY(0)';
        }, 100);
    }
});
