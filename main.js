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