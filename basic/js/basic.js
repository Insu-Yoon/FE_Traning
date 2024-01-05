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

$('.black-bg').on('click', modalBlack);
function modalBlack(event) {
  if (event.target == $('.black-bg')[0]) modalOff();
}
// window.onclick = function (event) {
//   if (event.target == $('.black-bg')[0]) {
//     modalOff();
//   }
// };

function emptyCheck(event) {
  if ($('.username').val() == '') {
    alert('아이디를 입력해주세요'), event.preventDefault();
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
    $('.theme-toggle').removeClass('bg-dark');
    $('.theme-toggle').addClass('bg-light');
    $('.theme-toggle').css('color', 'black');
  } else if (text.includes('Light')) {
    event.target.innerText = text.replace('Light', 'Dark');
    $('.navbar').addClass('navbar-light');
    $('.navbar').addClass('bg-light');
    $('.navbar').removeClass('navbar-dark');
    $('.navbar').removeClass('bg-dark');
    $('.theme-toggle').addClass('bg-dark');
    $('.theme-toggle').removeClass('bg-light');
    $('.theme-toggle').css('color', 'white');
  }
}
$('.badge').on('click', modeToggle);

setTimeout(timeOut, 5000);
function timeOut() {
  $('.set-time-test').hide();
  clearInterval(interval);
}
let time = 5;
const interval = setInterval(function () {
  time -= 1;
  $('.set-time-test p').text(`${time}초 이내 구매시 사은품 증정!`);
}, 1000);

function prevSlide() {
  const tx = -30 * (curSlide - 2);
  const txLast = -30 * (numOfSlides - 1);
  if (curSlide == 1) {
    $('.slide-container').css('transform', `translateX(${txLast}vw)`);
    curSlide = numOfSlides;
  } else {
    $('.slide-container').css('transform', `translateX(${tx}vw)`);
    curSlide--;
  }
}
function slideNum(event) {
  const tx = (1 - event.target.innerText) * 30;
  curSlide = event.target.innerText;
  $('.slide-container').css('transform', `translateX(${tx}vw)`);
}

let curSlide = 1;
const numOfSlides = $('.img-container').length;
function nextSlide() {
  const tx = -30 * curSlide;
  if (curSlide == numOfSlides) {
    $('.slide-container').css('transform', `translateX(0)`);
    curSlide = 1;
  } else {
    $('.slide-container').css('transform', `translateX(${tx}vw)`);
    curSlide++;
  }
}

window.addEventListener('scroll', navCtrlWithScroll);
function navCtrlWithScroll() {
  if (window.scrollY > 100) {
    $('.navbar').css('transform', 'scale(70%)');
    $('.navbar').css('width', `${(100 / 70) * 100}%`);
    $('.navbar').css('transform-origin', 'top left');
  } else {
    $('.navbar').css('transform', 'scale(100%)');
    $('.navbar').css('width', '100%');
  }
}

$('.lorem-container').on('scroll', checkScroll);
function checkScroll() {
  const con = $('.lorem-container');
  if (con.scrollTop() + con.innerHeight() + 10 > con.prop('scrollHeight')) {
    $('.lorem-container').off('scroll');
    $('.check-btn').attr('disabled', false);
  }
}

$(window).on('scroll', checkProgress);
function checkProgress() {
  $('.scroll-progress').css(
    'width',
    `${
      ($(window).scrollTop() /
        ($(document).outerHeight() - $(window).height())) *
      100
    }%`
  );
}

$('.prev-btn').on('click', prevSlide);
$('.slide-num-btn').on('click', slideNum);
$('.next-btn').on('click', nextSlide);

const detailBtn = $('.detail-btn');
detailBtn.on('click', toBasicTab);
function toBasicTab() {
  $.get('http://127.0.0.1:3000/detail.html')
    .done(function (data) {
      console.log(data);
      location.href = 'http://127.0.0.1:3000/detail.html';
    })
    .fail(function () {
      console.log('실패요');
    });
}
let startPoint;
let endPoint;
let checkMouseDown = false;
let currTrans;
let now;

const imgC = $('.img-container');
imgC.on('mousedown', touchSlide);
function touchSlide(event) {
  $('.slide-container').css('transition', 'none');
  checkMouseDown = true;
  startPoint = event.clientX;
  currTrans = $('.slide-container').css('-webkit-transform').split(/[()]/)[1];
  now = currTrans.split(',')[4];
}

imgC.on('mousemove', touchSlide2);
function touchSlide2(event) {
  if (checkMouseDown) {
    let moving = event.clientX - startPoint;

    let newTranslate = parseFloat(now) + parseFloat(moving);
    console.log(
      `moving : ${moving}, now : ${now}, newTranslate : ${newTranslate}`
    );
    $('.slide-container').css('transform', `translateX(${newTranslate}px)`);
  }
}
imgC.on('mouseup', touchSlide3);
function touchSlide3(event) {
  endPoint = event.clientX;
  checkMouseDown = false;
  let distance = endPoint - startPoint;
  let width = $('.img-container').width();
  if (distance / width <= -0.3) {
    Array.from(imgC).forEach((item, i) => {
      if (item == this) {
        if (i == numOfSlides - 1) i = -1;
        $('.slide-num-btn')
          .eq(i + 1)
          .click();
      }
    });
  } else if (distance / width >= 0.3) {
    Array.from(imgC).forEach((item, i) => {
      if (item == this) {
        if (i == 0) i = numOfSlides;
        $('.slide-num-btn')
          .eq(i - 1)
          .click();
      }
    });
  } else {
    Array.from(imgC).forEach((item, i) => {
      if (item == this) {
        $('.slide-num-btn').eq(i).click();
      }
    });
  }
  $('.slide-container').css('transition', 'all 0.5s');
}
