
import { createContext} from 'react'

export default function reducer (state, action){
    switch(action.type) {
        case 'setEntries':
          return {
            ...state,
            entries: action.data
          }
        case 'add entry':
          return {
            ...state,
            entries:[...state.entries, action.data]
          }
        case 'delete entry':
            return {
                ...state,
                entries: state.entries.filter(entry => entry._id !== action.id)
            }
        case 'update entry':
            return {
                ...state,
                entries: state.entries.map(entry => {
                  if (entry._id === action.id) {
                    return { ...entry, content: action.content }
                  }
                  return entry;
                })
              }
        case 'setCategories':
                return {
                  ...state,
                  categories: action.data
                }
        case 'add category':
          return {
            ...state,
            categories:[...state.categories, action.data]
          }
    }
    return state
  }
  
  export const journalContext = createContext()