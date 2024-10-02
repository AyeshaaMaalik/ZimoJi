import { TOGGLE_THEME } from '../Themes/ThemeAction';

const initialState = {
  isDay: true,
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        isDay: !state.isDay,
      };
    default:
      return state;
  }
};

export default themeReducer;
