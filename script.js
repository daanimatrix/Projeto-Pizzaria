let modalQt = 1;
let cart = [];
let modalkey = 0;

const c = (el)=> document.querySelector(el);
const cs =(el)=>document.querySelectorAll(el);

//Listagem das pizzas
pizzaJson.map((item, index)=>{
    // console.log(item);
    let pizzaItem = c('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index); //esta atribuindo um valor  no caso um atributo data-key e um index
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2).replace('.',',')}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();//para bloqueiar a ação (ele vai prever como padrão )
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQt = 1;
        modalkey = key;
        // console.log(pizzaJson[key]);

        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2).replace('.',',')}`;
        c('.pizzaInfo--size.selected').classList.remove('selected'); //ele vai pegar a classe e remover o selected
        cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            if(sizeIndex == 2){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });
        c('.pizzaInfo--qt').innerHTML = modalQt;
        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
        c('.pizzaWindowArea').style.opacity = 1;
        }, 200);   
    });
    c('.pizza-area').append( pizzaItem);

  
});

  //Eventos do Modal 

  function closeModal() {
        
    c('.pizzaWindowArea').style.opacity = 0;   

    setTimeout(()=>{
        c('.pizzaWindowArea').style.display = 'none';  
    }, 500);
}       

cs('.pizzaInfo--cancelButton,  .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);//addEventListener(evento, função)
});

c('.pizzaInfo--qtmenos').addEventListener('click',()=>{
    if(modalQt >1){
    modalQt--;
    c('.pizzaInfo--qt').innerHTML = modalQt;
    }
});

c('.pizzaInfo--qtmais').addEventListener('click',()=>{
    modalQt++;
    c('.pizzaInfo--qt').innerHTML = modalQt;
});

cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click',(e)=>{
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

c('.pizzaInfo--addButton').addEventListener('click', ()=>{
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));
    console.log("Quantidade:" +modalQt);

    cart.push({
        id:pizzaJson[modalkey].id,
        size,
        qt: modalQt
    });

    closeModal();
});