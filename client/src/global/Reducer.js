const Reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        loggedIn: action.payload,
        userInfo: action.userInfo
      };
    case 'SET-JOBS':
      return {
        ...state,
        jobs: action.payload,
      }
    default:
      return state;
  }
};

export default Reducer;