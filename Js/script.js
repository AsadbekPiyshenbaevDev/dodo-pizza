var swiper = new Swiper('.swiper', {
  slidesPerView: 6,
  slidesPerGroup: 6,
  spaceBetween: 20,
  direction: getDirection(),
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
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
    },
  },
  on: {
    resize: function () {
      swiper.changeDirection(getDirection());
    },
  },
});

function getDirection() {
  var windowWidth = window.innerWidth;
  var direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';

  return direction;
}

// =============== MAP ================ //


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

let pizza = document.querySelector('.pizza_content');
let cambo = document.querySelector('.kambo_content');
let pizza_box = document.querySelectorAll('.pizza_box');
let pizza_btn = document.querySelectorAll('.pizza_btn');
let pizza_title = document.querySelectorAll('.pizza_title');
let korzina_content = document.querySelector('.korzina_content');
let korzina_content_box = document.querySelector('.korzina_content_box');
let korzina_modal = document.querySelector('.korzina_modal');
let btnKorzina = document.querySelector('.btnKorzina');
let exit = document.querySelector('.exit');
let sum = document.querySelector('.sum');
let count = document.querySelector('.count');
let summa_title = document.querySelector('.summa_title');
let modal_inner = document.querySelector('.modal_inner');
let modal_container = document.querySelector('.modal_container');
let modal_item = document.querySelector('.modal_item');
let modal_exit_btn = document.querySelectorAll('.modal_exit');

btnKorzina.addEventListener('click', (e) => {
  korzina_content.classList.add('show');
  korzina_modal.classList.add("show_modal")
  document.body.style = "overflow: hidden";
})

exit.addEventListener('click', () => {
  korzina_content.classList.remove('show');
  korzina_modal.classList.remove('show_modal');

})
korzina_modal.addEventListener('click', () => {
  korzina_content.classList.remove('show');
  korzina_modal.classList.remove('show_modal');
  document.body.style = "overflow: auto"
})

modal_container.addEventListener('click', () => {
  document.body.style = "overflow: auto";
  modal_container.style.display = "none"
})

modal_inner.addEventListener('click', (e) => {
  document.body.style = "overflow: auto";

  e.stopPropagation()
})
korzina_content.addEventListener('click', (e) => {
  e.stopPropagation()
})




let cart = JSON.parse(localStorage.getItem('data')) || [];

// ============= PIZZA ===============

