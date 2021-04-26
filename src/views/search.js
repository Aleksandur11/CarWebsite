import {html} from '../../node_modules/lit-html/lit-html.js';
import {search} from '../api/data.js'

const searchTemplate=(cars,onSearch,year)=>html`
<!-- Search Page -->
<section id="search-cars">
    <h1>Търсене по година</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Въведете желаната от вас година на производство тук" .value=${year||''}>
        <button @click=${onSearch} class="button-list">Търсене</button>
    </div>

    <h2>Резултати:</h2>
    <div class="listings">
    ${cars.length==0?html`<p class="no-cars"> Няма намерени коли произведени през въведената година</p>`:cars.map(carTemplate)}
    </div>
</section>`


const carTemplate=(car)=>html`
<div class="listing">
                    <div class="preview">
                        <img src=${car.imageUrl}>
                    </div>
                    <h2>${car.brand} ${car.model}</h2>
                    <div class="info">
                        <div class="data-info">
                            <h3>Година: ${car.year}</h3>
                            <h3>Цена: ${car.price} $</h3>
                        </div>
                        <div class="data-buttons">
                            <a href="/details/${car._id}" class="button-carDetails">Детайли</a>
                        </div>
                    </div>
                </div>`

export async function searchPage(ctx){
    const year=Number(ctx.querystring.split('=')[1]);
    const cars=Number.isNaN(year)? []:await search(year);
    ctx.render(searchTemplate(cars,onSearch,year))

    function onSearch(){
      const query=Number(document.getElementById('search-input').value);
      ctx.page.redirect('/search?query='+query)
    }
}