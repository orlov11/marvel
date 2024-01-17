import { toast } from 'react-toastify'

class MarvelService {
	getResouresre = async url => {
		let res = await fetch(url)
		if (!res.ok) {
			toast(`Error ${res.status}`)
			throw new Error(`Error in ${url} status: ${res.status}`)
		}
		return await res.json()
	}
}
