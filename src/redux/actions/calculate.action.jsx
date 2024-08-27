import {
    CALCULATION_REQUEST,
    CALCULATION_SUCCESS,
    CALCULATION_FAILURE
  } from "../types/types";

export const calculate = (number1, number2, operator) => async (dispatch) => {
  dispatch({ type: CALCULATION_REQUEST });
  try {
    const response = await fetch('https://your-heroku-api-url.com/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ number1, number2, operator }),
    });

    const data = await response.json();
    dispatch({ type: CALCULATION_SUCCESS, payload: data.result });
  } catch (error) {
    dispatch({ type: CALCULATION_FAILURE, payload: error.message });
  }
};