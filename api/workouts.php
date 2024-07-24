<?php
header('Content-Type: application/json');
$workouts = [];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $workoutTypes = ['Running', 'Weightlifting', 'Yoga', 'Swimming', 'Cycling'];
    for ($i = 0; $i < 10; $i++) {
        $workouts[] = [
            'date' => date('Y-m-d', strtotime("-$i days")),
            'type' => $workoutTypes[array_rand($workoutTypes)],
            'duration' => rand(15, 120),
            'calories' => rand(100, 800)
        ];
    }
    echo json_encode($workouts);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate input
    if (!empty($data['date']) && !empty($data['type']) && !empty($data['duration']) && !empty($data['calories'])) {
        // In a real application, you need to insert this data into a database
        $newWorkout = [
            'date' => $data['date'],
            'type' => $data['type'],
            'duration' => intval($data['duration']),
            'calories' => intval($data['calories'])
        ];
        echo json_encode($newWorkout);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid input']);
    }
}