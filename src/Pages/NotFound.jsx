const NotFound = () => {
  const style = {
    position: "absolute",
    top: "50vh",
    left: "50vw",
    transform: "translate(-50%, -50%)",
  };
  return (
    <div className="not-found" style={style}>
      <p>404: Not Found</p>
      <p>The content you are trying to access does not exist.</p>
    </div>
  );
};

export default NotFound;
