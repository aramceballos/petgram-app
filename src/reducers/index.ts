const reducer = (state, { type, payload }: any) => {
  switch (type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: payload,
      };
    case 'SET_USER_INFO':
      return {
        ...state,
        userInfo: payload,
      };

    default:
      return state;
  }
};

export default reducer;
