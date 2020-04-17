const sendError = (next, code, err_string) => {
    const err = new Error(err_string);
    err.status = code;
    console.error("ERROR (" + code + "): " + codeerr_string);
    next(err);
  }

  module.exports = {
    sendError: sendError
  };