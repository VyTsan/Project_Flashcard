const cardEle = document.querySelector('.card');
const heartEle = document.querySelector('#heart');

cardEle.addEventListener('click', () => {
  cardEle.classList.toggle('is-flipped');
});

heartEle.addEventListener('click', () => {
  heartEle.classList.toggle('liked');
})





