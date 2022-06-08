const cardEle = document.querySelector('.card');
const heartEle = document.querySelector('#heart');

cardEle.addEventListener('click', () => {
  cardEle.classList.toggle('is-flipped');
});

heartEle.addEventListener('click', () => {
  heartEle.classList.toggle('liked');
})

const headerEle = document.querySelector('.header');
const sidebarEle = document.querySelector('.sidebar');

let headerHeight = headerEle.offsetHeight + 'px';
console.log(headerHeight);
sidebarEle.style.height = `calc(100vh - ${headerHeight})`;
console.log(sidebarEle);


