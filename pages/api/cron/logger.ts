function debug(msg: any) {
  console.log(`debug: ${msg}`);
}

function info(msg: any) {
  console.log(`info: ${msg}`);
}

function warning(msg: any) {
  console.log(`warning: ${msg}`);
}

function error(msg: any) {
  console.log(`error: ${msg}`);
}

function fatal(msg: any) {
  console.log(`fatal: ${msg}`);
}

export default module.exports = {
  info,
  warning,
  error,
  fatal,
};
