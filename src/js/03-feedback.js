const formEl = document.querySelector('.feedback-form');
const formData = {};
initPage();

function handleInput(event) {
  const { name, value } = event.target;
  try {
    let savedData = localStorage.getItem('feedback-form-state');

    if (savedData) {
      savedData = JSON.parse(savedData);
    } else {
      savedData = {};
    }
    savedData[name] = value;
    const stringInJson = JSON.stringify(savedData);
    localStorage.setItem('feedback-form-state', stringInJson);
  } catch (error) {
    console.log(error.message);
  }
}

formEl.addEventListener('input', handleInput);

function initPage() {
  try {
    const savedData = localStorage.getItem('feedback-form-state');
    if (!savedData) {
      return;
    }
    const stringFromJson = JSON.parse(savedData);
    Object.entries(stringFromJson).forEach(([name, value]) => {
      formEl.elements[name].value = value;
    });
  } catch (error) {
    console.log(error.message);
  }
}

formEl.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;
  console.log({ email: email.value, message: message.value });
  event.currentTarget.reset();
}
