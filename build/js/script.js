if (document.querySelector('.content-block')) {  // чтобы не вылетал в ошибку, если нет блока
  const ps = new PerfectScrollbar('.content-block', {
    wheelSpeed: 2,
    wheelPropagation: true,
    minScrollbarLength: 100,
  });
  if (document.querySelector('.content-block--no-scroll')) {  //
    ps.destroy();
  }
}

const loginBtn = document.querySelector('.auth-modal__login-btn');
const loginErrorMessage = document.querySelector('.login-error-message');

if (loginBtn) {
  loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginErrorMessage.classList.toggle('show');
  })
}

// скрипт убирает звезду, когда в инпуте появляется текст (и возвращает обратно, когда текст убирается)
const inputWithStarsAll = document.querySelectorAll('.feedback-input--with-star');
inputWithStarsAll.forEach((input)=>{
  const starInputLabel = input.closest('.form-placeholder-wrapper').querySelector('.star-input-label');
  input.addEventListener('input', (e) => {
    if (e.target.value !== '') starInputLabel.classList.add('hidden');
    if (e.target.value === '') starInputLabel.classList.remove('hidden');
  })
})
