import {useHttp} from "../components/hooks/http.hook";


const useMarvelService = () => {
    const {loading, error, request} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=c60d58c88adfd0f7e02803c0c818876c';
    const _offsetBase = 210;

    const getAllCharacters = async (offset = _offsetBase) =>{
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async(id) =>{
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformCharacter(res.data.results[0])
    }

    const _transformCharacter = (char) =>{
        return{
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {loading, error, getAllCharacters, getCharacter}
}

export default useMarvelService