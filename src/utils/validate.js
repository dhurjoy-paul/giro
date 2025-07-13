export const validatePassword = (text) => {
  const errors = [];

  if (!/[a-z]/.test(text)) errors.push("Missing lowercase letter");
  if (!/[A-Z]/.test(text)) errors.push("Missing uppercase letter");
  if (!/[0-9]/.test(text)) errors.push("Missing number");
  if (/\s/.test(text)) errors.push("Password contains spaces");
  if (!/[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]~`]/.test(text)) errors.push("Missing special character");
  if (text.length < 6) errors.push("Password must be at least 6 characters long");
  if (text.length > 128) errors.push("Password is too long");
  if (/(.)\1{2,}/.test(text)) errors.push("Password contains repeated characters");

  const commonPasswords = ['password', '123456', '12345678', '123456789', '1234567890',
    'qwerty', 'abc123', '111111', '123123', '000000'];

  if (commonPasswords.includes(text.toLowerCase())) {
    errors.push("Password is too common");
  }

  return errors;
}

export const validateName = (text) => {
  const errors = [];

  if (!text.trim()) errors.push("Name is required");
  if (text.length < 3) errors.push("Name is too short");
  if (text.length > 50) errors.push("Name is too long");
  if (/\d/.test(text)) errors.push("Name cannot contain numbers");
  if (text.startsWith(" ")) errors.push("Name cannot start with a space");
  if (!/^[a-zA-Z\s.'-]+$/.test(text)) errors.push("Name cannot contain invalid characters");

  return errors;
};

export const validateEmail = (text) => {
  const errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!text.trim()) errors.push("Email is required");
  if (/\s/.test(text)) errors.push("Email cannot contain spaces");
  if (text && !emailRegex.test(text)) errors.push("Invalid email format");

  return errors;
};
