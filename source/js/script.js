const contentBlock = document.querySelector('.content-block');
// const ps = new PerfectScrollbar(contentBlock);


const ps = new PerfectScrollbar('.content-block', {
  wheelSpeed: 2,
  wheelPropagation: true,
  minScrollbarLength: 20,

});

