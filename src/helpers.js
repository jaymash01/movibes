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
 * Rounds a `number` to `decimalPlaces`.
 * @param number {Number}
 * @param decimalPlaces {int}
 * @returns {Number}
 */
export const round = (number, decimalPlaces = 0) => {
  number = Math.round(number + "e" + decimalPlaces);
  return Number(number + "e" + -decimalPlaces);
};

/**
 * Strips all non-digit characters from `value` and returns a string of digits.
 * @param value {*}
 * @returns {*}
 */
export const validateInteger = (value) => {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "string") {
    return Array.prototype.slice
      .call(value)
      .filter((c) => /\d+/.test(c))
      .join("");
  }
};

/**
 * Capitalizes each first letter of each word in a `text`.
 * @param text {String}
 * @returns {String}
 */
export const capitalize = (text) => {
  return text
    .split(" ")
    .map((e) => e.charAt(0).toUpperCase() + e.substr(1).toLowerCase())
    .join(" ");
};

/**
 * Formats a date object or string to the format of year-month-date.
 * @param date
 * @returns {String}
 */
export const formatDateForDb = (date) => {
  if (typeof date === "string") date = new Date(date);
  return moment(date).format("YYYY-MM-DD");
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
 * Returns an empty object if the argument is null.
 * @param object
 * @returns {Object}
 */
export const getNonNull = (object) => (object ? object : {});

/**
 * Get common validation rules.
 * @returns {Object}
 */
export const getValidationRules = () => {
  return {
    required: (value) => !!value || "This field is required.",
    integer: (value) => {
      const pattern = /^-?\d+$/;
      return pattern.test(value) || "Invalid integer.";
    },
    optionalInteger: (value) => {
      const pattern = /^-?\d+$/;
      return !value ? true : (pattern.test(value) || "Invalid integer.");
    },
    number: (value) => {
      const pattern = /^-?\d*\.?\d+$/;
      return pattern.test(value) || "Invalid number.";
    },
    phone: (value) => {
      const pattern = /^0\d{9}$/;
      return pattern.test(value) || "Invalid phone number.";
    },
    optionalPhone: (value) => {
      const pattern = /^0\d{9}$/;
      return !value ? true : (pattern.test(value) || "Invalid phone number.");
    },
    time: (value) => {
      const pattern = /^(\d{2}):(\d{2})$/;
      const matches = pattern.exec(value);
      if (matches && matches.length === 3) {
        const hours = parseInt(matches[1]);
        const minutes = parseInt(matches[2]);
        return (hours <= 23 && minutes <= 59) || "Invalid time.";
      }

      return "Invalid time.";
    }
  };
};

/**
 * Get a validation-like error object.
 * @param message
 * @returns {{response: {status: number, data: {message: *}}}}
 */
export const getValidationError = (message) => {
  return { response: { status: 422, data: { message } } };
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
        let data = errorBody.response.data;
        if (data.message) {
          message = data.message;
        }
      }
        break;
      case 404:
        message = "The requested resource was not found.";
        break;
      case 422: {
        // validation errors
        let data = errorBody.response.data;
        if (data.message) {
          message = data.message;
        }

        if (data.errors) {
          let errors = [];
          Object.keys(data.errors).forEach((e, i) => errors.push(data.errors[e][0]));
          message = errors.join("\n");
        }
      }
        break;
    }
  } else if (errorBody.request) {
    message = "Network connectivity error.";
  }

  return message;
};

/**
 * Get age from `date`.
 * @param date
 * @returns {*}
 */
export const getAge = (date) => {
  if (!date || date === "0000-00-00") {
    return null;
  }

  const years = moment().diff(date, "years");
  const months = moment().diff(date, "months");
  const days = moment().diff(date, "days");

  if (years >= 1) {
    return Math.floor(years) + " years";
  }

  if (months >= 1 && months <= 12) {
    return Math.floor(months) + " months";
  }

  return days + " days";
};

/**
 * Get date range title for reports.
 * @param startDate
 * @param endDate
 * @returns {String}
 */
export const getDateRangeTitle = (startDate, endDate) => {
  let title = "";
  if (startDate) {
    title += `From ${formatDateForDb(startDate)}`;
  }
  if (endDate) {
    title += ` to ${formatDateForDb(endDate)}`;
  }

  return title;
};
