import {render} from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs';
import {homePage} from './views/home.js'
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import {logout} from './api/data.js'
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { myCarPage } from './views/myCars.js';
import { searchPage } from './views/search.js';

const main=document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click',logoutBtn)
setUserNav();
page('/',decorateContext,homePage);
page('/login',decorateContext,loginPage)
page('/register',decorateContext,registerPage)
page('/catalog',decorateContext,catalogPage)
page('/create',decorateContext,createPage);
page('/details/:id',decorateContext,detailsPage)
page('/edit/:id',decorateContext,editPage)
page('/myCatalog',decorateContext,myCarPage)
page('/search',decorateContext,searchPage)

page.start()

function decorateContext(ctx,next){
    ctx.render=(content)=>render(content,main)
    ctx.setUserNav=setUserNav;
    next();
}
function setUserNav(){
    const username=sessionStorage.getItem('username');
    if(username!=null){
        document.getElementById('welcomeMessage').textContent=`Добре Дошли ${username}`
        document.getElementById('guest').style.display='none';
        document.getElementById('profile').style.display='';
    }else{
        document.getElementById('guest').style.display='';
        document.getElementById('profile').style.display='none';
    }
}
async function logoutBtn(){
    await logout();
    setUserNav();
    page.redirect('/')
}