

let searchFilter = {};
// sneakers: {41: "size", 42: "size", nike: "brand", puma: "brand"}
// t-shirts: {tommy hilfiger: "brand", m: "size"}
// bags: {}
// caps: {}

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
	const clickEl = e.target;
	if(clickEl.tagName === 'INPUT') {
		const curFilter = clickEl.parentNode.getAttribute('data-filter');

		let prop;
		for(prop in dataFilters[curFilter].arr) {
			if(clickEl.parentNode.querySelector('input').checked) {
				searchFilter[curFilter] = {};
				dataFilters[curFilter].filter[prop] = createFilter(dataFilters[curFilter].arr[prop], curFilter, prop);
				containerAdditionalFilters.appendChild(dataFilters[curFilter].filter[prop]);
			} else {
				dataFilters[curFilter].filter[prop].innerHTML = '';
				delete searchFilter[curFilter];
			}
		}
		filterProd(prods, searchFilter, wrapperProducts);
	}
});

function createFilter(arr, filterName, mode) {
	filterNameFL = filterName[0].toUpperCase() + filterName.substr(1);

	const container = document.createElement('div'),
		title = document.createElement('span'),
		ul = document.createElement('ul');
	let li, label, checkbox;

	title.innerText = `Select ${mode} for ${filterNameFL}:`;

	let filter;
	for(filter of arr) {
		li = document.createElement('li');
		label = document.createElement('label');
		checkbox = document.createElement('input');

		li.setAttribute('data-filter', filter.toLowerCase());
		li.setAttribute('data-mode', mode.toLowerCase());
		label.innerText = filter;
		label.setAttribute('for', `filter${filter}${filterName}`);
		checkbox.type = 'checkbox';
		checkbox.id = `filter${filter}${filterName}`;

		li.appendChild(checkbox);
		li.appendChild(label);
		ul.appendChild(li);
	}

	ul.addEventListener('click', function(e) {
		const clickEl = e.target;
		if(clickEl.tagName === 'INPUT') {
			curFilter = clickEl.parentNode.getAttribute('data-filter');
			if(clickEl.parentNode.querySelector('input').checked) {
				searchFilter[filterName][curFilter] = clickEl.parentNode.getAttribute('data-mode');
			} else {
				delete searchFilter[filterName][curFilter];
			}
			filterProd(prods, searchFilter, wrapperProducts);
		}
	})

	container.appendChild(title);
	container.appendChild(ul);

	return container;
}

function filterProd(prods, searchFil, containerProducts) {
	let resProds = [],
		tempArr,
		groupFilters;
	
		for(let cat in searchFil) {
			// 1) filter prod by category
			tempArr = prods.filter(prod => prod.category === cat);

			// cteate object to display: size: ["42", "43"] brand: ["nike", "puma"]
			groupFilters = (function() {
				let group = {};
				for(const propProd in searchFil[cat]) { // propProd => 41/42/43/nike/puma/adidas
					const filterName = searchFil[cat][propProd]; // size/brand
					if(filterName in group) group[filterName].push(propProd);
					else group[filterName] = [propProd];
				}
				return group;
			})();
			
			// 2) loop through filtered prods by category to classify it by size/brand/material/occasion
			for(const filterName in groupFilters) {
				const arrFilterValue = groupFilters[filterName]; //["42", "43"]/["nike", "puma"]
				
				tempArr = tempArr.filter(prod => {
					let isEmpty = true,
						isAppropriate = false;
	
					for(const value of arrFilterValue) {
						isEmpty = false;
						if(prod[ filterName ] === value) {
							isAppropriate = true;
							break;
						}
					}
					return isEmpty || isAppropriate;
				});
				console.log(tempArr);
			}
			

			resProds.push(...tempArr);
		}

	
	// show items on the screen
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