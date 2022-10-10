class Carousel {
	constructor(setting) {
		/* Scope privates methods and properties */
		let privates = {};

		// Prev slide
		this.prev_slide = () => {
			if (!privates.isAnimationEnd) {
				return;
			}

			privates.isAnimationEnd = false;

			--privates.opt.position;

			if (privates.opt.position < 0) {
				privates.selectors.wrap.classList.add('notransition');
				privates.selectors.wrap.style["transform"] = `translateX(-${privates.opt.max_position}00%)`;
				privates.opt.position = privates.opt.max_position - 1;
			}

			setTimeout(() => {
				privates.selectors.wrap.classList.remove('notransition');
				privates.selectors.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
			}, 10);

			privates.selectors.wrap.addEventListener('transitionend', () => {
				privates.isAnimationEnd = true;
			});
		};


		// Next slide
		this.next_slide = () => {
			console.log('next slide clicked');
			// Не реагировать на нажатия при анимации
			if (!privates.isAnimationEnd) {
				return;
			}

			// анимация завершена
			privates.isAnimationEnd = false;

			console.log('privates.opt.position', privates.opt.position);
			// если не граничный слайд -> увеличить индекс смещения
			// opt.position - процент смещения
			if (privates.opt.position < privates.opt.max_position) {
				++privates.opt.position;
			}

			// notransition - устанавливает в 0 transition - зачем?
			privates.selectors.wrap.classList.remove('notransition');
			// смещение по Х внутри wrap объекта на opt.position-процент
			privates.selectors.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;

			// добавить слушатель события завершения перемещения
			// в обычном случае установить флаг окончания анимации
			// в пограничном случае изменить текущее смещение на 0
			// , установить текущую позицию на первый элемент
			// TODO добавить перегенерацию зверей в первом блоке
			privates.selectors.wrap.addEventListener('transitionend', () => {
				if (privates.opt.position >= privates.opt.max_position) {
					privates.selectors.wrap.style["transform"] = 'translateX(0)';
					privates.selectors.wrap.classList.add('notransition');
					privates.opt.position = 0;
				}

				privates.isAnimationEnd = true;
			});

			if (privates.setting.autoplay === true) {
				privates.timer.become();
			}
		};

		/* privates properties */
		privates.default = {};

		privates.setting = Object.assign(privates.default, setting);

		privates.isAnimationEnd = true;

		privates.selectors = {
			"wrap": document.querySelector(privates.setting.wrap),
			"children": document.querySelector(privates.setting.wrap).children,
			"prev": document.querySelector(privates.setting.prev),
			"next": document.querySelector(privates.setting.next)
		};

		privates.opt = {
			"position": 0,
			"max_position": document.querySelector(privates.setting.wrap).children.length
		};


		/* Constructor */
		// Clone first elem to end wrap
		privates.selectors.wrap.appendChild(privates.selectors.children[0].cloneNode(true));

		// Control
		if (privates.selectors.prev !== null) {
			privates.selectors.prev.addEventListener('click', () => {
				this.prev_slide();
			});
		}

		if (privates.selectors.next !== null) {
			privates.selectors.next.addEventListener('click', () => {
				this.next_slide();
			});
		}
	}
}

new Carousel({
	"wrap": ".pets-carousel-wrapper",
	"prev": ".pets-prev-image",
	"next": ".pets-next-image",
});