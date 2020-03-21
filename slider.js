let sliderImg = [
    {
        image: '4b60cbef8493e46e'
    },
    {
        image: 'c966886a422abdad'
    },
    {
        image: '3c6a58870c01c5fc'
    },
    {
        image: '900fac11da4ba67b'
    },
    {
        image: '8cdf533eeaae47a9'
    },
    {
        image: 'fcf5c9764ce8d00d'
    }
];

function createSliderElements(obj) {
    let img = document.createElement('div');
    img.classList.add('slider-img');
    img.style.backgroundImage = `url(img/${obj.image}.jpeg)`;
    return img;
}

function createSliderButtonLeft() {
    let div = document.querySelector('#app');
    let buttonLeft = document.createElement('button');
    buttonLeft.classList.add('button-slider');
    buttonLeft.innerText = ' НАЖМИ МЕНЯ!! ';
    buttonLeft.id = 'left';
    div.append(buttonLeft);
}

function renderSliderImg() {
    document.querySelector('.slider').append(...sliderImg.map(element => createSliderElements(element)));
}


let currentImg = 0;
function slider() {
    let parent = document.querySelector('.slider');
    for (let i = 0; i < sliderImg.length; i++) {
        parent.children[i].classList.add('opacity0');
    }
    parent.children[currentImg].classList.remove('opacity0');
    currentImg++;
    if (currentImg === sliderImg.length) {
        currentImg = 0;
    }
}

function sliderEvent() {
    renderSliderImg();
    document.addEventListener('click', (e) => {
        if (e.target['id'] === 'left') {
            slider();
        }
    });
}

export {createSliderButtonLeft as button}
export {sliderEvent as sliderRend}