class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/'
	_apiKey = 'apikey=a285a8d78384d1f057c9c49da8157a43'
	getResourse = async url => {
		let res = await fetch(url)

		if (!res.ok) {
			throw new Error(`Cloud not fetch${url}, status:  ${res.status}`)
		}
		return await res.json()
	}

	getAllCharacters = async () => {
		const res = await this.getResourse(
			`${this._apiBase}characters?limit=9&offset=250&${this._apiKey}`
		)
		return res.data.results.map(this._transformChar)
	}

	getCharacter = async id => {
		const res = await this.getResourse(
			`${this._apiBase}characters/${id}?${this._apiKey}`
		)

		return this._transformChar(res.data.results[0])
	}

	_transformChar = char => {
		return {
			id: char.id,
			name: char.name,
			description:
				char.description || 'Ops this Charecter has no description',
			thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url
		}
	}
}

export default MarvelService
