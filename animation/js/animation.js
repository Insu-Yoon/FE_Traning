$(window).on('scroll', animation);
const card = $('.card-box');
function animation() {
  const scroll = $(this).scrollTop();
  const marginPerCard = parseInt(
    $('.card-box img').css('margin-top').replaceAll('px', '')
  );
  const backgroundMargin = parseInt(
    $('.card-background').css('margin-top').replaceAll('px', '')
  );
  const cardHeight = $('.card-box').height();
  const defaultMargin = backgroundMargin - marginPerCard;

  for (i = 1; i < card.length + 1; i++) {
    let opacity =
      (defaultMargin + (marginPerCard + cardHeight) * i - scroll) / cardHeight;
    let a = -0.1 / cardHeight;
    let b =
      1 -
      a *
        (defaultMargin +
          marginPerCard +
          (marginPerCard + cardHeight) * (i - 1));
    let scale = a * scroll + b;
    if (scroll > backgroundMargin + (marginPerCard + cardHeight) * (i - 1)) {
      card.eq(i - 1).css('opacity', opacity);
      card.eq(i - 1).css('transform', `scale(${scale})`);
    }
  }
}
