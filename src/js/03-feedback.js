import throttle from 'lodash.throttle';
const formRef = document.querySelector('.feedback-form');
const FORM_KEY = 'videoplayer-current-time';
let data = {};

const savedData = localStorage.getItem(FORM_KEY);

if (savedData) {
  const parsedData = JSON.parse(savedData);
  data = parsedData;

  formRef.elements.email.value = parsedData.email || '';
  formRef.elements.message.value = parsedData.message || '';
}
const inputHandler = e => {
  const input = e.target;
  data = {
    ...data,
    [input.name]: input.value,
  };
  console.log(data);
  localStorage.setItem(FORM_KEY, JSON.stringify(data));
};

const submitHandler = e => {
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form);
  const finalData = {};
  for (const [name, value] of formData.entries()) {
    finalData[name] = value;
  }
  console.log(finalData);
  form.reset();
  localStorage.removeItem(FORM_KEY);
  data = {};
};
formRef.addEventListener('input', throttle(inputHandler, 500));
formRef.addEventListener('submit', submitHandler);
