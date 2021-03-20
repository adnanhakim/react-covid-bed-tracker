export const initialState = {
   sidebar: 'HOME',
   query: '',
   selectedHospital: '',
   selectedHospitalId: '',
   username: '',
   status: '',
   reload: false,
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
      case 'SET_USERNAME':
         return {
            ...state,
            username: action.username,
         };
      case 'SET_STATUS':
         return {
            ...state,
            status: action.status,
         };
      case 'SET_RELOAD':
         return {
            ...state,
            reload: action.reload,
         };
      default:
         return state;
   }
}

export default reducer;
