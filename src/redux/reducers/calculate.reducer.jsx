import {
  CALCULATION_REQUEST,
  CALCULATION_SUCCESS,
  CALCULATION_FAILURE
} from "../types/types";

// Initial state
const initialState = {
    result: null,
    loading: false,
    error: null,
  };

const calculator = (state = initialState, action) => {
  switch (action.type) {
    case CALCULATION_REQUEST:
      return { ...state, loading: true, error: null };
    case CALCULATION_SUCCESS:
      return { ...state, loading: false, result: action.payload };
    case CALCULATION_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default calculator;