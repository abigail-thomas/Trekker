const key = 'tSvNEYpBqMruetD9GyNW8WMsYNJKanhO5bbhW4hD';

async function __init__() {
    await getNews();
}

async function getNews() {

    try {
    let response = await fetch(`https://developer.nps.gov/api/v1/articles?limit=9&q=national%20parks&api_key=${key}`); 
    let data = await response.json();
    let news = data.data;
  
    let newsContainer1 = document.getElementById('news-container1');
    
        for (let i = 0; i < news.length; i++) {
                         
                let col = document.createElement('div');
                col.classList.add('col-lg-4', 'col-m-2', 'mb-4');

                let card = document.createElement('div');
                card.classList.add('card');
                card.style.width = '100%'; 

                let cardBody = document.createElement('div');
                cardBody.classList.add('card-body');

                let title = document.createElement('h2');
                title.textContent = news[i].title;
                title.classList.add('outlined');

                let detail = document.createElement('p');
                detail.classList.add('description');
                detail.textContent = news[i].listingDescription;


                let img = document.createElement('img');
                img.src = news[i].listingImage.url;
                img.classList.add('image');
                
                cardBody.appendChild(title);
                console.log(img.src);
                cardBody.style.backgroundImage = `url(${img.src})`;
                console.log(cardBody);
                cardBody.style.backgroundSize = 'cover';
                cardBody.style.height = '400px';

                cardBody.appendChild(detail);



                let link = document.createElement('a');
                link.classList.add('link', 'pt-2' , 'px-0');
                link.href = news[i].url;
                link.textContent = 'Read this article';
               

                cardBody.appendChild(link);
                card.appendChild(cardBody);
                col.appendChild(card);
                newsContainer1.appendChild(col);
                
            }        
    }

    catch (error) {
        console.log('Error: ', error);
    }
};



__init__();