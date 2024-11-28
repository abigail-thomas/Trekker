const key = 'tSvNEYpBqMruetD9GyNW8WMsYNJKanhO5bbhW4hD';

async function __init__() {
    await getNews();
}

async function getNews() {
    try {
    let response = await fetch(`https://developer.nps.gov/api/v1/articles?limit=9&q=national%20parks&api_key=${key}`); 
    let data = await response.json();
    let news = data.data;
    console.log(news);
    // console.log(news[0].listingImage.url);

    let newsContainer1 = document.getElementById('news-container1');
    
        for (let i = 0; i < news.length; i++) {
            // console.log(i);
            // console.log(news[i].listingImage.url);
            
            
            // if image with artcle
            if (news[i].listingImage.length != 0 && news[i].listingImage.url && news[i].listingDescription.length < 375) {
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

                let detail = document.createElement('p');
                detail.classList.add('description');
                detail.textContent = news[i].listingDescription;


                let img = document.createElement('img');
                img.src = news[i].listingImage.url;
                img.classList.add('image');
                
                cardBody.appendChild(title);
                // cardBody.appendChild(img);
                console.log(img.src);
                cardBody.style.backgroundImage = `url(${img.src})`;
                console.log(cardBody);
                cardBody.style.backgroundSize = 'cover';
                cardBody.style.height = '400px';

                cardBody.appendChild(detail);



                let link = document.createElement('a');
                link.classList.add('link', 'pt-2');
                // link.classList.add('addy');
                link.href = news[i].url;
                link.textContent = 'Read this article';
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
            else {
                console.log('no image');
            }

        
        
        }
    }

    
    
    catch (error) {
        console.log('Error: ', error);
    }
};

__init__();