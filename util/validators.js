module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};

  //username validation
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }

  //email validation
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    // regex for email validation
    const regEx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
    //TODO: check if email is already in use
    //TODO: check is email is correct using smtp ??
  }

  // for password
  // basic requirements for password
  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";

    // more requirements for password (optional) but recommended by devdeep :)
    // for more info: https://www.youtube.com/watch?v=3NjQ9b3pgIg&pp=ygUncGFzc3dvcmQgcmVjb21tbWVuZGF0aW9uIGNvbXB1dGVycGhpbGUg
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  } else if (password.search(/[a-z]/i) < 0) {
    errors.password = "Password must contain at least one letter.";
  } else if (password.search(/[0-9]/) < 0) {
    errors.password = "Password must contain at least one digit.";
  } else if (password.search(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/) < 0) {
    errors.password = "Password must contain at least one special character.";
  }

  //TODO: Outh with google, facebook, twitter, github
  //TODO: more advanced validation for password

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
