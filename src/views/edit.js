import {html} from '../../node_modules/lit-html/lit-html.js';
import {getCarById,updateCar} from '../api/data.js'

const editTemplate=(car,onSubmit)=>html`
<section id="edit-listing">
<div class="container">

    <form @submit=${onSubmit} id="edit-form">
        <h1>Редакция на обявата</h1>
        <p>Моля попълнете формуляра за да създадете обява</p>
        <hr>

        <p>Марка</p>
        <input type="text" placeholder="Въведете марката на автомобила тук" name="brand" .value=${car.brand}>

        <p>Модел</p>
        <input type="text" placeholder="Въведете модела на автомобила тук" name="model" .value=${car.model}>

        <p>Описание</p>
        <input type="text" placeholder="Въведете описание на автомобила тук" name="description" .value=${car.description}>

        <p>Година</p>
        <input type="number" placeholder="Въведете годината на производство тук" name="year" .value=${car.year}>

        <p>Снимка</p>
        <input type="text" placeholder="Въведете снимка на автомобила тук" name="imageUrl" .value=${car.imageUrl}>

        <p>Цена</p>
        <input type="number" placeholder="Въведете цената на автомобила тук" name="price" .value=${car.price}>

        <hr>
        <input type="submit" class="registerbtn" value="Публикуване на обявата">
    </form>
</div>
</section>`

export async function editPage(ctx){
    const carId=ctx.params.id;
    const car=await getCarById(carId);
    ctx.render(editTemplate(car,onSubmit))

    async function onSubmit(ev){
        ev.preventDefault();
        const formData=new FormData(ev.target);
        const brand=formData.get('brand');
        const model=formData.get('model');
        const description=formData.get('description');
        const year=Number(formData.get('year'));
        const imageUrl=formData.get('imageUrl')
        const price=Number(formData.get('price'))
        if(!brand||!model||!description||!year||!imageUrl||!price){
            return alert('Всички полета са задължителни')
        }
        if(year<0||price<0){
            return alert('Цената и годината на автомобила трябва да са числа!')
        } 
        await updateCar(carId,{brand,model,description,year,imageUrl,price});
        ctx.page.redirect('/details/'+carId)
    }
}