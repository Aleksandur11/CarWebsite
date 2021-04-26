import {html} from '../../node_modules/lit-html/lit-html.js';
import {getMyCars} from '../api/data.js'

const myCarsTemplate=(cars)=>html`
<section id="my-listings">
<h1>Мойте обяви</h1>
<div class="listings">
   ${cars.length==0?html`<p class="no-cars">Не сте публикували никакви обяви все още.</p>`:cars.map(carTemplate)}
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
                <h3>Year: ${car.year}</h3>
                <h3>Price: ${car.price} $</h3>
            </div>
            <div class="data-buttons">
                <a href="/details/${car._id}" class="button-carDetails">Детайли</a>
            </div>
        </div>
    </div>`

    export async function myCarPage(ctx){
        const cars=await getMyCars();
        ctx.render(myCarsTemplate(cars))
    }