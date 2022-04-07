export const converApiErrors = (errs) => {
  const errors = {};
  const apiErrors = errs;
  apiErrors.forEach((v) => {
    errors[v.param] = v.msg;
  });
  return errors;
};
