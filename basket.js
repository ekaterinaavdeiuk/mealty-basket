let catalog = [
    {
        id: 1,
        name: 'Салат с языком и рукколой в ореховом соусе',
        category: 'Салаты',
        image: '4b60cbef8493e46e',
    },
    {
        id: 2,
        name: 'Суп Том Ям',
        category: 'Супы',
        image: 'c966886a422abdad',
    },
    {
        id: 3,
        name: 'Суп-пюре из шампиньонов со сливками',
        category: 'Супы',
        image: '3c6a58870c01c5fc',
    },
    {
        id: 4,
        name: 'Котлетки из куриного филе в сливочно-грибном соусе с запеченным картофелем',
        category: 'Вторые блюда',
        image: '900fac11da4ba67b',
    },
    {
        id: 5,
        name: 'Сэндвич с курицей и авокадо',
        category: 'Вторые блюда',
        image: '8cdf533eeaae47a9',
    },
    {
        id: 6,
        name: 'Напиток ягодный из черной смородины',
        category: 'Напитки',
        image: 'fcf5c9764ce8d00d',
    }
];

const categoryPrice = [
    {
        category: 'Напитки',
        price: 50,
        currency: 'RUR'
    },
    {
        category: 'Вторые блюда',
        price: 180,
        currency: 'RUR'
    },
    {
        category: 'Супы',
        price: 120,
        currency: 'RUR'
    },
    {
        category: 'Салаты',
        price: 120,
        currency: 'RUR'
    }
];


let cart = {
    amount: 0,  //итоговая стоимость
    products: [] //продукты
};

//добавление товара в корзину
function addProducts(id) {
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
    sum();
    renderCart();
}

function sum() {
    cart.amount = cart.products.reduce((accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity, 0);
}

function createProduct(product) {
    let div = document.createElement('div');   //создаем div
    div.classList.add('products');
    let img = document.createElement('div');
    img.classList.add('img');
    img.style.backgroundImage = `url(img/${product.image}.jpeg)`;
    let name = document.createElement('p');    //создаем p название товара
    name.innerText = product['name'];
    let button = document.createElement('button');  //создаем кнопку Добавить
    button.innerText = 'Добавить';                           //записываем в кнопку текст
    button.setAttribute('onclick', `addProducts(${product.id})`);  //даем кнопки атрибут
    let price = document.createElement('p');
    price.innerText = replacePrice(categoryPriceFindElement(product['category']));
    div.append(img);
    div.append(name);
    div.append(price);
    div.append(button);
    return div;
}

function createProductInBasket(product) {
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

function create(tag) {
    return document.createElement(tag);
}

function categoryPriceFindElement(category) {
    return categoryPrice.find(element => element.category === category);
}

function replacePrice(element) {
    switch (element.currency) {
        case 'RUR':
            return `${element.price} руб.`;
        case 'USD':
            return `${element.price} долл.`;
    }
}

function renderProducts() {
    let div = document.querySelector('.catalog');
    catalog.forEach(element => {
        div.append(createProduct(element))
    });
}

function renderCart() {
    let div = document.querySelector('.cart');
    if (document.querySelector('.price') !== null) {
        document.querySelector('.price').innerText = `Цена: ${cart.amount} руб.`;
    } else {
        let price = document.createElement('p');
        price.classList.add('price');
        price.innerText = `Цена: ${cart.amount} руб.`;
        div.append(price);
    }
    let b = document.querySelector('.cart-products');
    if (b.children.length > 0) {
        b.innerHTML = '';
    }
    cart.products.forEach(element => b.append(createProductInBasket(element)));
}

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
                let plus = cart.products.find(element => element.id === obj.id);
                plus.quantity++;
                sum();
                renderCart();
                break;
            case 'minus':
                let minus = cart.products.find(element => element.id === obj.id);
                if (minus.quantity !== 1) {
                    minus.quantity--;
                    sum();
                    renderCart();
                }
                break;
            case 'delete':
                let index = cart.products.findIndex(element => element.id === obj.id);
                cart.products.splice(index, 1);
                sum();
                renderCart();
                break;
        }
    }
});