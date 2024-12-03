const key = 'tSvNEYpBqMruetD9GyNW8WMsYNJKanhO5bbhW4hD';
firstSearch = true;
let q = 'National Parks';
let newsContainer1 = document.getElementById('news-container1');

async function __init__() {
    await getNews(q, newsContainer1);
    await getQ();
}

async function getQ() {

    let form = document.getElementById('formID');
    let newsContainer1 = document.getElementById('news-container1');

    form.addEventListener('submit', async function getQ(event){
        event.preventDefault();
        
        q = document.getElementById('q').value;
        clearPrev(newsContainer1);

        await getNews(q, newsContainer1);
    }
    );


}

function clearPrev(newsContainer1) {
    // Clear input field
    document.getElementById('q').value = '';

    newsContainer1.innerHTML = '';
}


async function getNews(q, newsContainer1) {
    try {
        q = q.replaceAll(/ /g, '%20');
        let response = await fetch(`https://developer.nps.gov/api/v1/newsreleases?limit=8&q=${q}&api_key=${key}`); 
        let data = await response.json();
        let news = data.data;
        console.log(news);

    
        for (let i = 0; i < news.length; i++) {
          
            if (news[i].image.url != 0 ) {                

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
                title.style.textAlign = 'center';

                let detail = document.createElement('p');
                detail.classList.add('description');
                
                let img = document.createElement('img');
                img.src = news[i].image.url;
                img.classList.add('image');
                
                cardBody.appendChild(title);
               
                cardBody.style.backgroundImage = `url(${img.src})`;
                cardBody.style.backgroundSize = 'cover';
                cardBody.style.height = '400px';

                cardBody.appendChild(detail);
                let link = document.createElement('a');
                link.classList.add('link', 'pt-2');
                link.href = news[i].url;
                link.textContent = 'Read news';
            
                cardBody.appendChild(link);
                card.appendChild(cardBody);
                col.appendChild(card);

                newsContainer1.appendChild(col);
        
            }

        }
    }

    catch (error) {
        console.log('Error: ', error);
    }
};

__init__();