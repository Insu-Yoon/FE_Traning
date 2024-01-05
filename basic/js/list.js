const row = $('.container .row');
let count = 0;

// 기본 상품 로드
moreProduct(products);
// 더보기 클릭시 추가로드
$('#more').on('click', getMore);
function getMore() {
  //더보기 클릭 카운트 반영
  count++;
  let URL = 'https://codingapple1.github.io/js/more1.json';
  if (count == 2) URL = 'https://codingapple1.github.io/js/more2.json';
  //url에 get요청 보내고 받아온 데이터 products에 추가(정렬용)
  $.get(URL).done((data) => {
    data.forEach((item) => products.push(item));
    moreProduct(data);
  });
  //더보기 2번 눌렀으면 비활성화
  if (count == 2) {
    const moreBtn = $('#more');
    moreBtn.attr('disabled', true);
    moreBtn.html('더 불러올 상품이 없습니다.');
  }
}
// 상품 받아와서 목록 만들기
function moreProduct(data) {
  //받아온 목록만큼 추가
  data.forEach((product) => {
    row.append(
      `<div class="col-sm-4">
      <img src="https://via.placeholder.com/600" class="w-100" />
      <h5>${product.title}</h5><p>${product.price}원</p>
      <button class="buy">구매</button>
      </div>
      `
    );
    //새로 목록 추가할 때 마다 이벤트리스너 달기
    $('.buy').last().on('click', addToCart);
  });
}

const editBtns = $('.container .btn').slice(1, 4);
editBtns.on('click', modifyOrder);
function modifyOrder(event) {
  let editedProducts = [];
  switch (event.target.id) {
    case 'sort-price':
      editedProducts = products.sort((a, b) => a.price - b.price);
      break;
    case 'sort-cba':
      editedProducts = products.sort((a, b) => (a.title < b.title ? 1 : -1));
      break;
    case 'filtering':
      editedProducts = products.filter((a) => a.price <= 60000);
      break;
    default:
      break;
  }
  $('.container .row').html('');
  moreProduct(editedProducts);
}

function addToCart(event) {
  let cart = [];
  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
  }
  const productTitle = $(event.target).siblings('h5').text();

  if (cart.includes(productTitle)) {
    alert('이미 장바구니에 있음');
  } else {
    cart.push(productTitle);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
