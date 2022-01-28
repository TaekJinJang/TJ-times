let news = []

const getLatesNews = async () => {
    let url = new URL("https://api.newscatcherapi.com/v2/search?q=Tesla&page_size=2");
    let header = new Headers({'x-api-key' : 'RXXn8l8Gh869EmgoqqCdGYYZf4yaZujLFvBlFgeaTt0'})

    let response = await fetch(url,{headers:header}) // 데이터보내는방식은 ajax, http, fetch 등이 있음
    let data = await response.json()
    console.log(data);
    news = data.page
    console.log(articles);
};

getLatesNews();

const openSearchBox= () =>{
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display==="inline") {
        inputArea.style.display= "none";
    }else {
        inputArea.style.display = "inline"
    }
};
const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
}
const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
}
let taskList=[]
function addTask() {
    let task = {
      id: randomIDGenerate(),
      taskContent: taskInput.value, // api 불러옴
    };
    taskList.push(task);
    render();
  }
  function randomIDGenerate() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }

  function render(){
    let resultHTML = "";
    for (let i = 0; i < list.length; i++) {
        resultHTML += `<div class="row news">
        <div class="col-lg-4">
            <img class="news-img-size" src="https://static01.nyt.com/images/2022/01/27/world/27ukraine-biden-europe01SUB/merlin_200959887_762ebb63-110b-4da7-9f62-10675c5d4169-threeByTwoSmallAt2X.jpg?format=pjpg&quality=75&auto=webp&disable=upscale" alt="">
        </div>
        <div class="col-lg-8">
            <h2>졸려주ㅡㄱ겠다</h2>
            <p>대충끝내고 눵야지</p>
            <div>
               유튜브봐야함20220128
            </div>
        </div>
    </div>`;
    }   
  }