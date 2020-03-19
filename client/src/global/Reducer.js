const Reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        loggedIn: action.payload,
        userInfo: action.userInfo
      };
    default:
      return state;
  }
};

export default Reducer;