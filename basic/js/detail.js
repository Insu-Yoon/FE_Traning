$('.list').on('click', tabSelection);
function tabSelection(event) {
  const btns = $('.tab-button');
  const tabContents = $('.tab-content');
  const len = btns.length;

  btns.removeClass('orange');
  tabContents.removeClass('show');
  for (i = 0; i < len; i++) {
    if (event.target === btns[i]) {
      btns.eq(i).addClass('orange');
      tabContents.eq(i).addClass('show');
      break;
    }
  }
}
const shirt = [100, 95, 90, 85, 80];
const pants = [32, 30, 28];
$('.productSelect').on('change', sizeSelectControl);
function sizeSelectControl() {
  const size = $('.sizeSelect');
  size.html('');
  if (this.value == '셔츠') {
    size.removeClass('hidden');

    shirt.forEach(function (item) {
      size.append(`<option>${item}</option>`);
    });
    // for (i = 0; i < shirt.length; i++) {
    //   size.append(`<option>${shirt[i]}</option>`);
    // }
  } else if (this.value == '바지') {
    size.removeClass('hidden');
    for (i = 0; i < pants.length; i++) {
      size.append(`<option>${pants[i]}</option>`);
    }
  } else {
    size.addClass('hidden');
  }
}

const basicBtn = $('.basic-btn');
basicBtn.on('click', toBasicTab);
function toBasicTab() {
  $.get('http://127.0.0.1:3000/basic.html')
    .done(function (data) {
      console.log(data);
      location.href = 'http://127.0.0.1:3000/basic.html';
    })
    .fail(function () {
      console.log('실패요');
    });
}
