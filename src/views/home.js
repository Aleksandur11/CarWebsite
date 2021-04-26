import {html} from '../../node_modules/lit-html/lit-html.js';

const homeTemplate=()=>html`
<div id="welcome-container">
    <h1>Добре Дошли при ЖО-БО</h1>
    <img class="hero" src="/images/car-png.webp" alt="carIntro">
    <h2>За да видите всички коли натиснете бутона отдолу:</h2>
    <div>
        <a href="/catalog" class="button">Каталог</a>
    </div>
</div>
</section>`

export async function homePage(ctx){
    ctx.render(homeTemplate())
}