import { catalog, categoryPrice } from './db.js'

const cart = {
    currency: 'RUR',
    amount: 0,
    products: []
};

const categoryPriceFindElement = category =>
    categoryPrice.find(element => element.category === category);

const replacePrice = (element, html = false) =>
    html ? `<span>${element.price}</span> руб` : `${element.price} руб`;

const createProductCard = product => {
    let div = document.createElement('div');
    let img = document.createElement('div');
    let name = document.createElement('p');
    let price = document.createElement('p');
    let button = document.createElement('button');

    div.classList.add('products');
    img.classList.add('card-img');
    img.style.backgroundImage = `url(img/${product.image}.jpeg)`;
    name.innerText = product['name'];
    name.classList.add('card-name');
    price.insertAdjacentHTML('afterbegin', replacePrice(categoryPriceFindElement(product['category']), true));
    price.classList.add('card-price');
    button.innerText = 'В корзину';
    button.id = `add-${product.id}`;
    button.classList.add('card-button');

    div.append(img);
    div.append(name);
    div.append(price);
    div.append(button);

    return div;
};

const renderProducts = () => {
    document.querySelector('.catalog').append(
        ...catalog.map(element => createProductCard(element))
    );
};

const createProductInBasketCard = product => {
    let productCard = document.createElement('div');
    let img = document.createElement('div');
    let nameQuantity = document.createElement('div');
    let name = document.createElement('p');
    let buttons = document.createElement('div');
    let buttonPlus = document.createElement('button');
    let quantity = document.createElement('div');
    let buttonMinus = document.createElement('button');
    let deleteProduct = document.createElement('button');

    productCard.classList.add('basket-products');
    img.classList.add('img', 'img-small');
    img.style.backgroundImage = `url(img/${product.image}.jpeg)`;
    nameQuantity.classList.add('name-quantity');
    name.innerText = product['name'];
    buttons.classList.add('buttons');
    buttonPlus.classList.add('button-plus');
    buttonPlus.id = `plus-${product.id}`;
    buttonPlus.innerText = '+';
    quantity.classList.add('quantity');
    quantity.innerText = product['quantity'];
    buttonMinus.classList.add('button-minus');
    buttonMinus.innerText = '-';
    buttonMinus.id = `minus-${product.id}`;
    deleteProduct.classList.add('delete');
    deleteProduct.innerText = 'x';
    deleteProduct.id = `delete-${product.id}`;

    buttons.append(buttonPlus);
    buttons.append(quantity);
    buttons.append(buttonMinus);
    nameQuantity.append(name);
    nameQuantity.append(buttons);
    productCard.append(img);
    productCard.append(nameQuantity);
    productCard.append(deleteProduct);

    return productCard;
};

const renderCart = () => {
    cart.amount = cart.products.reduce((accumulator, currentValue) =>
        accumulator + currentValue.price * currentValue.quantity, 0);

    let price = document.querySelector('.price');
    if (price !== null) {
        price.innerText = `Итого: ${replacePrice({price: cart.amount, currency: cart.currency})}`;
    } else {
        let tag = document.createElement('p');
        tag.classList.add('price');
        tag.innerText = `Итого: ${replacePrice({price: cart.amount, currency: cart.currency})}`;
        document.querySelector('.cart').append(tag);
    }

    let cartProducts = document.querySelector('.cart-products');

    if (cartProducts.children.length > 0) {
        cartProducts.innerHTML = '';
    }

    cart.products.forEach(element => cartProducts.append(createProductInBasketCard(element)));
};

const addProduct = (id) => {
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
};

const deleteProduct = (id) => {
    const index = cart.products.findIndex(element => element.id === id);
    cart.products.splice(index, 1);
    renderCart();
};

const minusProduct = (id) => {
    let product = cart.products.find(element => element.id === id);
    if (product.quantity !== 1) {
        product.quantity--;
        renderCart();
    }
};

const plusProduct = (id) => {
    let product = cart.products.find(element => element.id === id);
    product.quantity++;
    renderCart();
};

const eventListener = () => {
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
                case 'slider':
                    console.log(obj.id);
                    break;
            }
        }
    });
};

const run = () => {
    renderCart();
    renderProducts();
    eventListener();
};

export { run as basket }