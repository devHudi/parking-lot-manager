export const initialState = {
  visible: false,
};

// action types
export const SHOW_SPINNER = "showSpinner";
export const HIDE_SPINNER = "hideSpinner";

// actions
export const showSpinner = {
  type: SHOW_SPINNER,
};

export const hideSpinner = {
  type: HIDE_SPINNER,
};

// reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SPINNER: {
      return {
        ...state,
        visible: true,
      };
    }
    case HIDE_SPINNER: {
      return {
        ...state,
        visible: false,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;
