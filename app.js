// Components
const Dashboard = {
    template: `
        <div>
            <h1>Dashboard</h1>
            <div class="dashboard-stats">
                <div class="stat-card">
                    <i class="fas fa-running"></i>
                    <h3>{{ totalWorkouts }}</h3>
                    <p>Total Workouts</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-fire"></i>
                    <h3>{{ caloriesBurned }}</h3>
                    <p>Calories Burned</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-stopwatch"></i>
                    <h3>{{ totalDuration }}</h3>
                    <p>Total Minutes</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-trophy"></i>
                    <h3>{{ currentStreak }}</h3>
                    <p>Day Streak</p>
                </div>
            </div>
            <div class="card">
                <h2>Recent Activity</h2>
                <ul>
                    <li v-for="activity in recentActivities">{{ activity }}</li>
                </ul>
            </div>
            <div class="card">
                <h2>Weekly Progress</h2>
                <div class="chart-container">
                    <canvas ref="weeklyProgressChart"></canvas>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            totalWorkouts: 0,
            caloriesBurned: 0,
            totalDuration: 0,
            currentStreak: 0,
            recentActivities: [],
            weeklyProgress: []
        }
    },
    mounted() {
        this.fetchDashboardData();
    },
    methods: {
        fetchDashboardData() {
            fetch('api/dashboard.php')
                .then(response => response.json())
                .then(data => {
                    this.totalWorkouts = data.totalWorkouts;
                    this.caloriesBurned = data.caloriesBurned;
                    this.totalDuration = data.totalDuration;
                    this.currentStreak = data.currentStreak;
                    this.recentActivities = data.recentActivities;
                    this.weeklyProgress = data.weeklyProgress;
                    this.createWeeklyProgressChart();
                });
        },
        createWeeklyProgressChart() {
            const ctx = this.$refs.weeklyProgressChart.getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: this.weeklyProgress.map(day => day.date),
                    datasets: [{
                        label: 'Workout Duration (minutes)',
                        data: this.weeklyProgress.map(day => day.duration),
                        borderColor: '#4a90e2',
                        backgroundColor: 'rgba(74, 144, 226, 0.1)',
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    }
};

const WorkoutLog = {
    template: `
        <div>
            <h1>Workout Log</h1>
            <div class="card">
                <h2>Add Workout</h2>
                <form @submit.prevent="addWorkout">
                    <input v-model="newWorkout.date" type="date" required>
                    <select v-model="newWorkout.type" required>
                        <option value="">Select Workout Type</option>
                        <option value="Running">Running</option>
                        <option value="Weightlifting">Weightlifting</option>
                        <option value="Yoga">Yoga</option>
                        <option value="Swimming">Swimming</option>
                        <option value="Cycling">Cycling</option>
                    </select>
                    <input v-model.number="newWorkout.duration" type="number" placeholder="Duration (minutes)" required>
                    <input v-model.number="newWorkout.calories" type="number" placeholder="Calories Burned" required>
                    <button type="submit">Add Workout</button>
                </form>
            </div>
            <div class="card">
                <h2>Recent Workouts</h2>
                <table v-if="workouts.length">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Duration</th>
                            <th>Calories</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="workout in workouts">
                            <td>{{ workout.date }}</td>
                            <td>{{ workout.type }}</td>
                            <td>{{ workout.duration }} min</td>
                            <td>{{ workout.calories }} kcal</td>
                        </tr>
                    </tbody>
                </table>
                <p v-else>No workouts logged yet.</p>
            </div>
        </div>
    `,
    data() {
        return {
            newWorkout: {
                date: '',
                type: '',
                duration: '',
                calories: ''
            },
            workouts: []
        }
    },
    created() {
        this.fetchWorkouts();
    },
    methods: {
        fetchWorkouts() {
            fetch('api/workouts.php')
                .then(response => response.json())
                .then(data => {
                    this.workouts = data;
                });
        },
        addWorkout() {
            fetch('api/workouts.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.newWorkout),
            })
            .then(response => response.json())
            .then(data => {
                this.workouts.unshift(data);
                this.newWorkout = { date: '', type: '', duration: '', calories: '' };
            });
        }
    }
};

const Progress = {
    template: `
        <div>
            <h1>Progress</h1>
            <div class="card">
                <h2>Weight Progress</h2>
                <div class="chart-container">
                    <canvas ref="weightChart"></canvas>
                </div>
            </div>
            <div class="card">
                <h2>Workout Duration Progress</h2>
                <div class="chart-container">
                    <canvas ref="durationChart"></canvas>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            weightData: [],
            durationData: []
        }
    },
    mounted() {
        this.fetchProgressData();
    },
    methods: {
        fetchProgressData() {
            fetch('api/progress.php')
                .then(response => response.json())
                .then(data => {
                    this.weightData = data.weightData;
                    this.durationData = data.durationData;
                    this.createCharts();
                });
        },
        // Progress component...
        createCharts() {
            new Chart(this.$refs.weightChart, {
                type: 'line',
                data: {
                    labels: this.weightData.map(d => d.date),
                    datasets: [{
                        label: 'Weight (kg)',
                        data: this.weightData.map(d => d.weight),
                        borderColor: '#4a90e2',
                        backgroundColor: 'rgba(74, 144, 226, 0.1)',
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    }
                }
            });

            new Chart(this.$refs.durationChart, {
                type: 'bar',
                data: {
                    labels: this.durationData.map(d => d.date),
                    datasets: [{
                        label: 'Workout Duration (minutes)',
                        data: this.durationData.map(d => d.duration),
                        backgroundColor: '#50c878'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }
};

const Goals = {
    template: `
        <div>
            <h1>Goals</h1>
            <div class="card">
                <h2>Set New Goal</h2>
                <form @submit.prevent="addGoal">
                    <input v-model="newGoal.name" placeholder="Goal Name" required>
                    <input v-model.number="newGoal.target" type="number" placeholder="Target Value" required>
                    <select v-model="newGoal.type" required>
                        <option value="">Select Goal Type</option>
                        <option value="weight">Weight</option>
                        <option value="workouts">Workouts per Week</option>
                        <option value="duration">Weekly Workout Duration</option>
                    </select>
                    <input v-model="newGoal.deadline" type="date" required>
                    <button type="submit">Set Goal</button>
                </form>
            </div>
            <div class="card">
                <h2>Current Goals</h2>
                <div v-if="goals.length" class="goals-list">
                    <div v-for="goal in goals" class="goal-item">
                        <h3>{{ goal.name }}</h3>
                        <p>Target: {{ goal.target }} {{ goal.type }}</p>
                        <p>Deadline: {{ goal.deadline }}</p>
                        <div class="progress-bar" :style="{ width: goal.progress + '%' }"></div>
                        <p>{{ goal.progress }}% complete</p>
                    </div>
                </div>
                <p v-else>No goals set yet.</p>
            </div>
        </div>
    `,
    data() {
        return {
            newGoal: {
                name: '',
                target: '',
                type: '',
                deadline: ''
            },
            goals: []
        }
    },
    created() {
        this.fetchGoals();
    },
    methods: {
        fetchGoals() {
            fetch('api/goals.php')
                .then(response => response.json())
                .then(data => {
                    this.goals = data;
                });
        },
        addGoal() {
            fetch('api/goals.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.newGoal),
            })
            .then(response => response.json())
            .then(data => {
                this.goals.push(data);
                this.newGoal = { name: '', target: '', type: '', deadline: '' };
            });
        }
    }
};

// Main Vue instance
new Vue({
    el: '#app',
    data: {
        currentView: 'dashboard'
    },
    components: {
        dashboard: Dashboard,
        workoutLog: WorkoutLog,
        progress: Progress,
        goals: Goals
    }
});