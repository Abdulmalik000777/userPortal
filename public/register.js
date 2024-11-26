$(document).ready(function() {
  $('#registrationForm').on('submit', function(e) {
    e.preventDefault();
    const name = $('#regName').val();
    const email = $('#regEmail').val();
    const password = $('#regPassword').val();
    $.ajax({
      url: 'http://localhost:3001/api/users/register', // Updated port to 3001
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ name, email, password }),
      success: function(response) {
        alert('Registration successful!');
        window.location.href = 'login.html'; // Redirect to login page
      },
      error: function(xhr, status, error) {
        try {
          const response = JSON.parse(xhr.responseText);
          if (response.message === 'User already registered before') {
            alert('User already registered before'); // Show notification for existing user
          } else {
            alert('Registration failed!');
          }
        } catch (e) {
          alert('Registration failed!');
          console.error('JSON Parse Error:', e);
        }
        console.error('Error:', error);
      }
    });
  });
});
