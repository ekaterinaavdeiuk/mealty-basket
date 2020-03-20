import { catalog, categoryPrice } from './db.js'

let cart = {
    currency: 'RUR',
    amount: 0,  //итоговая стоимость
    products: [] //продукты
};

function createProductCard(product) {
    let div = create('div');   //создаем div
    div.classList.add('products');
    let img = create('div');
    img.classList.add('card-img');
    img.style.backgroundImage = `url(img/${product.image}.jpeg)`;
    let name = create('p');    //создаем p название товара
    name.innerText = product['name'];
    name.classList.add('card-name');
    let button = create('button');  //создаем кнопку Добавить
    button.innerText = 'В корзину';
    button.id = `add-${product.id}`;//записываем в кнопку текст
    button.classList.add('card-button');
    let price = create('p');
    price.insertAdjacentHTML('afterbegin', replacePrice(categoryPriceFindElement(product['category']), true));
    price.classList.add('card-price');
    div.append(img);
    div.append(name);
    div.append(price);
    div.append(button);
    return div;
}

function createProductInBasketCard(product) {
    let basketProducts = create('div');
    basketProducts.classList.add('basket-products');
    let img = create('div');
    img.classList.add('img', 'img-small');
    img.style.backgroundImage = `url(img/${product.image}.jpeg)`;
    let nameQuantity = create('div');
    nameQuantity.classList.add('name-quantity');
    let name = create('p');
    name.innerText = product['name'];
    let buttons = create('div');
    buttons.classList.add('buttons');
    let buttonPlus = create('button');
    buttonPlus.classList.add('button-plus');
    buttonPlus.id = `plus-${product.id}`;
    buttonPlus.innerText = '+';
    let quantity = create('div');
    quantity.classList.add('quantity');
    quantity.innerText = product['quantity'];
    let buttonMinus = create('button');
    buttonMinus.classList.add('button-minus');
    buttonMinus.innerText = '-';
    buttonMinus.id = `minus-${product.id}`;
    let deleteProduct = create('button');
    deleteProduct.classList.add('delete');
    deleteProduct.innerText = 'x';
    deleteProduct.id = `delete-${product.id}`;
    buttons.append(buttonPlus);
    buttons.append(quantity);
    buttons.append(buttonMinus);
    nameQuantity.append(name);
    nameQuantity.append(buttons);
    basketProducts.append(img);
    basketProducts.append(nameQuantity);
    basketProducts.append(deleteProduct);
    return basketProducts;
}

function categoryPriceFindElement(category) {
    return categoryPrice.find(element => element.category === category);
}

function replacePrice(element, html = false) {
    switch (element.currency) {
        case 'RUR':
            return html ? `<span>${element.price}</span> руб.` : `${element.price} руб.`;
        case 'USD':
            return html ? `<span>${element.price}</span> руб.` : `${element.price} руб.`;
    }
}

function create(tag) {
    return document.createElement(tag);
}

function renderProducts() {
    let div = document.querySelector('.catalog');
    catalog.forEach(element => {
        div.append(createProductCard(element))
    });
}

function renderCart() {
    cart.amount = cart.products.reduce((accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity, 0);

    let div = document.querySelector('.cart');

    if (document.querySelector('.price') !== null) {
        document.querySelector('.price').innerText = `Цена: ${replacePrice({price: cart.amount, currency: cart.currency})}`;
    } else {
        let price = create('p');
        price.classList.add('price');
        price.innerText = `Цена: ${replacePrice({price: cart.amount, currency: cart.currency})}`;
        div.append(price);
    }

    let cartProducts = document.querySelector('.cart-products');

    if (cartProducts.children.length > 0) {
        cartProducts.innerHTML = '';
    }

    cart.products.forEach(element => cartProducts.append(createProductInBasketCard(element)));
}

function addProduct(id) {
    const index = cart.products.findIndex(element => element.id === id); // есть ли такой продукт в корзине или нет?
    if (index === -1) {
        const productInCatalog = catalog.find(element => element.id === id);
        const price = categoryPriceFindElement(productInCatalog.category);
        const product = {
            id: id,
            name: productInCatalog.name,
            category: productInCatalog.category,
            image: productInCatalog.image,
            price: price.price,
            currency: price.currency,
            quantity: 1
        };
        cart.products.push(product);
    } else {
        cart.products[index].quantity++;
    }
    renderCart();
}

function deleteProduct(id) {
    const index = cart.products.findIndex(element => element.id === id);
    cart.products.splice(index, 1);
    renderCart();
}

function minusProduct(id) {
    let product = cart.products.find(element => element.id === id);
    if (product.quantity !== 1) {
        product.quantity--;
        renderCart();
    }
}

function plusProduct(id) {
    let product = cart.products.find(element => element.id === id);
    product.quantity++;
    renderCart();
}

function run() {
    renderCart();
    renderProducts();
    document.addEventListener('click', (e) => {
        if (e.target['id'] !== undefined) {
            const arr = e.target['id'].split('-');
            const obj = {
                value: arr[0],
                id: +arr[1]
            };

            switch (obj.value) {
                case 'plus':
                    plusProduct(obj.id);
                    break;
                case 'minus':
                    minusProduct(obj.id);
                    break;
                case 'delete':
                    deleteProduct(obj.id);
                    break;
                case 'add':
                    addProduct(obj.id);
                    break;
            }

        }
    });
}

export { run as basket }