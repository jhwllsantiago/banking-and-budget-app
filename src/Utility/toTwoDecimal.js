const toTwoDecimal = (value) => {
  return value.indexOf(".") >= 0
    ? value.slice(0, value.indexOf(".") + 3)
    : value;
};

export default toTwoDecimal;
