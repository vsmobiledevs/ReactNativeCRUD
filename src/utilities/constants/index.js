//Validations
const signUpValdation = (username, email, password) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (username === '' || email === '' || password === '') {
    return {
      success: false,
      message: 'Please Enter All Fields to Proceed',
    };
  } else if (password?.length < 6) {
    return {
      success: false,
      message: 'Please enter at least 6 digits password',
    };
  } else if (!reg.test(email)) {
    return {
      success: false,
      message: 'Please enter valid email',
    };
  } else {
    return {
      success: true,
      message: '',
    };
  }
};

const loginValidation = (email, password) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email === '' || password === '') {
    return {
      success: false,
      message: 'Please Enter All Fields to Proceed',
    };
  } else if (password?.length < 6) {
    return {
      success: false,
      message: 'Please enter your 6 digits password',
    };
  } else if (!reg.test(email)) {
    return {
      success: false,
      message: 'Please enter valid email',
    };
  } else {
    return {
      success: true,
      message: '',
    };
  }
};

export {signUpValdation, loginValidation};
