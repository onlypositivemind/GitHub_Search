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
					<a target="_blank" href="${item.clone_url}" class="card__link">
					${item.full_name}</a>
					<p class="card__description">
					${item.description ? item.description : 'Without description'}</p>
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

const disableSearch = bool => (
	(button.disabled = bool), (input.disabled = bool)
)

const onSubmitStart = () => (quantityBlock.textContent = 'Загрузка...')

const renderError = () => (quantityBlock.textContent = 'Произошла ошибка')

const getData = async url => {
	const resposne = await fetch(url)
	const json = await resposne.json()
	return json
}

const url = 'https://api.nomoreparties.co/github-search?q=*'

const onSubmit = async () => {
	disableSearch(true)
	clearing()
	onSubmitStart()

	try {
		const data = await getData(url + `${input.value}`)
		renderCount(data)
		template(data)
	} catch (error) {
		console.log(error)
		renderError()
	}

	disableSearch(false)
}

button.addEventListener('click', onSubmit)

input.addEventListener('keypress', event => {
	if (event.code === 'Enter') onSubmit()
})
