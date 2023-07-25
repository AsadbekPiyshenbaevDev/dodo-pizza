"use strict";

var swiper = new Swiper('.swiper', {
  slidesPerView: 6,
  slidesPerGroup: 6,
  spaceBetween: 20,
  direction: getDirection(),
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  breakpoints: {
    400: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    600: {
      slidesPerView: 3,
      spaceBetween: 10
    },
    800: {
      slidesPerView: 4,
      spaceBetween: 10
    },
    950: {
      slidesPerView: 5,
      spaceBetween: 10
    },
    1100: {
      slidesPerView: 6,
      spaceBetween: 10
    }
  },
  on: {
    resize: function resize() {
      swiper.changeDirection(getDirection());
    }
  }
});

function getDirection() {
  var windowWidth = window.innerWidth;
  var direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';
  return direction;
} // =============== MAP ================ //
// ymaps.ready(function () {
//   var myMap = new ymaps.Map('root', {
//       center: [42.452937, 59.623557],
//       zoom: 9
//     }, {
//       searchControlProvider: 'yandex#search'
//     }),
//     // Creating a content layout.
//     MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
//       '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
//     ),
//     myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
//       hintContent: 'A custom placemark icon',
//       balloonContent: 'This is a pretty placemark'
//     }, {
//       /**
//        * Options.
//        * You must specify this type of layout.
//        */
//       iconLayout: 'default#image',
//       // Custom image for the placemark icon.
//       iconImageHref: './logo2.jpg',
//       // The size of the placemark.
//       iconImageSize: [30, 42],
//       /**
//        * The offset of the upper left corner of the icon relative
//        * to its "tail" (the anchor point).
//        */
//       iconImageOffset: [-5, -38]
//     }),
//     myPlacemarkWithContent = new ymaps.Placemark([55.661574, 37.573856], {
//       hintContent: 'A custom placemark icon with contents',
//       balloonContent: 'This one — for Christmas',
//       iconContent: '12'
//     }, {
//       /**
//        * Options.
//        * You must specify this type of layout.
//        */
//       iconLayout: 'default#imageWithContent',
//       // Custom image for the placemark icon.
//       iconImageHref: 'images/ball.png',
//       // The size of the placemark.
//       iconImageSize: [48, 48],
//       /**
//        * The offset of the upper left corner of the icon relative
//        * to its "tail" (the anchor point).
//        */
//       iconImageOffset: [-24, -24],
//       // Offset of the layer with content relative to the layer with the image.
//       iconContentOffset: [15, 15],
//       // Content layout.
//       iconContentLayout: MyIconContentLayout
//     });
//   myMap.geoObjects
//     .add(myPlacemark)
//     .add(myPlacemarkWithContent);
// });


var pizza = document.querySelector('.pizza_content');
var cambo = document.querySelector('.kambo_content');
var pizza_box = document.querySelectorAll('.pizza_box');
var pizza_btn = document.querySelectorAll('.pizza_btn');
var pizza_title = document.querySelectorAll('.pizza_title');
var korzina_content = document.querySelector('.korzina_content');
var korzina_content_box = document.querySelector('.korzina_content_box');
var korzina_modal = document.querySelector('.korzina_modal');
var btnKorzina = document.querySelector('.btnKorzina');
var exit = document.querySelector('.exit');
var sum = document.querySelector('.sum');
var count = document.querySelector('.count');
var summa_title = document.querySelector('.summa_title');
var modal_inner = document.querySelector('.modal_inner');
var modal_container = document.querySelector('.modal_container');
var modal_item = document.querySelector('.modal_item');
var modal_exit_btn = document.querySelectorAll('.modal_exit');
btnKorzina.addEventListener('click', function (e) {
  korzina_content.classList.add('show');
  korzina_modal.classList.add("show_modal");
  document.body.style = "overflow: hidden";
});
exit.addEventListener('click', function () {
  korzina_content.classList.remove('show');
  korzina_modal.classList.remove('show_modal');
});
korzina_modal.addEventListener('click', function () {
  korzina_content.classList.remove('show');
  korzina_modal.classList.remove('show_modal');
  document.body.style = "overflow: auto";
});
modal_container.addEventListener('click', function () {
  document.body.style = "overflow: auto";
  modal_container.style.display = "none";
});
modal_inner.addEventListener('click', function (e) {
  document.body.style = "overflow: auto";
  e.stopPropagation();
});
korzina_content.addEventListener('click', function (e) {
  e.stopPropagation();
});
var cart = JSON.parse(localStorage.getItem('data')) || []; // ============= PIZZA ===============

