import {html} from '../../node_modules/lit-html/lit-html.js';
import {delCar, getCarById} from '../api/data.js'

const detailsTemplate=(car,isOwner,onDelete)=>html` <section id="listing-details">
<h1>Details</h1>
<div class="details-info">
    <img src=${car.imageUrl}>
    <hr>
    <ul class="listing-props">
        <li><span>Марка:</span>${car.brand}</li>
        <li><span>Модел:</span>${car.model}</li>
        <li><span>Година:</span>${car.year}</li>
        <li><span>Цена:</span>${car.price}</li>
    </ul>

    <p class="description-para">${car.description}</p>
     ${isOwner?html`<div class="listings-buttons">
     <a href="/edit/${car._id}" class="button-list">Редактиране</a>
     <a @click=${onDelete} href="javascript:void(0)" class="button-list">Изтриване</a>
 </div>`:''}
    
</div>
</section>
`
export async function detailsPage(ctx){
    const carId=ctx.params.id;
    const car=await getCarById(carId);
    const userId=sessionStorage.getItem('userId');
    const isOwner=userId===car._ownerId
    ctx.render(detailsTemplate(car,isOwner,onDelete))
    async function onDelete(){
        const confirmed=confirm('Сигурен ли сте?');
        if(confirmed){
            await delCar(carId)
            ctx.page.redirect('/catalog')
        }
    }
}