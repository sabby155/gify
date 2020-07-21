const defaultState = {
    currentUser: null,
    term: '',
    gifs: [],
    favorites: [],
    copiedGif: [],
    searchBarClicked: false,
    randomGif: null
}

const reducer = (state=defaultState, action) => {
    switch(action.type) {
        case "SET_CURRENT_USER": 
            return {...state, currentUser: action.payload} 
        
        case "SET_USER_FAVORITES":
            return {...state, favorites: action.payload}

        case "SET_TERM_CHANGE": 
            return {...state, term: action.payload} 

        case "SAVE_GIFS": 
            return {...state, gifs: action.payload} 

        case "SAVE_RANDOM_GIF": 
            return {...state, randomGif: action.payload} 

        case "SET_COPIED_LINK_GIF": 
            return {... state, copiedGif: action.payload}

        case "SET_SEARCHBAR_CLICK": 
            return {... state, searchBarClicked: action.payload}

        case "SAVE_GIF_TO_FAVORITES": 
            let duplicateFound = [...state.favorites].find(gif => gif.id === action.payload.id)
            if (duplicateFound) {
                return {...state, favorites: state.favorites}
            } else {
                let addedFavorites = [...state.favorites, action.payload]
                //this is where im storing & resetting the data back into local storage
                localStorage.setItem('storedGifs', JSON.stringify(addedFavorites))
                const storedGifs = JSON.parse(localStorage.getItem('storedGifs'))
                return {...state, favorites: storedGifs} 
            }
        
        case "REMOVE_GIF_FROM_FAVORITES": 
            let filteredFaves = [...state.favorites].filter((gif) => gif.id !== action.payload)
            localStorage.setItem('storedGifs', JSON.stringify(filteredFaves))

            const storedGifs = JSON.parse(localStorage.getItem('storedGifs'))
            return {...state, favorites: storedGifs} 
        
        case "REMOVE_USER_DATA": 
            return {...state, currentUser: null, term: '', gifs: [], favorites: []} 
        
        default: 
        return state
    }
} 
export default reducer 