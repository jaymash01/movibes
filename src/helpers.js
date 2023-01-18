/**
 * Helper functions.
 */

import moment from "moment";

/**
 * Formats a `number` into comma-separated sections.
 * @param number {Number}
 * @returns {String}
 */
export const numberFormat = (number) => {
  let parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

/**
 * Calls a `fn` after a specified `delay` time.
 * @param fn {Function}
 * @param delay {int}
 */
export const debounce = (fn, delay) => {
  if (window.debounceTimeoutID) {
    window.clearTimeout(window.debounceTimeoutID);
  }

  window.debounceTimeoutID = window.setTimeout(fn, delay);
};

/**
 * Formats an error body into a user-friendly error message.
 * @param errorBody
 * @returns {String}
 */
export const formatError = (errorBody) => {
  let message = "Something went wrong.";

  if (errorBody.response) {
    const statusCode = parseInt(errorBody.response.status);
    switch (statusCode) {
      case 401:
      case 403: {
        message = errorBody.response.data.status_message;
      }
        break;
      case 404:
        message = "The requested resource was not found.";
        break;
      case 422: {
        message = errorBody.response.data.status_message;

        if (errorBody.response.data.errors) {
          message = errorBody.response.data.errors.join(", ");
        }
      }
        break;
      default: {
        message = errorBody.response.data.status_message;
      }
        break;
    }
  } else if (errorBody.request) {
    message = "Network connectivity error.";
  }

  return message;
};

export const getReleaseDate = (dateString) => {
  return moment(dateString).format("DD MMMM, YYYY");
};

export const getYearOptions = () => {
  let years = [];
  let start = moment().add("year", -50);
  const date = moment();
  while (date.isSameOrAfter(start)) {
    years[years.length] = date.format("YYYY");
    date.add(-1, "year");
  }

  return years;
};
