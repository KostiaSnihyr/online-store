let searchFilter = {};
const dataFilters = {
		'sneakers': {
			filter: {
				'Brand': null,
				'Size': null
			},
			arr: {
				'Brand': ['Nike', 'Puma', 'Adidas', 'Reebok'],
				'Size': ['41', '42', '43', '44']
			}
		},
		't-shirts': {
			filter: {
				'Brand': null,
				'Size': null
			},
			arr: {
				'Brand': ['Tommy Hilfiger', 'Gucci', 'Lacoste', 'Nike'],
				'Size': ['s', 'm', 'l', 'xl']
			}
		},
		'caps': {
			filter: {
				'Shape': null,
				'Brand': null
			},
			arr: {
				'Shape': ['Snapback', 'Flexfit', 'Kids', 'Flat Caps'],
				'Brand': ['Bailey', '47 Brand', 'Adidas', 'Alpinestars', 'Bacpakr']
			}
		},
		'bags': {
			filter: {
				'Size': null,
				'Occasion': null,
				'Material': null,
				'Brand': null
			},
			arr: {
				'Size': ['large', 'small', 'medium'],
				'Occasion': ['Work', 'Travel', 'Day to night', 'Party'],
				'Material': ['Canvas', 'Hunter Leather', 'Classic Leather'],
				'Brand': ['Lacoste', 'LV', 'Adidas', 'Reebok']
			}
		}
	},
	filterCategory = document.querySelector('.js-filter-category'),
	containerAdditionalFilters = document.querySelector('.js-container-filters'),
	wrapperProducts = document.querySelector('.js-filter__items');



filterCategory.addEventListener('click', function(e) {
	const clickEl = e.target; // кликнутый элемент
	// если клик на label или input
	if(clickEl.tagName === 'LABEL' || clickEl.tagName === 'INPUT') {

		// получили у li, в котором лежат label и input название фильтра из
		// аттрибута data-filter
		const curFilter = clickEl.parentNode.getAttribute('data-filter');

		// из объекта, в котором расположены под фильтры для фильтров
		// получаем информацию по текущему фильтру в виде объекта
		// информация хранит выбран ли текущий фильтр и массив под фильтров

		let prop;
		for(prop in dataFilters[curFilter].arr) {
			const chosenFilter = dataFilters[curFilter];
			// если фильтр кликнут - добавляем под фильтры
			// если нет - скрываем фильтры
			
			if(clickEl.parentNode.querySelector('input').checked) {
				searchFilter[curFilter] = {};
				// если фильтр создан - проявляем его
				// если фильтр не создан - создаем, при создании - кешируем фильтр в объекте
				if(chosenFilter.filter[prop]) {
					chosenFilter.filter[prop].style.display = 'block';

					// убираем CHECKED У INPUT-а
					const arrCheckbox = chosenFilter.filter[prop].querySelectorAll('input');
					let i = -1;
					while(++i < arrCheckbox.length) arrCheckbox[i].checked = false;
				} else {
					// console.log(chosenFilter.arr[prop]);
					chosenFilter.filter[prop] = createFilter(chosenFilter.arr[prop], curFilter, prop);
					containerAdditionalFilters.appendChild( chosenFilter.filter[prop] );
				}
			} else {
				if(chosenFilter.filter[prop]) chosenFilter.filter[prop].style.display = 'none';
				delete searchFilter[curFilter];
			}
			filterProd(prods, searchFilter, wrapperProducts);
		}

		// console.log(searchFilter);
	}
}, false);

// функция создает разметку для фильтра
function createFilter(arr, filterName, mode) {
	// console.log(filterName);
	filterNameFL = filterName[0].toUpperCase() + filterName.substr(1);

	const container = document.createElement('div'),
		title = document.createElement('span'),
		ul = document.createElement('ul');
	let li, label, checkbox;
	container.className = 'dropdown-brand-list';
	title.className = 'dropdown-brand-list__header';
	ul.className = 'dropdown-brand-list__items';
	title.innerText = `Select ${mode} for ${filterNameFL}:`;

	let filter;
	for(filter of arr) {
		li = document.createElement('li');
		label = document.createElement('label');
		checkbox = document.createElement('input');

		li.setAttribute('data-filter', filter.toLowerCase());
		li.className = 'dropdown-brand-list__list';
		label.innerText = filter;
		checkbox.type = 'checkbox';
		checkbox.id = `filter${filter}`;
		label.setAttribute('for', `filter${filter}`);

		li.appendChild(checkbox);
		li.appendChild(label);
		ul.appendChild(li);
	}

	ul.addEventListener('click', function(e) {
		const clickEl = e.target;
	
		if(clickEl.tagName === 'LABEL' || clickEl.tagName === 'INPUT') {
			const curFilter = clickEl.parentNode.getAttribute('data-filter');

			if(clickEl.parentNode.querySelector('input').checked) {
				searchFilter[filterName][curFilter] = 1;
			} else {
				delete searchFilter[filterName][curFilter];
			}
			filterProd(prods, searchFilter, wrapperProducts);
		}
		
		// console.log(searchFilter);
	});

	container.appendChild(title);
	container.appendChild(ul);

	return container;
}





/*

let a = 1;
let b = ++a;

// a = 2
// b = 2

{
	let a = 1;
	let b = a++;

	// a = 2
	// b = 1

}

.then() // no error
.catch() // no
.then() // error 1
.then()
.catch() // error 1, return 22
.then() // на вход получает 22
*/




/*
	data.category
	data.brand
	data.color
// shoes
	// bags

	sneakers
	t-shirts
		data.size

	// caps
	// 	Shape
	// bags
	// 	Occasion
	// 	Material
*/



function filterProd(prods, filters, containerProducts) {
	// отбриаем и сортируем массив товаров
	let resProds = [], tempArr;
	for(let cat in filters) {
		// сортировка по категории
		tempArr = prods.filter(prod => prod.category === cat);
		resProds.push(...tempArr); // достать элементы из массива

		console.log(cat, filters[cat]);
	}
	console.log(resProds);

	// выводим товары в виде карточек на экран
	containerProducts.innerHTML = '';
	for (let i = 0; i < resProds.length; i++) {
		containerProducts.appendChild(createProd(resProds[i]));
	}
	return resProds;
}
function createProd(data) {
	const card = document.createElement('div'),
		  img = document.createElement('img'),
		  title = document.createElement('div'),
		  price = document.createElement('div');
	card.className = 'card';
	img.className = 'card__img';
	title.className = 'card__title';
	price.className = 'card__price';

	card.setAttribute('data-id', data.id);


	img.setAttribute('src', data.image);
	img.setAttribute('alt', 'product image');
	title.innerText = data.title;
	price.innerText = `$ ${data.price}`;

	card.appendChild(img);
	card.appendChild(title);
	card.appendChild(price);

	return card;
}