let renderItem = () => {
  return (
    pizza.innerHTML = pizza_arr
    .map((x) => {
      let {
        id,
        title,
        desc,
        img,
        price
      } = x;
      let search = cart.find((y) => y.id == id) || [];
      return `
      <div class="pizza_box" onclick ="modalBox(${id})">
                    <div class="pizza_box_img">
                        <img src=${img} alt="img">
                    </div>
                    <div class="pizza_box_data">
                        <a href="#">${title}</a>
                        <p>${desc}</p>
                        <div class="pizza_bottom">
                            <div class="pizza_price_content">
                                <p class="pizza_price">
                                    ${price}
                                </p>
                            </div>
                            <div class="pizza_btn_content">
                                <button onclick = "" class="pizza_btn btn">В корзину</button>
                            </div>
                        </div>
                    </div>
                    
                </div>
      `
    })
    .join("")
  )
}
renderItem()
let modalBox = (item) => {
  modal_container.style.display = 'flex';
  document.body.style = "overflow: hidden";

  return (
    modal_inner.innerHTML = pizza_arr
    .map((x) => {
      let {
        id,
        img,
        price,
        desc,
        title
      } = x;
      if (id === item) {
        return `
    <div class="modal_item">
        <div class="modal_left">
            <img src= ${img} alt="img"/>
        </div>
        <div class="modal_right">
          <div class="modal_right_data">
            <h3>${title}</h3>
            <p>${desc}</p>
          </div>
          <div class="modal_right_button">
              <button onclick="modalBtn(${id})">Добавить в корзину за ${price} сум</button>
          </div>
        </div>
        <div class='modal_exit'>
            <button onclick = "exitModal()">&times</button>     
        </div>
    </div>
  `
      }
    }).join(" ")

  )
}
let calculation = () => {
  let cal = cart.map((x) => x.item).reduce((x, y) => x + y, 0);
  let amount = cart
    .map((x) => {
      let {
        id,
        item
      } = x;
      let filterData = pizza_arr.find((x) => x.id === id);
      return parseFloat(filterData.price) * item * 1000;
    })
    .reduce((x, y) => x + y, 0);
  cart.length ? sum.innerHTML = cal : sum.innerHTML = "";
  cart.length ? summa_title.innerHTML = `${cal} товаров на   ${amount} сум ` : ""

}
calculation()
let renderCart = () => {
  if (cart.length !== 0) {
    return (
      korzina_content_box.innerHTML = cart
      .map((x) => {
        let {
          id,
          item
        } = x;
        let search1 = pizza_arr.find((y) => y.id === id) || [];
        let {
          price,
          img,
          desc,
          title
        } = search1;
        return `
          <div class="pizza_box_cart">
            <div class="pizza_box_content_cart">
              <div class="pizza_box_img_cart">
                 <img src=${img} alt="img">
              </div>
              <div class="pizza_box_data_cart">
                <a href="#">${title}</a>
                <p>${desc}</p>
              </div>
              <div class="pizza_btn_content_exit">
                  <p onclick="removeItem(${id})">&times</p>
              </div>
            </div>
            <div class="pizza_bottom_cart">
              <div class="pizza_price_content_cart">
                <p class="pizza_price_cart">
                    ${price}
                </p>
              </div>
              <div class="pizza_btn_content_cart">
                <button onclick = "decrement(${id})" class="dec btn">-</button>
                <div class="count">${item}</div>
                <button onclick = "increment(${id})" class="inc btn">+</button>
              </div>
            </div>
          </div>
        `
      })
      .join("")
    )
  } else {
    return (
      korzina_content_box.innerHTML = `
      <div class="cart_content">
        <div class="cart_box">
          <img src="./img/cart/pusto.svg" alt="img" />
          <h3>Ой, пусто!</h3>
          <p>Ваша корзина пуста, откройте «Меню»
          и выберите понравившийся товар.
          Мы доставим ваш заказ от 45 000 сум</p>
        </div>
      </div>
      `
    )
  }
}
renderCart();

// =============== KAMBO ==================

