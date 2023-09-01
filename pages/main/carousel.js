import { getRandomPets, getPetImagePathByImage, getDietImgByDietName } from '../../assets/scripts/pets.js'

class Carousel {
	currentPosition = 0;
	selectors;

	generateNewPets(count = 6) {
		const imageBlocks = this.selectors.children;
		for (let i = 0; i < imageBlocks.length; i++) {
			if (i === this.currentPosition) {
				continue;
			}
			const randomPets = getRandomPets(count);

			// replace image
			const imageEls = imageBlocks[i].querySelectorAll('.pets-img-wrapper > img');

			for (let imgi = 0; imgi < imageEls.length; imgi++) {
				imageEls[imgi].outerHTML = `<img src="${getPetImagePathByImage(randomPets[imgi].image)}" alt="pet ${imgi}" class="pets-img"></img>`;
			}

			// replace info
			const infoEls = imageBlocks[i].querySelectorAll('.pets-info');
			for (let infoIndex = 0; infoIndex < infoEls.length; infoIndex++) {
				const petName = infoEls[infoIndex].querySelector('.pets-name');
				petName.outerHTML = `<p class="pets-name">${randomPets[infoIndex].name}</p>`

				const petLocation = infoEls[infoIndex].querySelector('.pets-location');
				petLocation.outerHTML = `<p class="pets-location">${randomPets[infoIndex].location}</p>`

				const petDiet = infoEls[infoIndex].querySelector('.pets-diet');
				const dietIconPath = getDietImgByDietName(randomPets[infoIndex].diet);
				petDiet.outerHTML = `<img src="${dietIconPath}" alt="Pets diet" class="pets-diet">`
			}
		}
	}

	constructor(setting) {
		let privates = {};

		this.prev_slide = () => {
			if (!privates.isAnimationEnd) {
				return;
			}
			this.generateNewPets();
			privates.isAnimationEnd = false;

			--this.currentPosition;

			if (this.currentPosition < 0) {
				this.selectors.wrap.classList.add('notransition');
				this.selectors.wrap.style["transform"] = `translateX(${-privates.opt.max_position * 100}%)`;
				this.currentPosition = privates.opt.max_position - 1;
			}

			setTimeout(() => {
				this.selectors.wrap.classList.remove('notransition');
				this.selectors.wrap.style["transform"] = `translateX(${-this.currentPosition * 100}%)`;
			}, 10);

			this.selectors.wrap.addEventListener('transitionend', () => {
				privates.isAnimationEnd = true;
			});
		};

		this.next_slide = () => {
			// Не реагировать на нажатия при анимации
			if (!privates.isAnimationEnd) {
				return;
			}

			this.generateNewPets();
			// анимация завершена
			privates.isAnimationEnd = false;

			if (this.currentPosition < privates.opt.max_position) {
				++this.currentPosition;
			}

			this.selectors.wrap.classList.remove('notransition');

			this.selectors.wrap.style["transform"] = `translateX(${-this.currentPosition * 100}%)`;

			this.selectors.wrap.addEventListener('transitionend', () => {
				if (this.currentPosition >= privates.opt.max_position) {
					this.selectors.wrap.style["transform"] = 'translateX(0)';
					this.selectors.wrap.classList.add('notransition');
					this.currentPosition = 0;
				}

				privates.isAnimationEnd = true;
			});
		};

		privates.setting = setting;

		privates.isAnimationEnd = true;

		this.selectors = {
			"wrap": document.querySelector(privates.setting.wrap),
			"children": document.querySelector(privates.setting.wrap).children,
			"prev": document.querySelector(privates.setting.prev),
			"next": document.querySelector(privates.setting.next)
		};

		privates.opt = {
			"position": 0,
			"max_position": document.querySelector(privates.setting.wrap).children.length
		};

		// Clone first elem to end wrap
		// this.selectors.wrap.appendChild(this.selectors.children[0].cloneNode(true));

		// Control
		if (this.selectors.prev !== null) {
			this.selectors.prev.addEventListener('click', () => {
				this.prev_slide();
			});
		}

		if (this.selectors.next !== null) {
			this.selectors.next.addEventListener('click', () => {
				this.next_slide();
			});
		}

		this.generateNewPets();
	}
}

const carousel = new Carousel({
	"wrap": ".pets-carousel-wrapper",
	"prev": ".pets-prev-image",
	"next": ".pets-next-image",
});