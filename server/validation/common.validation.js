const validationOptions = {
  allowUnknownBody: false,
  allowUnknownParams: false,
};

const stringLanguageOption = {
  language: {
    string: {
      min: 'is too short',
      max: 'is too long',
      regex: { base: 'is invalid' }
    }
  }
};

export { validationOptions, stringLanguageOption };
