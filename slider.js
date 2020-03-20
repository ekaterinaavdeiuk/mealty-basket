let sliderImg = [
    {
        image: '4b60cbef8493e46e'
    },
    {
        image: '3c6a58870c01c5fc'
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
]

function createSliderElements(i) {
    let div = document.querySelector('.slider');
    let img = document.createElement('div');
    img.classList.add('slider-img');
    img.style.backgroundImage = `url(img/${sliderImg[i].image})`;
    div.append(img);
}