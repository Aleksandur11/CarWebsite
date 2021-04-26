import {html} from '../../node_modules/lit-html/lit-html.js';
import {login} from '../api/data.js'
const loginTemplate=(onSubmit)=>html`
<section id="login">
<div class="container">
    <form @submit=${onSubmit}id="login-form" action="#" method="post">
        <h1>Влизане</h1>
        <p>Моля въведете данните си.</p>
        <hr>

        <p>Потребителско Име</p>
        <input placeholder="Въведете потребителско име" name="username" type="text">

        <p>Парола</p>
        <input type="password" placeholder="Въведете Парола" name="password">
        <input type="submit" class="registerbtn" value="Влизане">
    </form>
    <div class="signin">
        <p>Нямате акаунт?
            <a href="/register">Регистрирайте се тук</a>.
        </p>
    </div>
</div>
</section>`

export async function loginPage(ctx){
    ctx.render(loginTemplate(onSubmit))
    

    async function onSubmit(ev){
        ev.preventDefault();
        const formData=new FormData(ev.target);
        const username=formData.get('username');
        const password=formData.get('password');
        await login(username,password);
        ctx.setUserNav();
        ctx.page.redirect('/catalog')

    }
}