var renderItem = function renderItem() {
  return pizza.innerHTML = pizza_arr.map(function (x) {
    var id = x.id,
        title = x.title,
        desc = x.desc,
        img = x.img,
        price = x.price;
    var search = cart.find(function (y) {
      return y.id == id;
    }) || [];
    return "\n      <div class=\"pizza_box\" onclick =\"modalBox(".concat(id, ")\">\n                    <div class=\"pizza_box_img\">\n                        <img src=").concat(img, " alt=\"img\">\n                    </div>\n                    <div class=\"pizza_box_data\">\n                        <a href=\"#\">").concat(title, "</a>\n                        <p>").concat(desc, "</p>\n                        <div class=\"pizza_bottom\">\n                            <div class=\"pizza_price_content\">\n                                <p class=\"pizza_price\">\n                                    ").concat(price, "\n                                </p>\n                            </div>\n                            <div class=\"pizza_btn_content\">\n                                <button onclick = \"\" class=\"pizza_btn btn\">\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0443</button>\n                            </div>\n                        </div>\n                    </div>\n                    \n                </div>\n      ");
  }).join("");
};

renderItem();

var modalBox = function modalBox(item) {
  modal_container.style.display = 'flex';
  document.body.style = "overflow: hidden";
  return modal_inner.innerHTML = pizza_arr.map(function (x) {
    var id = x.id,
        img = x.img,
        price = x.price,
        desc = x.desc,
        title = x.title;

    if (id === item) {
      return "\n    <div class=\"modal_item\">\n        <div class=\"modal_left\">\n            <img src= ".concat(img, " alt=\"img\"/>\n        </div>\n        <div class=\"modal_right\">\n          <div class=\"modal_right_data\">\n            <h3>").concat(title, "</h3>\n            <p>").concat(desc, "</p>\n          </div>\n          <div class=\"modal_right_button\">\n              <button onclick=\"modalBtn(").concat(id, ")\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443 \u0437\u0430 ").concat(price, " \u0441\u0443\u043C</button>\n          </div>\n        </div>\n        <div class='modal_exit'>\n            <button onclick = \"exitModal()\">&times</button>     \n        </div>\n    </div>\n  ");
    }
  }).join(" ");
};

var calculation = function calculation() {
  var cal = cart.map(function (x) {
    return x.item;
  }).reduce(function (x, y) {
    return x + y;
  }, 0);
  var amount = cart.map(function (x) {
    var id = x.id,
        item = x.item;
    var filterData = pizza_arr.find(function (x) {
      return x.id === id;
    });
    return parseFloat(filterData.price) * item * 1000;
  }).reduce(function (x, y) {
    return x + y;
  }, 0);
  cart.length ? sum.innerHTML = cal : sum.innerHTML = "";
  cart.length ? summa_title.innerHTML = "".concat(cal, " \u0442\u043E\u0432\u0430\u0440\u043E\u0432 \u043D\u0430 \u202F ").concat(amount, " \u0441\u0443\u043C ") : "";
};

calculation();

