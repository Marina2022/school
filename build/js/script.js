if(document.querySelector(".content-block")){const e=new PerfectScrollbar(".content-block",{wheelSpeed:2,wheelPropagation:!0,minScrollbarLength:100});document.querySelector(".content-block--no-scroll")&&e.destroy()}const loginBtn=document.querySelector(".auth-modal__login-btn"),loginErrorMessage=document.querySelector(".login-error-message");loginBtn.addEventListener("click",(e=>{e.preventDefault(),loginErrorMessage.classList.toggle("show")}));