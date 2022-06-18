const errorFormatter = ({ msg, param }) => {
  return `${param.toUpperCase()}: ${msg}`;
};

export default errorFormatter;
