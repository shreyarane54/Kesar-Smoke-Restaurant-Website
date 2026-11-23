const menu = {
  starters: { title: 'A delicious beginning.', intro: 'A little char, a little spice. Made to pass around.', items: [
    {name:'Smoked Paneer Tikka',description:'Tandoor-charred paneer, hung yoghurt marinade, mint chutney and pickled onion.',price:545,image:'fire.jpg',alt:'Smoky paneer tikka skewers over tandoor charcoal',note:'Vegetarian'},
    {name:'Tandoori Prawns',description:'Juicy prawns, Kashmiri chilli, ajwain and a squeeze of charred lemon.',price:795,image:'menu-prawns.jpg',alt:'Tandoori prawns with charred lemon on dark ceramic',note:'From the tandoor'},
    {name:'Truffle Galouti Kebab',description:'Melt-in-the-mouth lamb, warming spices and shaved truffle on miniature parathas.',price:745,image:'menu-galouti.jpg',alt:'Truffle galouti kebabs on miniature parathas',note:'House signature'}
  ]},
  mains: { title: 'The heart of the table.', intro: 'Slow-cooked comforts. Bold flavours. Best shared.', items: [
    {name:'Saffron Butter Chicken',description:'Tender tandoori chicken, velvety tomato, cultured cream and a fragrant saffron finish.',price:895,image:'menu-chicken.jpg',alt:'Saffron butter chicken in a brass bowl',note:'House signature'},
    {name:'Dal Kesar',description:'Black lentils simmered slowly with tomato, butter and a whisper of saffron.',price:645,image:'menu-dal.jpg',alt:'Slow-cooked black lentils with a cream swirl',note:'Vegetarian'},
    {name:'Charcoal Naan',description:'Soft, blistered tandoor bread, brushed with butter and finished with sea salt.',price:145,image:'menu-naan.jpg',alt:'Blistered charcoal naan with butter',note:'Vegetarian'},
    {name:'Lamb Rogan Josh',description:'Slow-braised lamb in a rich Kashmiri chilli gravy with fennel and warming spices.',price:995,image:'menu-lamb.jpg',alt:'Lamb rogan josh in rich red gravy',note:'Slow braised'}
  ]},
  desserts: { title: 'End on a sweeter note.', intro: 'Familiar Indian sweets, with an unexpected turn.', items: [
    {name:'Gulab Jamun Cheesecake',description:'Silky cheesecake, golden gulab jamun, rose syrup and a delicate pistachio crumb.',price:445,image:'menu-cheesecake.jpg',alt:'Cheesecake topped with gulab jamun and pistachio',note:'A modern classic'},
    {name:'Saffron Kulfi',description:'Slow-reduced milk, saffron and cardamom, scattered with rose petals and pistachio.',price:395,image:'dessert.jpg',alt:'Kulfi with rose petals and pistachio on dark ceramic',note:'House favourite'},
    {name:'Chocolate Rasmalai',description:'Soft chenna dumplings in chocolate-infused milk, finished with dark chocolate curls.',price:425,image:'menu-rasmalai.jpg',alt:'Chocolate rasmalai in chocolate milk with chocolate curls',note:'For chocolate lovers'}
  ]},
  drinks: { title: 'A toast to the evening.', intro: 'Indian botanicals. Classic spirits. A fresh perspective.', items: [
    {name:'Kesar Martini',description:'Vodka, dry vermouth and delicate saffron, served chilled with a citrus twist.',price:695,image:'menu-martini.jpg',alt:'Golden saffron martini in a chilled coupe',note:'With spirits'},
    {name:'Masala Negroni',description:'Gin, bitter aperitif and sweet vermouth, gently spiced and finished with orange.',price:725,image:'menu-negroni.jpg',alt:'Ruby negroni with clear ice, orange peel and star anise',note:'With spirits'},
    {name:'Mango Saffron Cooler',description:'Ripe mango, saffron and fresh lime, lifted with sparkling water.',price:375,image:'menu-cooler.jpg',alt:'Golden mango saffron cooler in a tall glass with lime',note:'Alcohol-free'}
  ]}
};
const menuTabs = [...document.querySelectorAll('.ks-menu [role="tab"]')];
const menuPanel = document.getElementById('menu-panel');
const menuMoney = new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0});
let selectedMenu = '';
function menuMarkup(category) {
  const section = menu[category];
  return `<div class="menu-chapter"><h3>${section.title}</h3><p>${section.intro}</p></div><div class="menu-list">${section.items.map((dish,i)=>`<article class="menu-row"><span class="menu-number" aria-hidden="true">${String(i+1).padStart(2,'0')}</span><figure class="menu-photo"><img src="${dish.image}" alt="${dish.alt}" width="200" height="150" loading="lazy" decoding="async"></figure><div class="menu-copy"><p class="menu-dish-note">${dish.note}</p><h4>${dish.name}</h4><p class="menu-description">${dish.description}</p></div><p class="menu-price">${menuMoney.format(dish.price)}</p></article>`).join('')}</div>`;
}
function showMenu(category, animate = true) {
  if(category==='sweet') category='desserts';
  if(category==='plates') category='starters';
  if(!menu[category] || category===selectedMenu) return;
  selectedMenu=category;
  menuPanel.getAnimations?.({subtree:true}).forEach(animation=>animation.cancel());
  menuPanel.innerHTML=menuMarkup(category);
  menuTabs.forEach(tab=>{const active=tab.dataset.category===category;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;if(active)menuPanel.setAttribute('aria-labelledby',tab.id)});
  document.getElementById('menu-status').textContent=`${menu[category].items.length} ${category==='drinks'?'drinks':'dishes'} · ${category.charAt(0).toUpperCase()+category.slice(1)}`;
  if(animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && menuPanel.animate){
    menuPanel.querySelectorAll('.menu-chapter,.menu-row').forEach((row,i)=>row.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:360,delay:i*35,easing:'cubic-bezier(.2,.65,.25,1)',fill:'backwards'}));
  }
}
menuTabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>showMenu(tab.dataset.category));
  tab.addEventListener('keydown',event=>{
    const keys={ArrowRight:(index+1)%menuTabs.length,ArrowLeft:(index+menuTabs.length-1)%menuTabs.length,Home:0,End:menuTabs.length-1};
    if(!(event.key in keys))return;
    event.preventDefault();const next=menuTabs[keys[event.key]];next.focus();showMenu(next.dataset.category);
  });
});
showMenu('starters',false);

