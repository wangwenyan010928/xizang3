function updateAddress() {
    fetch('http://127.0.0.1:5000/get_address')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('address').textContent = "地址: " + data.address;
            document.getElementById('footer-address').textContent = data.address;
        })
        .catch(error => {
            console.error('Error fetching address:', error);
            document.getElementById('address').textContent = "地址: 加载失败";
        });
}

function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => console.error('Error:', error));
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('auth-forms').style.display = 'none';
            document.getElementById('member-content').style.display = 'block';
            document.getElementById('user-info').textContent = '欢迎, ' + username;
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

// Update address every 5 seconds
setInterval(updateAddress, 5000);
updateAddress();
