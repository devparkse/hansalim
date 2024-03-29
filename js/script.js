// html 요소를 참조하는 법
// html 요소 및 이미지, 동영상, 사운드 등
// 모든 요소가 갖추어지면 실행하도록 한다.
// window.onload = function () {} 은 한번만 작성한다.
window.onload = function () {
  AOS.init();

  // 모달창
  let body = document.querySelector("body");
  let modal = document.querySelector(".modal");
  modal.addEventListener("click", function () {
    // modal.style.display = "none";
    // fadeOut(modal);
    anime({
      targets: ".modal",
      // delay: 200,
      duration: 500,
      opacity: 0,
      easing: "easeInOutQuad",
      complete: function () {
        modal.style.display = "none";
        body.classList.add("active");
      },
    });
  });

  // 콤마 기능
  function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  // 펼침목록들 보기 기능
  // 더보기 목록 기능
  const menuBt = document.getElementById("menu-bt");
  const menuList = document.getElementById("menu-list");
  // 참여 목록 기능
  const joinBt = document.getElementById("join-bt");
  const joinList = document.getElementById("join-list");
  // 조합원센터 목록 기능
  const centerBt = document.getElementById("center-bt");
  const centerList = document.getElementById("center-list");
  // 배열은 순서번호가 주어진다.
  // 순서번호를 index 라고 호칭한다.
  const toggleListArr = [menuList, joinList, centerList];
  const toggleBtArr = [menuBt, joinBt, centerBt];

  // html 클릭시 펼침목록 모두!!! 닫기
  // 이벤트 명 다음에 할일(콜백함수 - 예 : Hook)
  document.addEventListener("click", function () {
    // for(let i = 0; i < toggleListArr.length; i++) {
    //   toggleListArr[i].style.display = "none";
    // }
    // alert("화면 클릭");
    toggleListArr.forEach(function (item) {
      item.style.display = "none";
    });
  });

  // 목록 전체를 클릭해도 이벤트 전달을 막는다.
  toggleListArr.forEach(function (item) {
    item.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  });

  // 추가 예정 기능 : 아이콘 바꾸기 추가 필요
  function listToggle(버튼, 목록) {
    목록.style.display = "none";
    버튼.addEventListener("click", function (event) {
      // 클릭되었다는 이벤트는 아래로 전달된다.
      // 클릭된 이벤트를 아래로 전달하지 못하도록 막아준다.
      event.stopPropagation();

      // 버튼 초기화
      // 일단 모든 버튼들을 그냥 막~~~ 초기화하자.
      // 선택되었든 말든 그냥 막~~ 초기화해보자.
      // for (let i = 0; i < toggleBtArr.length; i++) {
      //   toggleBtArr[i].classList.remove("active");
      // } <-- 이거보다는 forEach 쓰는걸 추천
      toggleBtArr.forEach(function (item) {
        item.classList.remove("active");
      });

      const nowListId = 목록.getAttribute("id");
      const hideArr = toggleListArr.filter(function (item) {
        let id = item.getAttribute("id");
        if (id !== nowListId) {
          return this; // this는 객체인 item (38번 줄)을 가리킴.
        }
      });

      hideArr.forEach(function (item) {
        // 아래 구문은 동일하다.
        item.style.display = "none";
        // item["style"].display = "none";
        // item["style"]["display"] = "none";
      });

      if (this.tagName === "A") {
        event.preventDefault();
      }
      const css = getComputedStyle(목록).display;
      if (css === "none") {
        목록.style.display = "block";
        // 클래스 강제로 추가하기
        this.classList.add("active");
      } else {
        목록.style.display = "none";
        // 클래스 강제로 삭제하기
        this.classList.remove("active");
      }
    });
  }

  listToggle(menuBt, menuList);
  listToggle(joinBt, joinList);
  listToggle(centerBt, centerList);

  // 위로가기 기능
  // 위로가기 버튼 html 요소를 저장한다.
  // css 를 활용한 선택법
  // 만약 클래스를 활용해서 선택한다면 두가지 방법이 있다.
  // querySelector (1개)
  // querySelectorAll (여러개) : []
  const fixTopBt = document.querySelector(".fix-top");
  // console.log(fixTopBt); 코드 작성했으면 이렇게 확인해주기
  fixTopBt.addEventListener("click", function () {
    // alert("click"); 확인해주기
    // 스크롤바를 최상단으로 이동한다.
    // window.scrollTo(0, 0);  --> 바로 이동

    // window.scrollTo({  --> 부드럽게 이동. 속도조절 안됨
    //   top: 0,
    //   behavior: "smooth"
    // });

    // GSAP(트윈맥스) 버전    --> 부드럽게 이동. 속도조절 가능
    // gsap.to(window, 0.4, {
    //   scrollTo: 0,
    // });

    // Anime.js 버전
    const scrollElement =
      window.document.scrollingElement ||
      window.document.body ||
      window.document.documentElement;
    anime({
      targets: scrollElement,
      scrollTop: 0,
      duration: 1000,
      easing: "easeInOutQuad",
    });
  });

  // 오늘의 상품 기능
  const 제품 = {
    이름: "콩콩크림빵",
    단위: "1개",
    가격: 1500,
    태그: "인기",
    사진: "a.jpg",
    아이디: "0",
    링크: "#",
  };

  let VISUAL_ARR;
  let visualTag = document.getElementById("data-visual");
  // 오늘의 상품 데이터 보관
  let TODAY_GOOD;
  let todayTag = document.getElementById("data-today");
  let todayTag2 = document.getElementById("data-today2");
  // console.log(todayTag);
  let SALE_GOOD;
  let saleTag = document.getElementById("data-sale");
  // console.log(saleTag);
  let NEW_GOOD;
  let newTag = document.getElementById("data-new");
  let newListTag = document.getElementById("data-new-list");

  let RECOMMEND_GOOD;
  let recommendTag = document.getElementById("data-recommend");

  let POPULAR_ICON;
  let popularIconTag = document.getElementById("data-popular-icon");

  let POPULAR_GOOD;
  let popularShow = 0; // 목록 중 0번을 보여준다.
  let popularTag = document.getElementById("data-popular");

  let BANNER_ARR;
  let bannerTag = document.getElementById("data-banner");

  let BRAND_ARR;
  let brandTag = document.getElementById("data-brand");

  let REVIEW_ARR;
  let reviewTag = document.getElementById("data-review");

  let NOTICE_ARR;
  let noticeTag = document.getElementById("data-notice");

  let GOODNEWS_ARR;
  let goodNewsTag = document.getElementById("data-goodnews");

  let SEASON_ARR;
  let seasonTag = document.getElementById("data-season");

  // 비주얼 화면 출력 기능
  function showVisual() {
    let html = "";
    // 데이터 출력
    VISUAL_ARR.forEach(function (item) {
      const tag = `
      <div class="swiper-slide">
        <div class="visual-slide-page">
          <a href="${item.link}">
            <img src="images/${item.pic}" alt="${item.name}" />
          </a>
        </div>
      </div>
      `;
      html += tag;
    });
    visualTag.innerHTML = html;

    // 비주얼 슬라이드 기능
    const swVisual = new Swiper(".sw-visual", {
      loop: true,
      navigation: {
        prevEl: ".visual-prev",
        nextEl: ".visual-next",
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".visual-pg",
        type: "fraction",
      },
    });
    // 비주얼 슬라이드 멈춤 기능
    const swVisualPlay = document.querySelector(".visual-play");
    swVisualPlay.addEventListener("click", function () {
      // 현재 active 클래스가 있는지 없는지 판단하고
      // 기능을 설정한다.
      if (swVisualPlay.classList.contains("active")) {
        // 새로 시작
        swVisual.autoplay.start();
        swVisualPlay.classList.remove("active");
      } else {
        swVisual.autoplay.stop();
        swVisualPlay.classList.add("active");
      }
    });
  }
  // 오늘의 상품 화면 출력 기능
  function showTodayGood() {
    // console.log(TODAY_GOOD);
    let htmlTop = "";
    let htmlBottom = "";
    // TODAY_GOOD.forEach(function (item) {
    //   // console.log(item);
    //   let tag = `
    //   <div class="good-box">
    //   <!-- 제품이미지 -->
    //   <a href="${item.link}" class="good-img">
    //     <img src="images/${item.pic}" alt="${item.name}" />
    //     <span class="good-type"${item.tag}</span>
    //   </a>
    //   <!-- 제품정보 -->
    //   <a href="${item.link}" class="good-info">
    //     <em>${item.name}</em></em>(<em>${item.unit}</em>)
    //   </a>
    //   <!-- 제품가격 -->
    //   <a href="${item.link}" class="good-info-price">${item.price}<em>원</em></a>
    //   <button class="good-add-cart"></button>
    //   </div>
    //   `;
    //   // console.log(tag);
    //   // html = html + tag;
    //   html += tag;
    // });
    // console.log(html);

    // 조건에 맞는 배열 만들기
    // 인덱스 0~3 까지 배열 만들기
    const topArr = TODAY_GOOD.filter(function (item, index) {
      // console.log(item, index);
      if (index < 4) {
        return item;
      }
    });
    // console.log(topArr);
    // htmlTop 생성하기
    topArr.forEach(function (item) {
      let tag = `
      <div class="good-box">
      <!-- 제품이미지 -->
      <a href="${item.link}" class="good-img">
        <img src="images/${item.pic}" alt="${item.name}" />
        <span class="good-type">${item.tag}</span>
      </a>
      <!-- 제품정보 -->
      <a href="${item.link}" class="good-info">
        <em>${item.name}</em></em>(<em>${item.unit}</em>)
      </a>
      <!-- 제품가격 -->
      <a href="${item.link}" class="good-info-price">${priceToString(
        item.price
      )}<em>원</em></a>
      <button class="good-add-cart"></button>
      </div>
      `;

      htmlTop += tag;
    });
    // 인덱스 4~7 까지 배열 만들기
    const bottomArr = TODAY_GOOD.filter(function (item, index) {
      // console.log(item, index);
      if (index > 3) {
        return item;
      }
    });
    // console.log(bottomArr);
    // htmlBottom 생성하기
    bottomArr.forEach(function (item) {
      let tag = `
      <div class="good-box">
      <!-- 제품이미지 -->
      <a href="${item.link}" class="good-img">
        <img src="images/${item.pic}" alt="${item.name}" />
        <span class="good-type">${item.tag}</span>
      </a>
      <!-- 제품정보 -->
      <a href="${item.link}" class="good-info">
        <em>${item.name}</em></em>(<em>${item.unit}</em>)
      </a>
      <!-- 제품가격 -->
      <a href="${item.link}" class="good-info-price">${priceToString(
        item.price
      )}<em>원</em></a>
      <button class="good-add-cart"></button>
      </div>
      `;

      htmlBottom += tag;
    });

    todayTag.innerHTML = htmlTop;
    todayTag2.innerHTML = htmlBottom;
  }
  // 알뜰 상품 화면 출력 기능
  function showSaleGood() {
    // console.log(SALE_GOOD);
    let html = `
    <div class="swiper sw-sale">
      <div class="swiper-wrapper">
    `;
    SALE_GOOD.forEach(function (item) {
      // console.log(item);
      let tag = `
      <div class="swiper-slide">
        <div class="good-box">
          <!-- 제품이미지 -->
          <a href="${item.link}" class="good-img">
            <img src="images/${item.pic}" alt="${item.name}" />
            <span class="good-type">${item.tag}</span>
          </a>
          <!-- 제품정보 -->
          <a href="${item.link}" class="good-info">
            <em>${item.name}</em></em>(<em>${item.unit}</em>)
          </a>
          <!-- 제품가격 -->
          <a href="${item.link}" class="good-info-price">${priceToString(
        item.price
      )}<em>원</em></a>
          <button class="good-add-cart"></button>
        </div>
      </div>
      `;
      // console.log(tag);
      html += tag;
    });
    html += `
      </div>
    </div>
    `;
    saleTag.innerHTML = html;

    const swSale = new Swiper(".sw-sale", {
      slidesPerView: 3,
      spaceBetween: 16,
      slidesPerGroup: 3,
      navigation: {
        prevEl: ".sale .slide-prev",
        nextEl: ".sale .slide-next",
      },
      pagination: {
        el: ".sale .slide-pg",
        type: "fraction",
      },
    });
  }
  // 신상품 화면 출력 기능
  function showNewGood() {
    // 첫번째 출력 자료
    let obj = NEW_GOOD[0];
    let newGoodFirst = `
    <a href="${obj.link}" class="new-img">
      <img src="images/${obj.pic}" alt="${obj.title}" />
    </a>
    <a href="${obj.link}" class="new-title">${obj.title}</a>
    <a href="${obj.link}" class="new-txt">${obj.txt}</a>
    `;
    newTag.innerHTML = newGoodFirst;
    // 나머지 출력 1~4번
    let html = "";
    NEW_GOOD.forEach(function (item, index) {
      let tag = "";
      // 0 번은 출력했으므로
      if (index !== 0) {
        tag = `
        <div class="new-box">
          <a href="${item.link}" class="new-box-img">
            <img src="images/${item.pic}" alt="${item.title}" />
          </a>
          <a href="${item.link}" class="new-box-title">
          ${item.title}</a>
        </div>
        `;
      }
      html += tag;
    });

    newListTag.innerHTML = html;
  }
  // 추천 상품 화면 출력 기능
  function showRecommendGood() {
    let html = `
    <div class="swiper sw-recommend">
      <div class="swiper-wrapper">
    `;
    RECOMMEND_GOOD.forEach(function (item) {
      let tag = `
      <div class="swiper-slide">
        <div class="good-box">
          <!-- 제품이미지 -->
          <a href="${item.link}" class="good-img">
            <img src="images/${item.pic}" alt="${item.name}" />
            <span class="good-type">${item.tag}</span>
          </a>
          <!-- 제품정보 -->
          <a href="${item.link}" class="good-info">
            <em>${item.name}</em>(<em>${item.unit}</em>)
          </a>
          <!-- 제품가격 -->
          <a href="${item.link}" class="good-info-price">${priceToString(
        item.price
      )}<em>원</em></a>
          <button class="good-add-cart"></button>
        </div>
      </div>
      `;
      html += tag;
    });
    html += `
      </div>
    </div>
    `;

    recommendTag.innerHTML = html;

    const swRecommend = new Swiper(".sw-recommend", {
      slidesPerView: 3,
      spaceBetween: 16,
      slidesPerGroup: 3,
      navigation: {
        prevEl: ".recommend .slide-prev",
        nextEl: ".recommend .slide-next",
      },
      pagination: {
        el: ".recommend .slide-pg",
        type: "fraction",
      },
    });

    // 만약에 목록의 개수가 slidesPerView 보다 적으면
    // 1 / 1 출력한다.
    // 0 / 0
    // .recommend .slide-pg 글자를 출력
    const sg = document.querySelector(".recommend .slide-pg");
    sg.style.display = "block";

    if (RECOMMEND_GOOD.length == 0) {
      sg.innerHTML = "0/0";
    } else if (RECOMMEND_GOOD.length < swRecommend.params.slidesPerView) {
      sg.innerHTML = "1/1";
    }
  }
  // 인기 상품 아이콘 출력 기능
  function showPopularIconGood() {
    let html = `
    <div class="swiper sw-icon">
      <div class="swiper-wrapper">
    `;
    // 데이터 처리
    POPULAR_ICON.forEach(function (item) {
      const tag = `
        <div class="swiper-slide">
          <a href="${item.link}">
            <span
              class="popular-cate-icon"
              style="
                background: url('images/${item.icon}') no-repeat;
                background-position: 0px 0px;
              "
            ></span>
            <span class="popular-cate-name">${item.txt}</span>
          </a>
        </div>
      `;

      html += tag;
    });

    html += `
      </div>
    </div>
    `;

    // html 이 화면에 배치되고 나야 js로 참조할 수 있다.
    popularIconTag.innerHTML = html;

    const swIcon = new Swiper(".sw-icon", {
      slidesPerView: 7,
      slidesPerGroup: 7,
      spaceBetween: 10,
      navigation: {
        nextEl: ".popular-slide-next",
        prevEl: ".popular-slide-prev",
      },
    });

    // html 에 배치가 되었으면 찾을 수 있다.
    // a 태그 14개를 찾아야 하는데 그래서
    // querySelector 가 아닌 querySelectorAll 을 이용했다.
    // querySelectorAll 은 배열 즉 [] 를 리턴한다.
    const tag = document.querySelectorAll(".popular-slide a");
    //찾아서 저장을 한 배열의 각 a 태그에 기능을 준다.
    // forEach 가 for 문 보다 적용하기가 수월하다.
    tag.forEach(function (item, index) {
      // 현재 item 에는 a 태그가 하나씩 순차적으로 대입된다.
      // mouseover, mouseout 을 콜백 적용한다.
      item.addEventListener("mouseover", function () {
        // a 태그의 내부의 아이콘 클래스 즉, popular-cate-icon 을 찾는다.
        const spanTag = this.querySelector(".popular-cate-icon");
        // style 변경한다.
        spanTag.style.backgroundPositionY = "-64px";
      });
      item.addEventListener("mouseout", function () {
        // a 태그의 내부의 아이콘 클래스 즉, popular-cate-icon 을 찾는다.
        const spanTag = this.querySelector(".popular-cate-icon");
        // style 변경한다.
        spanTag.style.backgroundPositionY = "0px";
      });

      // 클릭(item)을 하면 버튼(.popular-more) 의 글자를
      // 클릭된 타이틀의 글자로 변경한다.
      item.addEventListener("click", function (event) {
        // a 태그이므로 href 가 적용된다.
        // 웹브라우저 갱신되므로 UI를 위해서 막아야 한다.
        event.preventDefault();
        const bt = document.querySelector(".popular-more");
        const title = this.querySelector(".popular-cate-name");
        // console.log(title.innerHTML);
        // bt.innerHTML = title.innerHTML + " 물품 더보기";
        bt.innerHTML = `${title.innerHTML} 물품 더보기`;

        // 하단의 목록을 갱신한다.
        // 현재 클릭된 번호를 popularShow 에 담는다.
        popularShow = index;
        showPopularGood();
      });
    });
  }
  // 인기 상품 화면 출력 기능
  function showPopularGood() {
    let html = "";
    let popCate = "populargood-" + (popularShow + 1);
    // console.log(POPULAR_GOOD[popCate]);
    POPULAR_GOOD[popCate].forEach(function (item) {
      let tag = `
        <div class="good-box">
          <!-- 제품이미지 -->
          <a href="${item.link}" class="good-img">
            <img src="images/${item.pic}" alt="${item.name}" />
            <span class="good-type">${item.tag}</span>
          </a>
          <!-- 제품정보 -->
          <a href="${item.link}" class="good-info">
            <em>${item.name}</em>(<em>${item.unit}</em>)
          </a>
          <!-- 제품가격 -->
          <a href="${item.link}" class="good-info-price">${priceToString(
        item.price
      )}<em>원</em></a>
          <!-- 장바구니 -->
          <button class="good-add-cart"></button>
        </div>
      `;
      html += tag;
    });
    popularTag.innerHTML = html;
  }
  // 배너 화면 출력 기능
  function showBanner() {
    let html = `
    <div class="swiper sw-banner">
      <div class="swiper-wrapper">
    `;

    BANNER_ARR.forEach(function (item) {
      let tag = `
      <div class="swiper-slide">
        <a href="${item.link}">
          <img src="images/${item.image}" alt="${item.title}" />
        </a>
      </div>
      `;
      html += tag;
    });
    html += `
      </div>
    </div>
    `;

    bannerTag.innerHTML = html;
    const swBanner = new Swiper(".sw-banner", {
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      slidesPerView: 2,
      spaceBetween: 0,
      navigation: {
        prevEl: ".banner-slide-prev",
        nextEl: ".banner-slide-next",
      },
    });
  }
  // 브랜드 화면 출력 기능
  function showBrand() {
    let html = `
    <div class="swiper sw-brand">
      <div class="swiper-wrapper">
    `;

    BRAND_ARR.forEach(function (item) {
      const tag = `
      <div class="swiper-slide">
        <div class="brand-box">
          <a href="${item.link}">
            <img src="images/${item.image}" alt="${item.id}" />
            <p>${item.title}</p>
            <ul class="brand-info clearfix">
              <li>
                <span class="brand-info-title">${item.infotitle}</span>
                <span class="brand-info-value">${item.infovalue}</span>
                </li>
              <li>
                <span class="brand-info-title">${item.infotitle2}</span>
                <span class="brand-info-value">${item.infovalue2}</span>
              </li>
            </ul>
          </a>
        </div>
      </div>
      `;
      html += tag;
    });
    html += `
      </div>
    </div>
    `;

    brandTag.innerHTML = html;
    const swBrand = new Swiper(".sw-brand", {
      slidesPerView: 3,
      spaceBetween: 16,
      slidesPerGroup: 3,
      navigation: {
        prevEl: ".brand .slide-prev",
        nextEl: ".brand .slide-next",
      },
      pagination: {
        el: ".brand .slide-pg",
        type: "fraction",
      },
    });
  }
  // 이용후기 화면 출력 기능
  function showReview() {
    let html = `
    <div class="swiper sw-review">
      <div class="swiper-wrapper">    
    `;
    // 데이터 처리
    REVIEW_ARR.forEach(function (item) {
      const tag = `
      <div class="swiper-slide">
        <div class="review-box">
          <a href="${item.link}">
            <div class="review-box-desc">
              <span class="review-box-title">
              ${item.title}
              </span>
              <span class="review-box-star"> ${item.star} </span>
              <span class="review-box-img">
                <img src="images/${item.pic}" alt="${item.title}" />
              </span>
            </div>
            <p class="review-box-txt">
            ${item.txt}
            </p>
            <span class="review-box-user">${item.user}(${item.shop})</span>
          </a>
        </div>
      </div>
      `;
      html += tag;
    });
    html += `
      </div>
    </div>
    `;

    reviewTag.innerHTML = html;
    const swReview = new Swiper(".sw-review", {
      slidesPerView: 3,
      spaceBetween: 16,
      slidesPerGroup: 3,
      navigation: {
        prevEl: ".review .slide-prev",
        nextEl: ".review .slide-next",
      },
      pagination: {
        el: ".review .slide-pg",
        type: "fraction",
      },
    });
  }
  // 공지사항 화면 출력 기능
  function showNotice() {
    let html = "";
    // 데이터 갱신
    NOTICE_ARR.forEach(function (item) {
      const tag = `
      <li>
        <a href="${item.link}">
          <span>${item.title}</span><em>${item.date}</em>
        </a>
      </li>
      `;
      html += tag;
    });
    noticeTag.innerHTML = html;
  }
  // 물품소식 화면 출력 기능
  function showGoodNews() {
    let html = "";
    // 데이터 처리
    GOODNEWS_ARR.forEach(function (item) {
      const tag = `
      <li>
        <a href="${item.link}">
          <span>${item.title}</span><em>${item.date}</em>
        </a>
      </li>
      `;
      html += tag;
    });
    goodNewsTag.innerHTML = html;
  }
  // 시즌 화면 출력 기능
  const buyTotal = document.getElementById("buy-total");
  const buyTotalMoney = document.getElementById("buy-total-money");
  let buyTotalCount = 0;
  let buyTotalMoneyPrice = 0;

  function showSeason() {
    let html = "";
    // 데이터 처리
    SEASON_ARR.forEach(function (item, index) {
      const tag = `
      <li>
        <div class="season-good clearfix">
          <input
            type="checkbox"
            id="ch${index}"
            class="season-good-check season-item"
            checked
            value=${item.price}
          />
          <label for="ch${index}" class="season-label"> ${item.title} </label>
          <a href="${item.link}" class="season-good-img">
            <img src="images/${item.pic}" alt="${item.title}" />
          </a>
          <p class="season-good-info">
            <a href="${item.link}" class="season-good-title">${item.title}</a>
            <a href="${
              item.link
            }" class="season-good-price"><em>${priceToString(
        item.price
      )}</em>원</a>
          </p>
        </div>
      </li>
      `;
      html += tag;
    });
    seasonTag.innerHTML = html;

    // Smooth Scrollbar 적용
    Scrollbar.initAll();
    // 체크박스 각각의 기능
    checkBoxFn();
    // 계산 출력하라.
    showBuyGood();
  }

  // 전체 체크박스 기능
  const chkAll = document.getElementById("chall");
  chkAll.addEventListener("change", function () {
    const chkArr = document.querySelectorAll(".season-item");

    if (chkAll.checked) {
      // 전체 체크를 해야 하는 경우
      chkArr.forEach(function (item) {
        item.checked = true;
      });
    } else {
      // 전체 체크를 해제 해야 하는 경우
      chkArr.forEach(function (item) {
        item.checked = false;
      });
    }

    showBuyGood();
  });

  // 체크박스 각각의 기능
  function checkBoxFn() {
    const chkArr = document.querySelectorAll(".season-item");
    chkArr.forEach(function (item) {
      item.addEventListener("change", function () {
        // console.log("go");
        // 가격을 다시 계산한다.
        showBuyGood();
      });
    });
  }

  //계산 출력 기능
  function showBuyGood() {
    // 체크가 된 카운팅을 한다. 그리고 더한다.
    let count = 0;
    let priceTotal = 0;

    const chkArr = document.querySelectorAll(".season-item");
    chkArr.forEach(function (item) {
      // forEach 안에서 갯수 뽑아내기
      const state = item.checked;
      if (state) {
        // count = count + 1;
        count += 1;
        // count ++;

        // forEach 안에서 가격 뽑아내기
        // 글자를 정수 숫자로 변경함.(parseInt 사용)
        const price = parseInt(item.value);
        // priceTotal = priceTotal + price;
        priceTotal += price;
      }
    });

    buyTotalCount = count;
    buyTotalMoneyPrice = priceTotal;

    buyTotal.innerHTML = buyTotalCount;
    buyTotalMoney.innerHTML = priceToString(buyTotalMoneyPrice);

    // 전체 선택 버튼 해제
    if (buyTotalCount === chkArr.length) {
      // 전체 체크 버튼 checked 되어야 함.
      chkAll.checked = true;
    } else {
      // 전체 체크 버튼 checked 해제되어야 함.
      chkAll.checked = false;
    }
  }

  // data.json 을 로딩
  const xhttp = new XMLHttpRequest();
  // 파일이 모두 불러들여졌는지 검사하고
  // State : Response 불러들이고 있는 상태
  xhttp.onreadystatechange = function (event) {
    const req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      // 불러온 데이터 확인해보자.
      // 글자 즉 "" 로 전달이 된다.
      const str = req.response;
      // console.log(str);
      // console.log(typeof str);
      // 글자로 온 데이터를 객체로 변환
      // 글자가 json 규칙대로 만들어진 문자열이다.
      // 그러므로 json 글자를 객체!!!로 변환하여서 활용한다.
      let obj = JSON.parse(str);
      // console.log(obj);
      // console.log(typeof obj);

      VISUAL_ARR = obj.visual;
      TODAY_GOOD = obj.todaygood;
      SALE_GOOD = obj.salegood;
      NEW_GOOD = obj.newgood;
      RECOMMEND_GOOD = obj.recommendgood;
      POPULAR_ICON = obj.popularicon;
      POPULAR_GOOD = obj.populargood;
      BANNER_ARR = obj.banner;
      BRAND_ARR = obj.brand;
      REVIEW_ARR = obj.review;
      NOTICE_ARR = obj.notice;
      GOODNEWS_ARR = obj.goodnews;
      SEASON_ARR = obj.season;

      // 비주얼 화면에 배치한다.
      showVisual();
      // 오늘의 상품을 화면에 배치한다.
      showTodayGood();
      // 할인 상품을 화면에 배치한다.
      showSaleGood();
      // 신상품을 화면에 배치한다.
      showNewGood();
      // 추천 상품을 화면에 배치한다.
      showRecommendGood();
      // 인기 아이콘을 화면에 배치한다.
      showPopularIconGood();
      // 인기 상품을 화면에 배치한다.
      showPopularGood();
      // 배너 목록을 화면에 배치한다.
      showBanner();
      // 브랜드 목록을 화면에 배치한다.
      showBrand();
      // 이용후기 목록을 화면에 배치한다.
      showReview();
      // 공지사항 목록을 화면에 배치한다.
      showNotice();
      // 물품소식 목록을 화면에 배치한다.
      showGoodNews();
      // 시즌 목록을 화면에 배치한다.
      showSeason();
    }
  };

  // 자료를 호출한다.
  console.log("자료를 가져온다. XMLHT...");
  xhttp.open("GET", "data.json");
  // 웹브라우저 기능 실행 요청
  xhttp.send();

  // 커뮤니티 탭 메뉴
  // 탭 버튼
  const tabBtArr = document.querySelectorAll(".community-bt");
  // 탭 내용
  const tabConArr = document.querySelectorAll(".community-notice dd");
  // console.log(tabBtArr, tabConArr);
  // 탭 포커스
  let tabFocusIndex = 0;
  // 탭 버튼 클릭 처리
  tabBtArr.forEach(function (item, index) {
    item.addEventListener("click", function () {
      tabFocusIndex = index;
      tabFocusFn();
    });
  });
  // 탭 포커스 함수를 생성
  function tabFocusFn() {
    // 포커스 css 를 적용 및 제거
    // 일단 모두 제거
    tabBtArr.forEach(function (item) {
      item.classList.remove("community-bt-active");
    });
    // 인덱스에 해당하는 것만 적용.
    tabBtArr[tabFocusIndex].classList.add("community-bt-active");
    // 내용에서 일단 모두 제거
    tabConArr.forEach(function (item) {
      item.classList.remove("community-visible-active");
    });
    tabConArr[tabFocusIndex].classList.add("community-visible-active");
  }

  // 스크롤시 상단 고정 클래스 추가/제거
  const wrap = document.querySelector(".wrap");
  const header = document.querySelector(".header");
  let scy = 0;

  window.addEventListener("scroll", function () {
    scy = this.document.documentElement.scrollTop;
    // console.log(scy);
    if (scy > 0) {
      wrap.classList.add("active");
      header.classList.add("active");
    } else {
      wrap.classList.remove("active");
      header.classList.remove("active");
    }
  });

  // 하단 패밀리 펼침 기능
  // 목록 열기 버튼
  const openBt = document.querySelector(".footer-link");
  // 목록 닫기 버튼
  const closeBt = document.querySelector(".family-close");
  // 보여질 패밀리 목록
  const family = document.querySelector(".family");

  // 스크롤바를 안생기게 하려고 처리
  const community = document.querySelector(".community");
  // 기능처리
  openBt.addEventListener("click", function () {
    family.classList.add("active");
    // openBt.classList.add("active");
    this.classList.add("active");
    community.classList.add("active");
  });
  closeBt.addEventListener("click", function () {
    family.classList.remove("active");
    openBt.classList.remove("active");
    community.classList.remove("active");
  });

  // niceScroll 적용 : jQuery
  // const sgl = $(".season-good-list");
  // sgl.niceScroll({
  //   cursorwidth: "8px",
  //   cursoropacitymax: 0.3,
  // });
  // sgl.mouseover(function () {
  //   sgl.getNiceScroll().resize();
  // });

  // const 로 묶어준게 위에 코드
  // $(".season-good-list").niceScroll({
  //   cursorwidth: "8px",
  //   cursoropacitymax: 0.5,
  // });

  // $(".season-good-list").mouseover(function () {
  //   $(".season-good-list").getNiceScroll().resize();
  // });

  // 전체 메뉴 펼침 기능
  const allMenuArea = document.querySelector(".all-menu-area");
  const allMenu = document.querySelector(".all-menu");
  const cateList = document.querySelector(".cate-list");
  const themeList = document.querySelector(".theme-list");

  allMenuArea.addEventListener("mouseleave", function () {
    allMenu.classList.remove("active");
  });
  cateList.addEventListener("mouseenter", function () {
    allMenu.classList.add("active");
  });
  // cateList.addEventListener("mouseleave", function () {
  //   allMenu.classList.remove("active");
  // });
  themeList.addEventListener("mouseenter", function () {
    allMenu.classList.remove("active");
  });

  // 서브 카테고리 보여주기
  const cateListLis = document.querySelectorAll(".cate-list > li");
  const cateDepth2 = document.querySelectorAll(".cate-depth2-list");
  cateListLis.forEach(function (item, index) {
    item.addEventListener("mouseenter", function () {
      cateDepth2.forEach(function (itemSub, indexSub) {
        itemSub.style.display = "none";
        if (indexSub === index) {
          itemSub.style.display = "block";
        }
      });
    });
  });
};