let renderCambo = () => {
  return (
    cambo.innerHTML = cambo_arr
    .map((x) => {
      let {
        id,
        title,
        desc,
        img,
        price,
        skidka
      } = x;
      let searchCambo = cart.find((y) => y.id == id) || [];
      return `
      <div class="pizza_box" onclick ="modalCambo(${id})">
                    <div class="pizza_box_img">
                        <img src=${img} alt="img">
                    </div>
                    <div class="pizza_box_data">
                        <a href="#">${title}</a>
                        <p>${desc}</p>
                        <div class="pizza_bottom">
                            <div class="pizza_price_content">
                                <p class="pizza_price">
                                    ${price}
                                </p>
                            </div>
                            <div class="pizza_btn_content">
                                <button onclick = "" class="pizza_btn btn">В корзину</button>
                            </div>
                        </div>
                    </div>
                    
                </div>
      `
    })
    .join("")
  )
}
renderCambo()
let modalCambo = (item) => {
  modal_container.style.display = 'flex';
  document.body.style = "overflow: hidden";

  return (
    modal_inner.innerHTML = cambo_arr
    .map((x) => {
      let {
        id,
        img,
        price,
        desc,
        title,
        skidka
      } = x;
      if (id === item) {
        return `
    <div class="modal_item">
        <div class="modal_left">
            <img src= ${img} alt="img"/>
        </div>
        <div class="modal_right">
          <div class="modal_right_data">
            <h3>${title}</h3>
            <p>${desc}</p>
          </div>
          <div class="modal_right_button">
              <button onclick="modalBtn(${id})">Добавить в корзину за ${price} сум</button>
          </div>
        </div>
        <div class='modal_exit'>
            <button onclick = "exitModal()">&times</button>     
        </div>
    </div>
  `
      }
    }).join(" ")

  )
}
let calculationCambo = () => {
  let calCambo = cart.map((x) => x.item).reduce((x, y) => x + y, 0);
  let amountCambo = cart
    .map((x) => {
      let {
        id,
        item
      } = x;
      let filterDataCambo = cambo_arr.find((x) => x.id === id);
      return parseFloat(filterDataCambo.price) * item * 1000;
    })
    .reduce((x, y) => x + y, 0);
  localStorage.setItem("data", JSON.stringify(amountCambo))
  cart.length ? sum.innerHTML = cal : sum.innerHTML = "";
  cart.length ? summa_title.innerHTML = `${cal} товаров на   ${amount} сум ` : ""

}
calculationCambo()
let renderCartCambo = () => {
  if (cart.length !== 0) {
    return (
      korzina_content_box.innerHTML = cart
      .map((x) => {
        let {
          id,
          item
        } = x;
        let search1Cambo = pizza_arr.find((y) => y.id === id) || [];
        let {
          price,
          img,
          desc,
          title,
          skidka
        } = search1Cambo;
        return `
          <div class="pizza_box_cart">
            <div class="pizza_box_content_cart">
              <div class="pizza_box_img_cart">
                 <img src=${img} alt="img">
              </div>
              <div class="pizza_box_data_cart">
                <a href="#">${title}</a>
                <p>${desc}</p>
              </div>
              <div class="pizza_btn_content_exit">
                  <p onclick="removeItem(${id})">&times</p>
              </div>
            </div>
            <div class="pizza_bottom_cart">
              <div class="pizza_price_content_cart">
                <p class="pizza_price_cart">
                    ${price}
                </p>
              </div>
              <div class="pizza_btn_content_cart">
                <button onclick = "decrement(${id})" class="dec btn">-</button>
                <div class="count">${item}</div>
                <button onclick = "increment(${id})" class="inc btn">+</button>
              </div>
            </div>
          </div>
        `
      })
      .join("")
    )
  } else {
    return (
      korzina_content_box.innerHTML = `
      <div class="cart_content">
        <div class="cart_box">
          <img src="./img/cart/pusto.svg" alt="img" />
          <h3>Ой, пусто!</h3>
          <p>Ваша корзина пуста, откройте «Меню»
          и выберите понравившийся товар.
          Мы доставим ваш заказ от 45 000 сум</p>
        </div>
      </div>
      `
    )
  }
}
renderCartCambo();


// ========================================
let increment = (id) => {
  let selectItem = id;
  let search = cart.find((x) => x.id === selectItem);
  if (search === undefined) {
    cart.push({
      id: selectItem,
      item: 1,
    })
  } else {
    search.item += 1;
  }

  renderCart();
  renderCartCambo();
  update(selectItem);
  localStorage.setItem("data", JSON.stringify(cart));
}

let decrement = (id) => {
  let searchInc = cart.find((x) => x.id === id);
  // console.log(searchInc);
  if (searchInc === undefined) return
  else if (searchInc.item === 0) return
  else {
    searchInc.item -= 1;
  }
  update(id)
  cart = cart.filter((x) => x.item !== 0);
  renderCart();
  renderCartCambo();
  localStorage.setItem("data", JSON.stringify(cart))
}


let update = (id) => {
  let up = cart.find((x) => x.id === id);
  calculation();
  calculationCambo();
  removeItem()

};


let removeItem = (id) => {
  cart = cart.filter((x) => x.id !== id);
  calculation();
  calculationCambo();
  renderCartCambo();
  renderCart();
  localStorage.setItem("data", JSON.stringify(cart))
}

let exitModal = () => {
  modal_container.style.display = "none";
}
let modalBtn = (id) => {
  modal_container.style.display = "none";
  increment(id)
}