var renderCart = function renderCart() {
  if (cart.length !== 0) {
    return korzina_content_box.innerHTML = cart.map(function (x) {
      var id = x.id,
          item = x.item;
      var search1 = pizza_arr.find(function (y) {
        return y.id === id;
      }) || [];
      var price = search1.price,
          img = search1.img,
          desc = search1.desc,
          title = search1.title;
      return "\n          <div class=\"pizza_box_cart\">\n            <div class=\"pizza_box_content_cart\">\n              <div class=\"pizza_box_img_cart\">\n                 <img src=".concat(img, " alt=\"img\">\n              </div>\n              <div class=\"pizza_box_data_cart\">\n                <a href=\"#\">").concat(title, "</a>\n                <p>").concat(desc, "</p>\n              </div>\n              <div class=\"pizza_btn_content_exit\">\n                  <p onclick=\"removeItem(").concat(id, ")\">&times</p>\n              </div>\n            </div>\n            <div class=\"pizza_bottom_cart\">\n              <div class=\"pizza_price_content_cart\">\n                <p class=\"pizza_price_cart\">\n                    ").concat(price, "\n                </p>\n              </div>\n              <div class=\"pizza_btn_content_cart\">\n                <button onclick = \"decrement(").concat(id, ")\" class=\"dec btn\">-</button>\n                <div class=\"count\">").concat(item, "</div>\n                <button onclick = \"increment(").concat(id, ")\" class=\"inc btn\">+</button>\n              </div>\n            </div>\n          </div>\n        ");
    }).join("");
  } else {
    return korzina_content_box.innerHTML = "\n      <div class=\"cart_content\">\n        <div class=\"cart_box\">\n          <img src=\"./img/cart/pusto.svg\" alt=\"img\" />\n          <h3>\u041E\u0439, \u043F\u0443\u0441\u0442\u043E!</h3>\n          <p>\u0412\u0430\u0448\u0430 \u043A\u043E\u0440\u0437\u0438\u043D\u0430 \u043F\u0443\u0441\u0442\u0430, \u043E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \xAB\u041C\u0435\u043D\u044E\xBB\n          \u0438 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u043E\u043D\u0440\u0430\u0432\u0438\u0432\u0448\u0438\u0439\u0441\u044F \u0442\u043E\u0432\u0430\u0440.\n          \u041C\u044B \u0434\u043E\u0441\u0442\u0430\u0432\u0438\u043C \u0432\u0430\u0448 \u0437\u0430\u043A\u0430\u0437 \u043E\u0442 45 000 \u0441\u0443\u043C</p>\n        </div>\n      </div>\n      ";
  }
};

renderCart(); // =============== KAMBO ==================

var renderCambo = function renderCambo() {
  return cambo.innerHTML = cambo_arr.map(function (x) {
    var id = x.id,
        title = x.title,
        desc = x.desc,
        img = x.img,
        price = x.price,
        skidka = x.skidka;
    var searchCambo = cart.find(function (y) {
      return y.id == id;
    }) || [];
    return "\n      <div class=\"pizza_box\" onclick =\"modalCambo(".concat(id, ")\">\n                    <div class=\"pizza_box_img\">\n                        <img src=").concat(img, " alt=\"img\">\n                    </div>\n                    <div class=\"pizza_box_data\">\n                        <a href=\"#\">").concat(title, "</a>\n                        <p>").concat(desc, "</p>\n                        <div class=\"pizza_bottom\">\n                            <div class=\"pizza_price_content\">\n                                <p class=\"pizza_price\">\n                                    ").concat(price, "\n                                </p>\n                            </div>\n                            <div class=\"pizza_btn_content\">\n                                <button onclick = \"\" class=\"pizza_btn btn\">\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0443</button>\n                            </div>\n                        </div>\n                    </div>\n                    \n                </div>\n      ");
  }).join("");
};

renderCambo();

var modalCambo = function modalCambo(item) {
  modal_container.style.display = 'flex';
  document.body.style = "overflow: hidden";
  return modal_inner.innerHTML = cambo_arr.map(function (x) {
    var id = x.id,
        img = x.img,
        price = x.price,
        desc = x.desc,
        title = x.title,
        skidka = x.skidka;

    if (id === item) {
      return "\n    <div class=\"modal_item\">\n        <div class=\"modal_left\">\n            <img src= ".concat(img, " alt=\"img\"/>\n        </div>\n        <div class=\"modal_right\">\n          <div class=\"modal_right_data\">\n            <h3>").concat(title, "</h3>\n            <p>").concat(desc, "</p>\n          </div>\n          <div class=\"modal_right_button\">\n              <button onclick=\"modalBtn(").concat(id, ")\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443 \u0437\u0430 ").concat(price, " \u0441\u0443\u043C</button>\n          </div>\n        </div>\n        <div class='modal_exit'>\n            <button onclick = \"exitModal()\">&times</button>     \n        </div>\n    </div>\n  ");
    }
  }).join(" ");
};

var calculationCambo = function calculationCambo() {
  var calCambo = cart.map(function (x) {
    return x.item;
  }).reduce(function (x, y) {
    return x + y;
  }, 0);
  var amountCambo = cart.map(function (x) {
    var id = x.id,
        item = x.item;
    var filterDataCambo = cambo_arr.find(function (x) {
      return x.id === id;
    });
    return parseFloat(filterDataCambo.price) * item * 1000;
  }).reduce(function (x, y) {
    return x + y;
  }, 0);
  localStorage.setItem("data", JSON.stringify(amountCambo));
  cart.length ? sum.innerHTML = cal : sum.innerHTML = "";
  cart.length ? summa_title.innerHTML = "".concat(cal, " \u0442\u043E\u0432\u0430\u0440\u043E\u0432 \u043D\u0430 \u202F ").concat(amount, " \u0441\u0443\u043C ") : "";
};

