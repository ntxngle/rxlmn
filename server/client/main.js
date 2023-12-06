import { login, loginToken } from 'login';
if(localStorage.getItem('token') !== undefined) {
    setTimeout(loginToken, 500);
}
const loginButton = document.getElementById('login');
loginButton.addEventListener('click', login);
