const orderModal = document.getElementById('order-modal');

if (orderModal) {
  orderModal.addEventListener('show.bs.modal', (event) => {
    const book = event.relatedTarget ? event.relatedTarget.dataset.book : '';
    orderModal.querySelector('#modal-book').value = book;
    orderModal.querySelector('[data-book-name]').textContent = book || 'не выбрана';
  });
}

document.querySelectorAll('.needs-validation').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    form.reset();
    form.classList.remove('was-validated');

    const modal = form.closest('.modal');
    if (modal) {
      bootstrap.Modal.getInstance(modal).hide();
    }

    if (form.dataset.success) {
      document.getElementById(form.dataset.success).hidden = false;
    }

    const toast = document.getElementById('success-toast');
    if (toast) {
      bootstrap.Toast.getOrCreateInstance(toast).show();
    }
  });
});