calculationCambo();

var renderCartCambo = function renderCartCambo() {
  if (cart.length !== 0) {
    return korzina_content_box.innerHTML = cart.map(function (x) {
      var id = x.id,
          item = x.item;
      var search1Cambo = pizza_arr.find(function (y) {
        return y.id === id;
      }) || [];
      var price = search1Cambo.price,
          img = search1Cambo.img,
          desc = search1Cambo.desc,
          title = search1Cambo.title,
          skidka = search1Cambo.skidka;
      return "\n          <div class=\"pizza_box_cart\">\n            <div class=\"pizza_box_content_cart\">\n              <div class=\"pizza_box_img_cart\">\n                 <img src=".concat(img, " alt=\"img\">\n              </div>\n              <div class=\"pizza_box_data_cart\">\n                <a href=\"#\">").concat(title, "</a>\n                <p>").concat(desc, "</p>\n              </div>\n              <div class=\"pizza_btn_content_exit\">\n                  <p onclick=\"removeItem(").concat(id, ")\">&times</p>\n              </div>\n            </div>\n            <div class=\"pizza_bottom_cart\">\n              <div class=\"pizza_price_content_cart\">\n                <p class=\"pizza_price_cart\">\n                    ").concat(price, "\n                </p>\n              </div>\n              <div class=\"pizza_btn_content_cart\">\n                <button onclick = \"decrement(").concat(id, ")\" class=\"dec btn\">-</button>\n                <div class=\"count\">").concat(item, "</div>\n                <button onclick = \"increment(").concat(id, ")\" class=\"inc btn\">+</button>\n              </div>\n            </div>\n          </div>\n        ");
    }).join("");
  } else {
    return korzina_content_box.innerHTML = "\n      <div class=\"cart_content\">\n        <div class=\"cart_box\">\n          <img src=\"./img/cart/pusto.svg\" alt=\"img\" />\n          <h3>\u041E\u0439, \u043F\u0443\u0441\u0442\u043E!</h3>\n          <p>\u0412\u0430\u0448\u0430 \u043A\u043E\u0440\u0437\u0438\u043D\u0430 \u043F\u0443\u0441\u0442\u0430, \u043E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \xAB\u041C\u0435\u043D\u044E\xBB\n          \u0438 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u043E\u043D\u0440\u0430\u0432\u0438\u0432\u0448\u0438\u0439\u0441\u044F \u0442\u043E\u0432\u0430\u0440.\n          \u041C\u044B \u0434\u043E\u0441\u0442\u0430\u0432\u0438\u043C \u0432\u0430\u0448 \u0437\u0430\u043A\u0430\u0437 \u043E\u0442 45 000 \u0441\u0443\u043C</p>\n        </div>\n      </div>\n      ";
  }
};

renderCartCambo(); // ========================================

var increment = function increment(id) {
  var selectItem = id;
  var search = cart.find(function (x) {
    return x.id === selectItem;
  });

  if (search === undefined) {
    cart.push({
      id: selectItem,
      item: 1
    });
  } else {
    search.item += 1;
  }

  renderCart();
  renderCartCambo();
  update(selectItem);
  localStorage.setItem("data", JSON.stringify(cart));
};

var decrement = function decrement(id) {
  var searchInc = cart.find(function (x) {
    return x.id === id;
  }); // console.log(searchInc);

  if (searchInc === undefined) return;else if (searchInc.item === 0) return;else {
    searchInc.item -= 1;
  }
  update(id);
  cart = cart.filter(function (x) {
    return x.item !== 0;
  });
  renderCart();
  renderCartCambo();
  localStorage.setItem("data", JSON.stringify(cart));
};

var update = function update(id) {
  var up = cart.find(function (x) {
    return x.id === id;
  });
  calculation();
  calculationCambo();
  removeItem();
};

var removeItem = function removeItem(id) {
  cart = cart.filter(function (x) {
    return x.id !== id;
  });
  calculation();
  calculationCambo();
  renderCartCambo();
  renderCart();
  localStorage.setItem("data", JSON.stringify(cart));
};

var exitModal = function exitModal() {
  modal_container.style.display = "none";
};

var modalBtn = function modalBtn(id) {
  modal_container.style.display = "none";
  increment(id);
};