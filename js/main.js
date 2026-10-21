// =========================================================
// Интерактив (меню, модальное окно, вкладки, аккордеон, карусель)
// работает через Bootstrap JS Bundle и data-атрибуты.
// Здесь только:
//   1) название книги в модальном окне;
//   2) проверка форм и уведомление об отправке.
// =========================================================

// ---------- 1. Название книги в модальном окне ----------
const orderModal = document.getElementById('order-modal');

if (orderModal) {
  // show.bs.modal — событие Bootstrap перед открытием окна.
  orderModal.addEventListener('show.bs.modal', (event) => {
    // relatedTarget — кнопка «Забронировать», по которой кликнули.
    const book = event.relatedTarget ? event.relatedTarget.dataset.book : '';
    orderModal.querySelector('#modal-book').value = book;
    orderModal.querySelector('[data-book-name]').textContent = book || 'не выбрана';
  });
}

// ---------- 2. Проверка форм ----------
document.querySelectorAll('.needs-validation').forEach((form) => {
  form.addEventListener('submit', (event) => {
    // Backend не подключён — отменяем реальную отправку.
    event.preventDefault();

    // Есть ошибки: класс was-validated включает красные рамки и .invalid-feedback.
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    form.reset();
    form.classList.remove('was-validated');

    // Форма в модальном окне — закрываем окно.
    const modal = form.closest('.modal');
    if (modal) {
      bootstrap.Modal.getInstance(modal).hide();
    }

    // Сообщение на странице (alert), если для формы указан data-success.
    if (form.dataset.success) {
      document.getElementById(form.dataset.success).hidden = false;
    }

    // Всплывающее уведомление (toast).
    const toast = document.getElementById('success-toast');
    if (toast) {
      bootstrap.Toast.getOrCreateInstance(toast).show();
    }
  });
});
