document.addEventListener('DOMContentLoaded', () => {
    const eventForm = document.getElementById('event-form');
    const eventsContainer = document.getElementById('events-container');

    // Load existing events from localStorage
    loadEvents();

    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const date = document.getElementById('date').value;
        const location = document.getElementById('location').value;
        const description = document.getElementById('description').value;

        // Create event object
        const event = {
            id: Date.now(),
            title,
            date,
            location,
            description
        };

        // Save event to localStorage
        saveEvent(event);

        // Clear form fields
        eventForm.reset();

        // Refresh event list
        loadEvents();
    });

    function saveEvent(event) {
        let events = JSON.parse(localStorage.getItem('events')) || [];
        events.push(event);
        localStorage.setItem('events', JSON.stringify(events));
    }

    function loadEvents() {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        eventsContainer.innerHTML = '';

        events.forEach((event) => {
            const eventItem = document.createElement('a');
            eventItem.className = 'list-group-item list-group-item-action';
            eventItem.innerHTML = `
                <h5 class="mb-1">${event.title}</h5>
                <p class="mb-1"><strong>Date:</strong> ${event.date}</p>
                <p class="mb-1"><strong>Location:</strong> ${event.location}</p>
                <p class="mb-1"><strong>Description:</strong> ${event.description}</p>
                <button class="btn btn-danger btn-sm" onclick="deleteEvent(${event.id})">Delete</button>
            `;
            eventsContainer.appendChild(eventItem);
        });
    }

    window.deleteEvent = function(id) {
        let events = JSON.parse(localStorage.getItem('events')) || [];
        events = events.filter(event => event.id !== id);
        localStorage.setItem('events', JSON.stringify(events));
        loadEvents();
    }
});
