if (document.querySelector('.content-block')) {  // чтобы не вылетал в ошибку, если нет блока
  const ps = new PerfectScrollbar('.content-block', {
    wheelSpeed: 2,
    wheelPropagation: true,
    minScrollbarLength: 100,
  });
}

const loginBtn = document.querySelector('.auth-modal__login-btn');

const loginErrorMessage = document.querySelector('.login-error-message');

loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  loginErrorMessage.classList.toggle('show');

})

