const calendar = document.getElementById('calendar');
const events = {
    '2024-08-15': 'Inauguração da Temporada',
    '2024-08-20': 'Noite das Boias Luminosas',
    '2024-08-25': 'Festa na Piscina',
    '2024-09-01': 'Desafio de Surf',
    '2024-09-12': 'Cinema ao Ar Livre',
    '2024-09-20': 'Festival de Comida e Bebida',
    '2024-09-25': 'Aula de Yoga Aquática',
    '2024-10-01': 'Dia do Desconto Familiar',
    '2024-10-10': 'Competição de Natação',
    '2024-10-12': 'Dia das Crianças',
};

let currentDate = new Date();

function generateCalendar(month, year) {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  calendar.innerHTML = '';

  // Add week day headers
  const headers = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  headers.forEach(day => {
    const header = document.createElement('span');
    header.className = 'calendar-header';
    header.textContent = day;
    calendar.appendChild(header);
  });

  // Fill in the days of the month
  for (let i = 0; i < firstDay; i++) {
    calendar.appendChild(document.createElement('div'));
  }
  
  for (let i = 1; i <= lastDate; i++) {
    const day = document.createElement('div');
    day.className = 'day';
    day.textContent = i;

    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    if (events[dateKey]) {
      day.classList.add('event');
      const tooltip = document.createElement('div');
      tooltip.className = 'day-tooltip';
      tooltip.textContent = events[dateKey];
      day.appendChild(tooltip);
    }

    calendar.appendChild(day);
  }

  // Display month and year
  document.getElementById('currentMonth').textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });
}

function changeMonth(action) {
  if (action === 'prev') {
    currentDate.setMonth(currentDate.getMonth() - 1);
  } else if (action === 'next') {
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
}

// Initialize calendar
generateCalendar(currentDate.getMonth(), currentDate.getFullYear());

document.querySelectorAll('.calendar-nav button').forEach(button => {
  button.addEventListener('click', () => changeMonth(button.dataset.action));
});
