
export const REGEX_FORMULA_VARIABLE_ONLY = /[A-Za-z]+(?:_{[A-Za-z\d]+})?/g;

export const REGEX_FORMULA_VARIABLE = /(^|[^\\A-Za-z])([A-Za-z]+(?:_{[A-Za-z\d]+})?)/g;
