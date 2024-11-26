$(document).ready(function() {
  $('#loginForm').on('submit', function(e) {
    e.preventDefault();
    const email = $('#logEmail').val();
    const password = $('#logPassword').val();
    $.ajax({
      url: 'http://localhost:3001/api/users/login', // Updated port to 3001
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ email, password }),
      success: function(response) {
        localStorage.setItem('token', response.token);
        alert('Login successful!');
        window.location.href = 'index.html'; // Redirect to user management page
      },
      error: function(xhr, status, error) {
        try {
          const response = JSON.parse(xhr.responseText);
          if (response.message === 'Invalid credentials') {
            alert('Incorrect password, please try again');
          } else if (response.message === 'Account locked due to multiple incorrect password attempts') {
            alert('Account locked due to multiple incorrect password attempts');
          } else {
            alert('Login failed!');
          }
        } catch (e) {
          alert('Login failed!');
          console.error('JSON Parse Error:', e);
        }
        console.error('Error:', error);
      }
    });
  });
});
