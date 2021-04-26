import {html} from '../../node_modules/lit-html/lit-html.js';
import {createCar} from '../api/data.js'

const createTemplate=(onSubmit)=>html`
<section id="create-listing">
            <div class="container">
                <form @submit=${onSubmit}id="create-form">
                    <h1>Създаване на обява</h1>
                    <p>Моля попълнете формуляра за да създадете обява</p>
                    <hr>

                    <p>Марка</p>
                    <input type="text" placeholder="Въведете марката на автомобила" name="brand">

                    <p>Модел</p>
                    <input type="text" placeholder="Въведете модела на автомобила" name="model">

                    <p>Описание</p>
                    <input type="text" placeholder="Въведете допълнително описание" name="description">

                    <p>Година</p>
                    <input type="number" placeholder="Въведете годината на производство" name="year">

                    <p>Снимка</p>
                    <input type="text" placeholder="Въведете снимка на автомобила" name="imageUrl">

                    <p>Цена</p>
                    <input type="number" placeholder="Въведете цената на автомобила" name="price">

                    <hr>
                    <input type="submit" class="registerbtn" value="Създаване на обявата">
                </form>
            </div>
        </section>`

        export async function createPage(ctx){
            ctx.render(createTemplate(onSubmit))

        async function onSubmit(ev){
            ev.preventDefault();
            const formData=new FormData(ev.target)
            const brand=formData.get('brand');
            const model=formData.get('model');
            const description=formData.get('description');
            const year=Number(formData.get('year'));
            const imageUrl=formData.get('imageUrl')
            const price=Number(formData.get('price'));
            if(!brand||!model||!description||!year||!imageUrl||!price){
                return alert('All fields are required!')
            }if(year<0||price<0){
                return alert('Price and Year must be positive Numbers!')
            } 
            await createCar({brand,model,description,year,imageUrl,price})
            ctx.page.redirect('/catalog')
        }
        }