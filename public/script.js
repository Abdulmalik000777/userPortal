$(document).ready(function() {
  // Fetch Users and Populate Table
  function fetchUsers() {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'login.html'; // Redirect to login if no token
      return;
    }

    $.ajax({
      url: '/api/users',
      headers: { 'Authorization': `Bearer ${token}` },
      success: function(users) {
        const userTableBody = $('#userTableBody');
        userTableBody.empty();
        users.forEach(user => {
          userTableBody.append(`
            <tr>
              <td><input type="checkbox" class="userCheckbox" data-id="${user.id}"></td>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${user.last_login}</td>
              <td>${user.status}</td>
            </tr>
          `);
        });
      },
      error: function(xhr, status, error) {
        console.error('Error fetching users:', error);
      }
    });
  }

  // Initial Fetch Users Call
  fetchUsers();
});
