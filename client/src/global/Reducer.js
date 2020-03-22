const Reducer = (state, action) => {
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
    case 'SET-SKILLS':
      return {
        ...state,
        skills: action.payload,
      }
    default:
      return state;
  }
};

export default Reducer;