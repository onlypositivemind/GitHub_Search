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

const renderEmptyResults = () =>
	(quantityBlock.textContent = 'По вашему запросу ничего не найдено')

const renderCount = ({ total_count }) => {
	if (total_count > 0)
		quantityBlock.textContent = `Найдено ${total_count} результатов`
	else renderEmptyResults()
}

const clearing = () => {
	outputBlock.innerHTML = null
	quantityBlock.textContent = ''
}

const disableSearch = bool => {
	return bool
		? ((button.disabled = true), (input.disabled = true))
		: ((button.disabled = false), (input.disabled = false))
}

const onSubmitStart = () => (quantityBlock.textContent = 'Загрузка...')

const onSubmit = async () => {
	disableSearch(true)

	const response = await fetch(
		`https://api.nomoreparties.co/github-search?q=*${input.value}`
	)
	const data = await response.json()

	renderCount(data)
	template(data)

	disableSearch(false)
}

button.addEventListener('click', evenet => {
	clearing()
	onSubmitStart()
	onSubmit()
})

input.addEventListener('keypress', evenet => {
	if (evenet.code === 'Enter') {
		clearing()
		onSubmitStart()
		onSubmit()
	}
})
