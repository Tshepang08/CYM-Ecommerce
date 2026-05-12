/* ==========================
   CYM E-commerce UI Library
   JavaScript
   ========================== */

const PRODUCTS = [
  {id:1, name:'Ladies Formal Set', category:'Ladies Formal', price:249.99, img:'ladies uniform.jpg', desc:'Black head-dress, white blouse, black skirt, covering with CYM badge.'},
  {id:2, name:'Men Formal Suit', category:'Men Formal', price:299.99, img:'mens uniform.jpg', desc:'Black pants, jacket, white shirt, tie, CYM badge.'},
  {id:3, name:'CYM T-shirt (White)', category:'Ladies Casual', price:49.99, img:'T-shirt.jpeg', desc:'Comfortable white t-shirt with CYM logo.'},
  {id:4, name:'Tracksuit', category:'Men Casual', price:129.99, img:'tracksuit.jpeg', desc:'Official CYM colours and logo.'},
  {id:5, name:'Hymn Book', category:'Books', price:14.99, img:'Hosanna.jpeg', desc:'Official hymns used by the church.'},
  {id:6, name:'Bible (Compact)', category:'Books', price:19.99, img:'bible.jpeg', desc:'Compact bible with durable cover.'}
];

// ------------------ Cart ------------------
let cart = [];
const cartBtn = document.getElementById('cartBtn');
const modal = document.getElementById('productModal');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

function openModal(html){ modal.classList.add('modal--open'); modalContent.innerHTML = html }
function closeModal(){ modal.classList.remove('modal--open') }
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if(e.target===modal) closeModal() });

function updateCartCount(){
  cartBtn.textContent = `Cart (${cart.length})`;
}

function renderCart(){
  if(cart.length === 0){
    openModal('<h3>Your Cart</h3><p>No items in cart.</p>');
    return;
  }
  const itemsHtml = cart.map((item,i)=>`
    <li>
      ${item.name} — R ${item.price.toFixed(2)}
      <button class="btn removeItem" data-index="${i}">❌</button>
    </li>
  `).join('');
  const total = cart.reduce((sum,i)=>sum+i.price,0).toFixed(2);
  openModal(`
    <h3>Your Cart</h3>
    <ul>${itemsHtml}</ul>
    <p><strong>Total: R ${total}</strong></p>
    <button class="btn" id="clearCart">Clear Cart</button>
    <button class="btn" id="submitCart">Submit Order</button>
  `);

  // hook remove buttons
  modalContent.querySelectorAll('.removeItem').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const idx = parseInt(btn.dataset.index);
      cart.splice(idx,1);
      updateCartCount();
      renderCart();
    });
  });

  modalContent.querySelector('#clearCart').addEventListener('click',()=>{
    cart = [];
    updateCartCount();
    renderCart();
  });

  modalContent.querySelector('#submitCart').addEventListener('click',()=>{
    alert('Order submitted with '+cart.length+' items. (Demo)');
    cart = [];
    updateCartCount();
    closeModal();
  });
}

cartBtn.addEventListener('click', renderCart);

// ------------------ Products ------------------
(function productsInit(){
  const grid = document.getElementById('productGrid');
  PRODUCTS.forEach(p=>{
    const card=document.createElement('article'); card.className='product';
    card.innerHTML=`<img class="product__img" src="${p.img}" alt="${p.name}" />
      <div class="product__title">${p.name}</div>
      <div class="muted">${p.category}</div>
      <div class="product__price">R ${p.price.toFixed(2)}</div>
      <div class="product__actions">
        <button class="btn quickView">Quick view</button>
        <button class="btn addToCart">Add</button>
      </div>`;
    grid.appendChild(card);

    card.querySelector('.quickView').addEventListener('click', ()=> 
      openModal(`<h3>${p.name}</h3>
                 <p class='muted'>${p.category} — R ${p.price.toFixed(2)}</p>
                 <p>${p.desc}</p>
                 <img src='${p.img}' alt='${p.name}' style='width:100%'/>`)
    );

    card.querySelector('.addToCart').addEventListener('click', ()=>{
      cart.push(p);
      updateCartCount();
    });
  });
})();

// ------------------ Accordion ------------------
(function accordionInit(){
  const acc=document.getElementById('faqAccordion');
  acc.querySelectorAll('.accordion__item').forEach(item=>{
    const summary=item.querySelector('.accordion__summary');
    summary.addEventListener('click', ()=> item.classList.toggle('accordion__item--open'));
  });
})();

// ------------------ Data table ------------------
(function tableInit(){
  const tbody=document.querySelector('#productTable tbody');
  const pager=document.getElementById('tablePager');
  const perPage=3; let page=1; let sortKey='name'; let sortDir=1;
  function render(){
    const data=[...PRODUCTS].sort((a,b)=> (a[sortKey]>b[sortKey]?1:-1)*sortDir);
    const chunk=data.slice((page-1)*perPage, page*perPage);
    tbody.innerHTML=chunk.map(r=>
      `<tr>
         <td>${r.name}</td>
         <td>${r.category}</td>
         <td>R ${r.price.toFixed(2)}</td>
         <td><button class='btn'>View</button></td>
       </tr>`
    ).join('');
    const pages=Math.ceil(data.length/perPage);
    pager.innerHTML=`Page ${page} of ${pages} <button class='btn' ${page===1?'disabled':''} data-prev>Prev</button><button class='btn' ${page===pages?'disabled':''} data-next>Next</button>`;
  }
  document.querySelectorAll('#productTable th[data-key]').forEach(th=>{
    th.addEventListener('click', ()=>{ const key=th.dataset.key; if(sortKey===key) sortDir*=-1; else {sortKey=key;sortDir=1}; render() });
  });
  pager.addEventListener('click', e=>{ if(e.target.dataset.prev){page--;render()} if(e.target.dataset.next){page++;render()} });
  render();
})();

// ------------------ Multi-step form ------------------
(function formInit(){
  const form=document.getElementById('checkoutForm');
  const steps=[...form.querySelectorAll('[data-step]')];
  let idx=0;
  const prev=document.getElementById('prevStep');
  const next=document.getElementById('nextStep');
  const submit=document.getElementById('submitBtn');
  function show(i){ steps.forEach((s,si)=> s.classList.toggle('hidden', si!==i)); prev.classList.toggle('hidden',i===0); next.classList.toggle('hidden',i===steps.length-1); submit.classList.toggle('hidden',i!==steps.length-1) }
  next.addEventListener('click',()=>{ idx=Math.min(idx+1,steps.length-1); show(idx) });
  prev.addEventListener('click',()=>{ idx=Math.max(0,idx-1); show(idx) });
  form.addEventListener('submit',e=>{ e.preventDefault(); alert('Order placed (demo)'); idx=0; show(idx) });
  if(steps.length>0) show(0);
})();
