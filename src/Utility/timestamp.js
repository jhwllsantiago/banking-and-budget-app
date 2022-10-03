const timestamp = () => {
  const date = new Date()
    .toLocaleDateString("en-GB")
    .split("/")
    .reverse()
    .join("-");
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  return `${date} ${time}`;
};

export default timestamp;
