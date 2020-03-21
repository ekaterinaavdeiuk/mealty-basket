const sliderImages = [
    {
        image: '4b60cbef8493e46e',
        id: 1
    },
    {
        image: 'c966886a422abdad',
        id: 2
    },
    {
        image: '3c6a58870c01c5fc',
        id: 3
    },
    {
        image: '900fac11da4ba67b',
        id: 4
    },
    {
        image: '8cdf533eeaae47a9',
        id: 5
    },
    {
        image: 'fcf5c9764ce8d00d',
        id: 6
    }
];

const createSliderElements = obj => {
    let img = document.createElement('div');
    img.classList.add('slider-img');
    img.style.backgroundImage = `url(img/${obj.image}.jpeg)`;
    img.classList.add('hidden-slider-img');
    img.id = `slider-${obj.id}`;
    return img;
};

const renderSlider = () => {
    document.querySelector('.slider').append(
        ...sliderImages.map(element => createSliderElements(element))
    );
};

const changeSlide = (slides, index) => {
    slides[index.current].classList.remove('hidden-slider-img');
    slides[index.previous].classList.add('hidden-slider-img');
    index.previous = index.current;
    index.current === slides.length - 1 ? index.current = 0 : index.current++;
};

function run() {
    renderSlider();
    const slides = document.querySelectorAll('.slider-img');
    const index = {current: 0, previous: slides.length - 1};
    changeSlide(slides, index);
    setInterval(() => {changeSlide(slides, index)}, 5000);
}

export {run as slider}