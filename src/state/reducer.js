export const initialState = {
   sidebar: 'HOME',
   query: '',
   selectedHospital: '',
   selectedHospitalId: '',
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
      case 'SET_SELECTED_HOSPITAL':
         return {
            ...state,
            selectedHospital: action.selectedHospital,
         };
      case 'SET_SELECTED_HOSPITAL_ID':
         return {
            ...state,
            selectedHospitalId: action.selectedHospitalId,
         };
      default:
         return state;
   }
}

export default reducer;
