import db from 'db';
import { switchPage } from 'ui';
import { setUserInfo, applyUserInfo } from 'userinfo';
export function login() {
    const email = document.getElementById('email').value;
    if (!email.endsWith('@palmbeachschools.org') && email !== 'admin') {
        document.getElementById('validation').innerText = 'Not a palmbeachschools.org email address';
        document.getElementById("validation").classList.add("shown");
        return;
    }
    if(!email.match(/^[a-zA-Z0-9.+]+@palmbeachschools.org$/) && email !== 'admin') {
        document.getElementById('validation').innerText = 'Invalid characters in email address';
        document.getElementById("validation").classList.add("shown");
        return;
    }
    const password = document.getElementById('password').value;
    db.auth.signIn(email, password).then(user => {
        console.log('Signed in as', user.user.username);
        localStorage.clear();
        localStorage.setItem('token', user.accessToken);
        setUserInfo({
            name: user.user.username,
            email: user.user.email
        });
        applyUserInfo(1);
        switchPage(1);
    }).catch(err => {
        console.error(err);
        document.getElementById('validation').innerText = err.message;
        document.getElementById("validation").classList.add("shown");
    });
}
function announceSignIn(user) {
    console.log('Signed in as', user.user.username);
    setUserInfo({
        name: user.user.username,
        email: user.user.email
    });
    applyUserInfo(1);
    switchPage(1);
}
export function loginToken(){
    if(db.connected) {
        console.log("CONNCTEDE IGID");
        db.auth.signInWithToken(localStorage.getItem('token')).then(user => {
            console.log('Signed in as', user.user.username);
            setUserInfo({
                name: user.user.username,
                email: user.user.email
            });
            switchPage(1);
        }).catch(err => {
            console.error(err);
            localStorage.clear();
            switchPage(0);
        });
    } else {
        console.log("NUHU UH");
        db.auth.setAccessToken(localStorage.getItem('token'));
        db.once('signin', announceSignIn);
    }
}