const card = document.querySelector('.card');
const cardTitle = document.querySelector('.card__title');
const cardContacts = document.querySelector('.card__contacts');

// перенос текста под карточку при размере 580
const rearrangeElement = () => {
  const screenWidth = window.innerWidth;

  if (screenWidth <= 580) {
    card.after(cardContacts);
  } else {
    cardTitle.after(cardContacts);
  }
};


const init = () => {
  rearrangeElement();
  window.addEventListener('resize', rearrangeElement);
};

init();