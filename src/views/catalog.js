import {html} from '../../node_modules/lit-html/lit-html.js';
import {getCars} from '../api/data.js'

const catalogTemplate=(cars)=>html`
<section id="car-listings">
            <h1>Каталог на колите</h1>
            <div class="listings">
              ${cars.length==0?html`<p class="no-cars">Няма коли за показване</p>`:cars.map(carTemplate)}
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

export async function catalogPage(ctx){
    const cars=await getCars();
    ctx.render(catalogTemplate(cars))
}