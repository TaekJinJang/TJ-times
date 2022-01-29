let news = [];


const getLatesNews = async () => {
  let url = new URL(
    "https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=food&page_size=10"
  );
  let header = new Headers({
    "x-api-key": "RXXn8l8Gh869EmgoqqCdGYYZf4yaZujLFvBlFgeaTt0",
  });

  let response = await fetch(url, { headers: header }); // 데이터보내는방식은 ajax, http, fetch 등이 있음
  let data = await response.json();
  console.log(data);
  news = data.articles;
  console.log(news);
  render();
};

getLatesNews();
let btnMenus = document.querySelectorAll(".menus button")
btnMenus.forEach((menus) => menus.addEventListener("click",(event)=> getNewByTopic(event) ));

const getNewByTopic = async(event) =>{
    console.log(event.target.textContent);
    let topic = event.target.textContent.toLowerCase();
    let url = new URL(
        `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`
    );
    let header = new Headers({
        "x-api-key": "RXXn8l8Gh869EmgoqqCdGYYZf4yaZujLFvBlFgeaTt0",
      });
    let response = await fetch(url, { headers: header }); // 데이터보내는방식은 ajax, http, fetch 등이 있음
    let data = await response.json();
    news = data.articles;

    render();
}

let btnSearch = document.getElementById("search-btn");
let searchInput = document.getElementById("search-input");
searchInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        getNewBySearch();
    }
  });

const getNewBySearch = async() =>{
    let search = searchInput.value;
    console.log(search)

    let url = new URL (
        `https://api.newscatcherapi.com/v2/search?q=${search}&page_size=10`
    );
    let header = new Headers({
        "x-api-key": "RXXn8l8Gh869EmgoqqCdGYYZf4yaZujLFvBlFgeaTt0",
      });
    let response = await fetch(url, { headers: header }); // 데이터보내는방식은 ajax, http, fetch 등이 있음
    let data = await response.json();
    news = data.articles;

    render();
}

btnSearch.addEventListener("click",getNewBySearch);

const render= () => {
    let newsHTML = "";
    newsHTML = news
    .map((item) => {
        
        return `<div class="row news">
        <div class="col-lg-4">
        <img class="news-img-size" src="${item.media || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
        }"  />
        </div>
        <div class="col-lg-8">
        <h2>${item.title}</h2>
        <p>${
            item.summary == null || item.summary == ""
            ? "내용없음"
            : item.summary.length > 200
            ? item.summary.substr(0,200) + "..."
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
}

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