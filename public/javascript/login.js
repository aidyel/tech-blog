async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        // check the response status
        if (response.ok) {
            document.location.replace('/dashboard/');
        } else {
            alert(response.statusText);
        }
    }
}

// async function loginFormHandler(event) {
//     event.preventDefault();

//     const email = document.querySelector('#email-login').value.trim();
//     const password = document.querySelector('#password-login').value.trim();

//     if (email && password) {
//         console.log(JSON.stringify({
//             email: email,
//             password: password
//         }))
//         const response = await fetch('/api/users/login', {
//             method: 'post',
//             body: JSON.stringify({
//                 email: email,
//                 password: password
//             }),
//             headers: { 'Content-Type': 'application/json' }
//         });

//         if (response.ok) {
//             document.location.replace('/dashboard/');
//         } else {
//             alert(response.statusText);
//         }
//     }
// }


const loginFormHandler = async function (event) {
    event.preventDefault();

    const email = document.querySelector('#email-login');
    const password = document.querySelector('#password-login');

        fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email: email.value,
                password: password.value
            }),
            headers: { 'Content-Type': 'application/json' }
        }).then(function() {
            document.location.replace('/dashboard/');
        }).catch(error => console.log(error));
    }

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);