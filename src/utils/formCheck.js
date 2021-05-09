const nullCheck = (form) => {
  delete form.memo;

  let isValid = true;
  Object.values(form).forEach((value) => {
    if (value === null || value === undefined || value === "") isValid = false;
  });

  return isValid;
};

module.exports = { nullCheck };
