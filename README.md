# FitTrack Pro - Fitness Tracker

FitTrack Pro is a startup project and requires further implementation for full functionality. It's a simple web application designed to help users track their fitness journey, set goals, and monitor progress. Built with AngularJS, vanilla JavaScript, and PHP for the backend. 

## Features

- **Dashboard**: Get an overview of your fitness stats, including total workouts, calories burned, and current streak.
- **Workout Log**: Easily log and view your workout history.
- **Progress Tracking**: Visualize your weight and workout duration progress over time.
- **Goal Setting**: Set and track personalized fitness goals.

## Technologies Used

- AngularJS
- Vanilla JavaScript
- PHP
- HTML5
- CSS3
- Chart.js
- Font Awesome

## Components

### Dashboard

- Displays fitness stats (total workouts, calories burned, total minutes, day streak)
- Recent activities list
- Weekly progress chart

### Workout Log

- Form to add new workouts
- Table to display recent workouts

### Progress

- Charts to display weight progress and workout duration progress

### Goals

- Form to set new goals
- List to display current goals with progress bars

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/JohnDev19/Fitness-Tracker.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Fitness-Tracker
   ```

3. Set up the PHP backend:
   - Ensure you have a local server environment set up (e.g., XAMPP, WAMP).
   - Place the project folder in the server's root directory (e.g., `htdocs` for XAMPP).

4. Open `index.html` in your browser to view the application.

## Development

To modify the application:

1. Edit the HTML in `index.html`.
2. Update the styles in the `<style>` section.
3. Modify the JavaScript logic in `app.js`.
4. Update the PHP backend files in the `api` directory as needed.

### API Endpoints

- `api/dashboard.php`: Fetches dashboard data.
- `api/workouts.php`: Handles fetching and adding workouts.
- `api/progress.php`: Fetches progress data.
- `api/goals.php`: Handles fetching and adding goals.

## Future Enhancements

- User authentication and profiles
- Integration with fitness wearables
- Nutrition tracking
- Social features for sharing progress and challenges

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

---

Happy coding and stay fit with FitTrack Pro! 🏋️‍♂️🏃‍♀️
