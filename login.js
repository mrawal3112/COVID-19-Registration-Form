const emailAddress = document.querySelector('.email');
const password = document.querySelector('.password');
const submitBtn = document.querySelector('.login')


submitBtn.addEventListener('click', function () {
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;
    if (emailAddress.value.match(mailformat)) {
        emailAddress.style.borderColor = 'green';
        if (password.value.length >= 8) {
            for (let i = 0; i < password.value.length; i++) {
                if (password.value.match(lowerCaseLetters)) {
                    if (password.value.match(upperCaseLetters)) {
                        if (password.value.match(numbers)) {
                            password.style.borderColor = 'green';
                            alert('Login Successful');
                            break;
                        }
                        else {
                            alert('Must contain a number');
                            password.style.borderColor = 'red';
                            password.focus();
                            break;
                        }
                    }
                    else {
                        alert('Must contain a upper case letter');
                        password.style.borderColor = 'red';
                        password.focus();
                        break;
                    }
                }
                else {
                    alert('Must contain a lower case letter');
                    password.style.borderColor = 'red';
                    password.focus();
                    break;
                }
            }
        }
        else {
            alert('Lenght of the password must be 8 or more');
            password.style.borderColor = 'red';
            password.focus();
        }
    }
    else {
        alert("You have entered an invalid email address!");
        emailAddress.style.borderColor = 'red';
        emailAddress.focus();
    }

})