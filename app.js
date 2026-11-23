const dialog = document.getElementById('reserve-dialog');
const reservationForm = document.getElementById('reserve-form');
const reservationDate = document.getElementById('date');
const reservationResult = document.getElementById('reservation-result');
let opener;
function refreshReservationDate() {
  const now = new Date();
  const localDate = [now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');
  reservationDate.min = localDate;
  if (!reservationDate.value || reservationDate.value < localDate) reservationDate.value = localDate;
}
refreshReservationDate();
document.getElementById('year').textContent = new Date().getFullYear();
document.querySelectorAll('[data-reserve]').forEach(button => button.addEventListener('click', () => {
  opener = button;
  refreshReservationDate();
  reservationResult.textContent = '';
  dialog.showModal();
  document.body.classList.add('reservation-open');
}));
document.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => {
  document.body.classList.remove('reservation-open');
  opener?.focus({preventScroll:true});
});
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if(event.clientX<bounds.left || event.clientX>bounds.right || event.clientY<bounds.top || event.clientY>bounds.bottom) dialog.close();
});
reservationForm.addEventListener('input', () => { reservationResult.textContent = ''; });
reservationForm.addEventListener('change', () => { reservationResult.textContent = ''; });
reservationForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!reservationForm.reportValidity()) return;
  const date = new Date(reservationDate.value+'T12:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'});
  reservationResult.textContent = `Your evening: ${document.getElementById('guests').value}, ${date} at ${document.getElementById('time').value}. This is a concept preview; availability has not been checked and no reservation has been made.`;
});
