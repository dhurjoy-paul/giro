export default function validate(text) {
  const errors = [];

  if (!/[a-z]/.test(text)) errors.push("Missing lowercase letter");
  if (!/[A-Z]/.test(text)) errors.push("Missing uppercase letter");
  if (/\s/.test(text)) errors.push("Password contain spaces");
  if (text.length < 6) errors.push("Password must be at least 6 characters long");
  return errors;
}