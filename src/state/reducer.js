export const initialState = {
   sidebar: 'HOME',
};

function reducer(state, action) {
   switch (action.type) {
      case 'SET_SIDEBAR':
         return {
            ...state,
            sidebar: action.sidebar,
         };
      default:
         return state;
   }
}

export default reducer;
