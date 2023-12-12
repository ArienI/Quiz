
const API_URL = "https://fuzzy-perpetual-roquefort.glitch.me/";

const swiperThumb = new Swiper('.gift__swiper--thumb', {
  spaceBetween: 12,
  slidesPerView: "auto",
  freeMode: true,
  breakpoints: {
    320: {
      spaceBetween: 12,
    },
    1141: {
      spaceBetween: 16,
    }
  },
});

const swiperMAin = new Swiper('.gift__swiper--card', {
  spaceBetween: 16,
  thumbs: {
    swiper: swiperThumb,
  },
});

const form = document.querySelector('.form');
const submitButton = form.querySelector('.form__button');
const phoneInputs = form.querySelectorAll('.form__field--phone');
// console.log(phoneInputs)
const cardInput = form.querySelector('.form__card');

const updateCardInput = () => {
  const activeSlide = document.querySelector('.gift__swiper--card .swiper-slide-active');
  const cardData = activeSlide.querySelector('.gift__card-image').dataset.card;
  cardInput.value = cardData;
};

updateCardInput();

swiperMAin.on("slideChangeTransitionEnd", updateCardInput);

for (let i = 0; i < phoneInputs.length; i++) {
  const element = phoneInputs[i];
  IMask(element, {
    mask: "+{7}(000)000-00-00",
  });
}

const updateSubmitButton = () => {
  let isFormFilled = true;

  for (const field of form.elements) {
    if (field.classList.contains('form__field')) {
      // .trim- убираем пробелы
      if (!field.value.trim()) {
        isFormFilled = false;
        break;
      }
    }
  }
  submitButton.disabled = !isFormFilled;
}

const phoneValiidateOPtion = {
  // presence: {
  //   message: 'Поле телефон обязательно для заполнения'
  // },
  format: {
    pattern: "\\+7\\(\\d{3}\\)\\d{3}-\\d{2}-\\d{2}",
    message: 'Номер телефона должен соответствовать формату: "+7(XXX)XXX-XX-XX"'
  }
}

form.addEventListener('input', updateSubmitButton);

form.addEventListener('submit', async (event) => {
  event.preventDefault()

  const errors = validate(form, {
    sender_phone: phoneValiidateOPtion,
    receiver_phone: phoneValiidateOPtion,
  });

  if (errors) {
    for (const key in errors) {
      const errorString = errors[key];
      alert(errorString);
    }
    return;
  };

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  // console.log("data: ", data);

  try {
    const response = await fetch(`${API_URL}/api/gift`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json()

    if (response.ok) {
      prompt('Открытка успешно сохранена. Доступна по адресу: ', `${location.origin}/card.html?id=${result.id}`,);
      form.reset();
    } else {
      alert(`ошибка при отправке: ${result.message}`)
    }





  } catch (error) {
    console.error(`ошибка при отправке: ${error}`)
    alert(`произошла ошибка, поробуйте снова`)
  }


});
