const modal = document.querySelector('.auth-modal');
const lkBtn = document.querySelector('.user_link');
const page = document.querySelector('.page');

let ps;

const scrollInit = () => {
  if (document.querySelector('.content-block')) {  // чтобы не вылетал в ошибку, если нет блока
    ps = new PerfectScrollbar('.content-block', {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 100,
    });
  }
  if(!modal.classList.contains('hidden')) ps.destroy();
}
scrollInit();

// открытие/закрытие модалок

lkBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const escHandler = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 27) modal.classList.add('hidden');
    page.removeEventListener('keydown', escHandler);
    scrollInit();
  }

  modal.classList.remove('hidden');
  const closeModalBtn = document.querySelector('.modal-close-btn');

  closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    scrollInit();
  })
  page.addEventListener('keydown', escHandler);

  if (document.querySelector('.content-block')) { // т.е. для всех страниц, кроме index.html
    ps.destroy();
  }
})


// Появление надписи "неправильный пароль или имейл" по кнопке Вход

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
inputWithStarsAll.forEach((input) => {
  const starInputLabel = input.closest('.form-placeholder-wrapper').querySelector('.star-input-label');
  input.addEventListener('input', (e) => {
    if (e.target.value !== '') starInputLabel.classList.add('hidden');
    if (e.target.value === '') starInputLabel.classList.remove('hidden');
  })
})
