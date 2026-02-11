# Google Cloud Conference 2026 Website

A simple, responsive informational website for a 1-day technical conference about Google Cloud technologies. Built with Python (Flask), HTML, CSS, and JavaScript.

## Features

- **Home Page**: Displays current date, location, and full schedule.
- **Schedule**: List of 10 talks + lunch break.
- **Talk Details**: Includes ID, Title, Speaker(s), Category, Description, and Time.
- **Search**: Filter talks by Title, Speaker, or Category instantly.
- **Responsive Design**: Works on desktop and mobile.

## Tech Stack

- **Backend**: Python 3, Flask
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)

## Setup and Installation

1.  **Clone or Download** the project.
2.  **Install Python**: Ensure you have Python 3 installed.
3.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

## Running the Application

1.  Run the Flask application:
    ```bash
    python app.py
    ```
2.  Open your browser and navigate to:
    `http://127.0.0.1:5000`

## Structure

- `app.py`: Main application logic and dummy data.
- `templates/`: HTML templates (`base.html`, `index.html`).
- `static/css`: Stylesheets.
- `static/js`: Client-side scripts.
