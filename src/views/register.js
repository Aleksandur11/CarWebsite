import {html} from '../../node_modules/lit-html/lit-html.js';
import {register} from '../api/data.js'

const registerTemplate=(onSubmit)=>html`
<section id="register">
            <div class="container">
                <form @submit=${onSubmit} id="register-form">
                    <h1>Регистрация</h1>
                    <p>Моля попълнете формуляра за да се регистрирате в сайта</p>
                    <hr>

                    <p>Потребителско име</p>
                    <input type="text" placeholder="Въведете потребителско име тук" name="username" required>

                    <p>Парола</p>
                    <input type="password" placeholder="Въведете паролата тук" name="password" required>

                    <p>Повторете паролата</p>
                    <input type="password" placeholder="Въведете отново паролата тук" name="repeatPass" required>
                    <hr>

                    <input type="submit" class="registerbtn" value="Регистрация">
                </form>
                <div class="signin">
                    <p>Вече имате акаунт?
                        <a href="/login">Влезте с акаунта си</a>.
                    </p>
                </div>
            </div>
        </section>`

export async function registerPage(ctx){
    ctx.render(registerTemplate(onSubmit))
    async function onSubmit(ev){
        ev.preventDefault();
        const formData=new FormData(ev.target);
        const username=formData.get('username');
        const password=formData.get('password');
        const repeatPass=formData.get('repeatPass')
        if(!username||!password||!repeatPass){
            return alert('All fields are required!')
        } 
        if(password!=repeatPass){
            return alert('Passwords dont match!')
        }
        await register(username,password);
        ctx.setUserNav();
        ctx.page.redirect('/catalog')
    }
}