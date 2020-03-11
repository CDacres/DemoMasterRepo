import axios from 'axios';
import qs from 'qs';
import { isValidNumber } from 'libphonenumber-js';

const validateUserField = (field, value) => {
  let validation;
  if (field === 'first_name' || field === 'last_name') {
    validation = nameValidation(field, value);
  } else if (field === 'email') {
    validation = emailValidation(value);
  } else if (field === 'phone_number') {
    validation = isValidNumber(value);
  }
  return validation;
};

const validateUserInfo = (user) => {
  const validationArray = [];
  for (const field in user) {
    let validation = { pass: true };
    if (field === 'first_name' || field === 'last_name') {
      validation = nameValidation(field, user[field]);
    } else if (field === 'email') {
      validation = emailValidation(user[field]);
    } else if (field === 'phone_number') {
      validation.pass = isValidNumber(user[field]);
    }
    if (!validation.pass) {
      validationArray.push(validation);
    }
  }
  return validationArray;
};

const splitFieldForMessage = (field) => {
  return field.split('_').join(' ');
};

const nameValidation = (field, value) => {
  const validation = {
    pass: true,
    message: ''
  };
  if (value === '') {
    validation.pass = false;
    validation.message = `Please enter your ${splitFieldForMessage(field)}`;
  }
  return validation;
};

const emailValidation = (value) => {
  const validation = {
    pass: true,
    message: ''
  };
  const emailReg = /^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)?$/;
  if (value === '' || !emailReg.test(value.toLowerCase())) {
    validation.pass = false;
    validation.message = 'Please enter a valid email address';
  }
  return validation;
};

const postUserData = (user) => {
  axios.post('/api/v1/users', qs.stringify(user))
    .catch(error => {
      throw new Error(error);
    });
};

export {
  validateUserField,
  validateUserInfo
};
