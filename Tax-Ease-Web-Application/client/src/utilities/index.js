export const convertBinary = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (err) => {
      reject(err);
    };
  });
};

export const validateEmail = (email) => {
  const EMAIL_PATTERN = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (email.match(EMAIL_PATTERN)) return true;
  return false;
};
