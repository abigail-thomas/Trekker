const key = 'tSvNEYpBqMruetD9GyNW8WMsYNJKanhO5bbhW4hD';
let firstSearch = localStorage.getItem('firstSearch') === 'true' ? false : true;

async function __init__() {

    
    // await getNews();
    await getQ();
}

async function getQ() {

    let form = document.getElementById('formID');
    let newsContainer1 = document.getElementById('news-container1');



    form.addEventListener('submit', async function getQ(event){
        event.preventDefault();

        
        let q = document.getElementById('q').value;
        if (!firstSearch){
            clearPrev(newsContainer1);
        }

        firstSearch = false;


        await getNews(q, newsContainer1);
    }
    );


}

function clearPrev(newsContainer1) {
    // Clear input field
    document.getElementById('q').value = '';

    // Clear previous results from the search results container
    // const searchResultsContainer = document.getElementById('searchResults').value;
    // console.log(searchResultsContainer);
    // searchResultsContainer.innerHTML = ''; // This clears the container

    newsContainer1.innerHTML = '';
}


async function getNews(q, newsContainer1) {
    try {
        q = q.replaceAll(/ /g, '%20');
        // curl -X GET "https://developer.nps.gov/api/v1/newsreleases?limit=9&q=hiking&api_key=tSvNEYpBqMruetD9GyNW8WMsYNJKanhO5bbhW4hD" -H "accept: application/json"
    let response = await fetch(`https://developer.nps.gov/api/v1/newsreleases?limit=8&q=${q}&api_key=${key}`); 
    let data = await response.json();
    let news = data.data;
    console.log(news);
    // console.log(news[0].listingImage.url);

    
        for (let i = 0; i < news.length; i++) {
            // console.log(i);
            // console.log(news[i].listingImage.url);
            
            
            // if image with artcle
            if (news[i].image.url != 0 ) {
                // console.log('here');
                

                let col = document.createElement('div');
                col.classList.add('col-4', 'mb-4');

                    // Create a new card element
                let card = document.createElement('div');
                card.classList.add('card');
                card.style.width = '100%';  // Optional: Set width of card

                // Card body
                let cardBody = document.createElement('div');
                cardBody.classList.add('card-body');

                let title = document.createElement('h2');
                title.textContent = news[i].title;
                title.classList.add('outlined');
                title.style.textAlign = 'center';

                let detail = document.createElement('p');
                detail.classList.add('description');
                // detail.textContent = news[i].abstract;


                let img = document.createElement('img');
                img.src = news[i].image.url;
                img.classList.add('image');
                
                cardBody.appendChild(title);
                // cardBody.appendChild(img);
                // console.log(img.src);
                cardBody.style.backgroundImage = `url(${img.src})`;
                // console.log(cardBody);
                cardBody.style.backgroundSize = 'cover';
                cardBody.style.height = '400px';

                cardBody.appendChild(detail);



                let link = document.createElement('a');
                link.classList.add('link', 'pt-2');
                // link.classList.add('addy');
                link.href = news[i].url;
                link.textContent = 'Read news';
                // link.style.textAlign = 'center';
                // console.log(maps);

                //<p><a href="chess.com">chess</a></p>

                // details.innerHTML = maps;

                cardBody.appendChild(link);
                card.appendChild(cardBody);
                // card.appendChild(link);
                col.appendChild(card);
                // col.appendChild(link);
                
                // console.log(col);
                newsContainer1.appendChild(col);
                // newsContainer11.appendChild(link);
                // console.log(newsContainer1);

                // console.log('here');
                // console.log(newsContainer1);

            
            }
        
        
        }
    }

    
    
    catch (error) {
        console.log('Error: ', error);
    }
};

__init__();