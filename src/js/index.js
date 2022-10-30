const input = document.querySelector('input'),
	button = document.querySelector('button'),
	outputBlock = document.querySelector('.hero__cards'),
	quantityBlock = document.querySelector('.hero__quantity')

const template = ({ items }) =>
	items.map(item =>
		outputBlock.insertAdjacentHTML(
			'beforeend',
			`
					<div class="hero__card card">
						<img src="./icons/folder.svg" alt="folder image">
						<div class="card__info">
							<a href="${item.clone_url}" class="card__link">${item.full_name}</a>
							<p class="card__description">
							${item.description ? item.description : 'Without description'}
							</p>
						</div>
					</div>
				`
		)
	)

const renderCount = ({ total_count: qty }) =>
	qty
		? (quantityBlock.textContent = `Найдено ${qty} результатов`)
		: (quantityBlock.textContent = 'По вашему запросу ничего не найдено')

const clearing = () => {
	outputBlock.innerHTML = null
	quantityBlock.textContent = ''
}

const onSubmitStart = () => (quantityBlock.textContent = 'Загрузка...')

const onSubmit = async () => {
	const response = await fetch(
		`https://api.nomoreparties.co/github-search?q=*${input.value}`
	)
	const data = await response.json()

	renderCount(data)
	template(data)
}

button.addEventListener('click', evenet => {
	clearing()
	onSubmitStart()
	onSubmit()
})
