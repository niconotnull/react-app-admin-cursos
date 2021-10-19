export const customStyles = {
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-10%',
    transform: 'translate(-10%, -20%)',
  },
};

export const customStylesExamen = {
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-10%',
    transform: 'translate(-10%, -20%)',
  },
};

export const layoutExamen = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const layout = {
  labelCol: { span: 16 },
  wrapperCol: { span: 24 },
};

/* eslint-disable no-template-curly-in-string */
export const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
