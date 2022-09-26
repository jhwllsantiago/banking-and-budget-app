const capitalize = (string) => {
  string = string.trim();
  if (string.length > 0) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }
};

export default capitalize;
