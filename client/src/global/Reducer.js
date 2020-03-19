const Reducer = (state, action) => {
  switch (action.type) {
      case 'LOGIN':
          return {
              ...state,
              loggedIn: action.payload
          };
      default:
          return state;
  }
};

export default Reducer;