const Reducer = (state, action) => {
  // console.log(action.payload);
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        loggedIn: action.payload.loggedIn,
        userInfo: action.payload.userInfo
      };
    case 'SET-JOBS':
      return {
        ...state,
        jobs: action.payload,
      }
    case 'SET-USER-SKILLS':
      return {
        ...state,
        userSkills: action.payload,
      }
    default:
      return state;
  }
};

export default Reducer;