function toggleMenu() {
  // document.querySelector('ul.list-group').classList.toggle('show');
  $('ul.list-group').toggle('show');
}
// toggleButton.addEventListener('click', toggleMenu);
$('.navbar-toggler').on('click', toggleMenu);
// const targetList = document.querySelector('.list-group');
$('.list-group').on('mouseleave', toggleMenu);
// targetList.addEventListener('mouseleave', toggleMenu);
function modalOn() {
  $('.black-bg').fadeIn();
}
function modalOff() {
  $('.black-bg').fadeOut();
}
$('#login').on('click', modalOn);
$('#close').on('click', modalOff);

const modalPop = document.querySelector('.black-bg');
// const modalPop = $('.black-bg');
window.onclick = function (event) {
  if (event.target == modalPop) {
    $('.black-bg').fadeOut();
  }
};
function emptyCheck(event) {
  if ($('.username').val() == '') {
    alert('아이디를 입력해주세요');
    event.preventDefault();
  } else if ($('.password').val() == '') {
    alert('비밀번호를 입력해주세요');
    event.preventDefault();
  } else if ($('.password').val().length < 6) {
    alert('비밀번호는 6자 이상입니다.');
    event.preventDefault();
  }
}
$('.submit-btn').on('click', emptyCheck);

function modeToggle(event) {
  let text = event.target.innerText;
  if (text.includes('Dark')) {
    event.target.innerText = text.replace('Dark', 'Light');
    $('.navbar').removeClass('navbar-light');
    $('.navbar').removeClass('bg-light');
    $('.navbar').addClass('navbar-dark');
    $('.navbar').addClass('bg-dark');
  } else if (text.includes('Light')) {
    event.target.innerText = text.replace('Light', 'Dark');
    $('.navbar').addClass('navbar-light');
    $('.navbar').addClass('bg-light');
    $('.navbar').removeClass('navbar-dark');
    $('.navbar').removeClass('bg-dark');
  }
}
$('.badge').on('click', modeToggle);
