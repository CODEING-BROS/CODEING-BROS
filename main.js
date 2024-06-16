document.addEventListener("DOMContentLoaded", function() {
    const currentMonthElement = document.getElementById('currentMonth');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const dateRowsContainer = document.getElementById('dateRowsContainer');
    const dateWrap = document.getElementById('dateWrap');
    const calendarWrapper = document.getElementById('calendarWrapper');
let today = new Date();
let currentMonth = today.getMonth(); // 0-indexed
let currentYear = today.getFullYear();
let selectedDate = today.getDate();
let selectedMonth = currentMonth;
let selectedYear = currentYear;

const monthNames = [    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function updateCalendar() {
    dateRowsContainer.innerHTML = '';
    currentMonthElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay() || 7;

    let date = 1;
    for (let i = 0; i < 6; i++) {
        const dateRow = document.createElement('div');
        dateRow.classList.add('date-row');
        for (let j = 1; j <= 7; j++) {
            if (i === 0 && j < firstDayOfWeek) {
                const emptyCell = document.createElement('div');
                emptyCell.classList.add('date');
                dateRow.appendChild(emptyCell);
            } else if (date > daysInMonth) {
                break;
            } else {
                const dateCell = document.createElement('div');
                dateCell.classList.add('date');
                dateCell.textContent = date;

                if (currentYear === today.getFullYear() && currentMonth === today.getMonth() && date === today.getDate()) {
                    dateCell.classList.add('current-date');
                }

                if (currentYear === selectedYear && currentMonth === selectedMonth && date === selectedDate) {
                    dateCell.classList.add('selected-date');
                }

                dateCell.addEventListener('click', (event) => {
                    event.stopPropagation();
                    selectedDate = date;
                    selectedMonth = currentMonth;
                    selectedYear = currentYear;
                    updateCalendar();
                    updateDateText();
                    calendarWrapper.style.display = 'none';
                });

                dateRow.appendChild(dateCell);
                date++;
            }
        }
        dateRowsContainer.appendChild(dateRow);
    }
}

function updateDateText() {
    const dateTextElements = dateWrap.querySelectorAll('.date-text .date-day, .date-text .date-month, .date-text .date-year');
    const selectedFullDate = new Date(selectedYear, selectedMonth, selectedDate);
    dateTextElements[0].textContent = selectedFullDate.toLocaleDateString('en-US', { weekday: 'short' });
    dateTextElements[1].textContent = `${selectedDate} ${monthNames[selectedMonth]}`;
    dateTextElements[2].textContent = selectedYear;
}

dateWrap.addEventListener('click', function(event) {
    event.stopPropagation();
    calendarWrapper.style.display = 'block';
});

document.addEventListener('click', function(event) {
    if (!calendarWrapper.contains(event.target) && !dateWrap.contains(event.target)) {
        calendarWrapper.style.display = 'none';
    }
});

prevMonthButton.addEventListener('click', function(event) {
    event.stopPropagation();
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar();
});

nextMonthButton.addEventListener('click', function(event) {
    event.stopPropagation();
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar();
});

updateCalendar();
updateDateText();
});