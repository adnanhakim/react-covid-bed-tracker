export const initialState = {
   sidebar: 'HOME',
   query: '',
};

function reducer(state, action) {
   switch (action.type) {
      case 'SET_SIDEBAR':
         return {
            ...state,
            sidebar: action.sidebar,
         };
      case 'SET_QUERY':
         return {
            ...state,
            query: action.query,
         };
      default:
         return state;
   }
}

export default reducer;
