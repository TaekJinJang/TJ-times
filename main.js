let news = [];
let url;
let page = 1;
let total_pages = 0;
const getNews = async () => {
  try {
    let header = new Headers({
      "x-api-key": "RXXn8l8Gh869EmgoqqCdGYYZf4yaZujLFvBlFgeaTt0",
    });
    url.searchParams.set('page', page);
    console.log(url);
    let response = await fetch(url, { headers: header }); // 데이터보내는방식은 ajax, http, fetch 등이 있음
    let data = await response.json();
    if (response.status == 200) {
      if (data.total_hits == 0) {
        throw new Error ("검색한 내용을 찾을 수 없습니다.");
      }
      news = data.articles;
      total_pages = data.total_pages;
      page = data.page;
      console.log("response=", response);
      console.log("data", data);
      render();
     pagenation();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log("잡힌 에러는", error.message);
    errorRender(error.message);
  }
};

const getLatesNews = async () => {
  url = new URL(
    "https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=5"
  );
  getNews();
};

getLatesNews();
let btnMenus = document.querySelectorAll(".menus button");
btnMenus.forEach((menus) =>
  menus.addEventListener("click", (event) => getNewByTopic(event))
);

const getNewByTopic = async (event) => {
  console.log(event.target.textContent);
  let topic = event.target.textContent.toLowerCase();
  url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=5&topic=${topic}`
  );
  getNews();
};

let btnSearch = document.getElementById("search-btn");
let searchInput = document.getElementById("search-input");
searchInput.addEventListener("focus", () => (searchInput.value = ""));
searchInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    getNewBySearch();
  }
});

const getNewBySearch = async () => {
  let search = searchInput.value;
  console.log(search);

  url = new URL(
    `https://api.newscatcherapi.com/v2/search?q=${search}&page_size=5`
  );
  getNews();
};

btnSearch.addEventListener("click", getNewBySearch);

const render = () => {
  let newsHTML = "";
  newsHTML = news
    .map((item) => {
      return `<div class="row news">
        <div class="col-lg-4">
        <img class="news-img-size" src="${
          item.media ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
        }"  />
        </div>
        <div class="col-lg-8">
        <h2>${item.title}</h2>
        <p>${
          item.summary == null || item.summary == ""
            ? "내용없음"
            : item.summary.length > 200
            ? item.summary.substr(0, 200) + "..."
            : item.summary
        }</p>
        <div>${item.rights || "no source"} ${moment(
        item.published_date
      ).fromNow()}</div>
        </div>
        </div>`;
    })
    .join(" ");
  console.log(newsHTML);
  document.getElementById("news-board").innerHTML = newsHTML;
};

const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};
const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};
const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

const errorRender = (message) => {
  let errorHTML = `
  <div class="alert alert-danger text-center" role="alert">
  ${message}
</div>`;
  document.getElementById("news-board").innerHTML = errorHTML;
};

const pagenation = () => {
  let pagenationHTML = `<li class="page-item">
  <a class="page-link" href="#" aria-label="Previous" onclick = "moveToPage(1)">
    <span aria-hidden="true">&laquo;</span>
  </a>
</li>
<li class="page-item">
  <a class="page-link" href="#" aria-label="Previous" onclick = "moveToPage(${page-1})">
    <span aria-hidden="true">&lt;</span>
  </a>
</li>`
  // total_page
  // page
  // first,last 변수 만들어야 함
  let pageGroup = Math.ceil(page/5)
  let last = pageGroup*5;
  let first = last-4;

  for(let i=first;i<=last;i++){
    pagenationHTML += `        
  <li class="page-item ${page==i? "active" : ""}"><a class="page-link" href="#" onclick = "moveToPage(${i})">${i}</a></li>`;
  }
  pagenationHTML += `<li class="page-item">
  <a class="page-link" href="#" aria-label="Next" onclick = "moveToPage(${page+1})">
    <span aria-hidden="true">&gt;</span>
  </a>
  </li><li class="page-item">
  <a class="page-link" href="#" aria-label="Next" onclick = "moveToPage(${total_pages})">
    <span aria-hidden="true">&raquo;</span>
  </a>
</li>`
document.querySelector(".pagination").innerHTML = pagenationHTML;
}

const moveToPage = (pageNum) => {
  // 1. 이동할 페이지를 안다
  page = pageNum;
  // 2. 이동할 페이지를 가지고 api를 다시 호출한다
  getNews();
  // 3. 
}