$('.tab-button').on('click', tabSelection);
function tabSelection(event) {
  const btns = $('.tab-button');
  const tabContent = $('.tab-content');
  const len = btns.length;

  btns.removeClass('orange');
  tabContent.removeClass('show');
  for (i = 0; i < len; i++) {
    if (event.target === btns[i]) {
      btns.eq(i).addClass('orange');
      tabContent.eq(i).addClass('show');
      break;
    }
  }
}
