const cardEle = document.querySelector('.card');
const heartEle = document.querySelector('#heart');

const signupModal = new bootstrap.Modal(document.querySelector('#signupModal'));
const signupFormEle = document.querySelector('#signupForm');
const usernameSignupEle = document.querySelector('#UsernameSignup');
const passwordSignupEle = document.querySelector('#PasswordSignup');
const passwordRepeatEle = document.querySelector('#PasswordRepeat');

const loginModal = new bootstrap.Modal(document.querySelector('#loginModal'));
const loginFormEle = document.querySelector('#loginForm');
const usernameLoginEle = document.querySelector('#UsernameLogin');
const passwordLoginEle = document.querySelector('#PasswordLogin');

const successModal = new bootstrap.Modal(document.querySelector('#successModal'));
const failModal = new bootstrap.Modal(document.querySelector('#failModal'));
const failMessageEle = document.querySelector('#failMessage');

let check = localStorage.getItem('allAccount');
if (check) {
  var account = JSON.parse(check);
  console.log(account);
} else { 
  var account = [];
}

//Check if username exists
function usernameExist(newUsername) {
  if (account !== null) {
    for (let i = 0; i < account.length; i++) {
      if (account[i].username === newUsername) return true;
    }
    return false;
  } else {
    return false;
  }
}

//Check login
function loginOK(inputUsername, inputpassword) {
  for (let i = 0; i < account.length; i++) {
    if (account[i].username === inputUsername && account[i].password === inputpassword) {
      return true;
    }
  }
  return false;
}

//Sign up JS
signupFormEle.addEventListener('submit', (e) => {

  e.preventDefault();
  if (usernameExist(usernameSignupEle.value)) { 
    failMessageEle.innerText = 'Email này đã được sử dụng.';
    failModal.show();
  } else {
    if (passwordSignupEle.value === passwordRepeatEle.value) {
      let acc = {
        'username':usernameSignupEle.value, 
        'password':passwordSignupEle.value 
      };
      account.push(acc);
      localStorage.setItem('allAccount', JSON.stringify(account));
      signupModal.hide();
      successModal.show();
      loginModal.show();
    } else {
      failMessageEle.innerText = 'Mật khẩu không khớp.';
      failModal.show();
    }
  }
  
  usernameSignupEle.value = '';
  passwordSignupEle.value = '';
  passwordRepeatEle.value = '';
  
})

//Login JS
loginFormEle.addEventListener('submit', (e) => {

  e.preventDefault();

  if (account !== null) {
    if (loginOK(usernameLoginEle.value,passwordLoginEle.value)) {
      successModal.show();
      loginModal.hide();
    } else {
      failMessageEle.innerText = 'Nhập sai email hoặc mật khẩu.';
      failModal.show();
      loginModal.show();
    }
  } else {
    failMessageEle.innerText = 'Nhập sai email hoặc mật khẩu.';
    failModal.show();
    loginModal.show();
  }

  usernameLoginEle.value = '';
  passwordLoginEle.value = '';

});

// Card JS
cardEle.addEventListener('click', () => {
  cardEle.classList.toggle('is-flipped');
});
// Heart JS
heartEle.addEventListener('click', () => {
  heartEle.classList.toggle('liked');
})

