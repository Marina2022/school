if (document.querySelector('.content-block')) {  // чтобы не вылетал в ошибку, если нет блока
  const ps = new PerfectScrollbar('.content-block', {
    wheelSpeed: 2,
    wheelPropagation: true,
    minScrollbarLength: 100,
  });
}

const loginBtn = document.querySelector('.auth-modal__login-btn');

const loginErrorMessage = document.querySelector('.login-error-message');
console.log(loginErrorMessage);
console.log('привет');

loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  alert('ha');
  loginErrorMessage.classList.toggle('show');

})

