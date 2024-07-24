<?php
header('Content-Type: application/json');

$goals = [];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $goals = [
        [
            'name' => 'Lose Weight',
            'target' => 70,
            'type' => 'weight',
            'deadline' => '2024-09-01',
            'progress' => 30
        ],
        [
            'name' => 'Increase Workouts',
            'target' => 5,
            'type' => 'workouts',
            'deadline' => '2024-08-15',
            'progress' => 60
        ],
        [
            'name' => 'Longer Workouts',
            'target' => 300,
            'type' => 'duration',
            'deadline' => '2024-08-31',
            'progress' => 45
        ]
    ];
    echo json_encode($goals);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!empty($data['name']) && !empty($data['target']) && !empty($data['type']) && !empty($data['deadline'])) {
        $newGoal = [
            'name' => $data['name'],
            'target' => floatval($data['target']),
            'type' => $data['type'],
            'deadline' => $data['deadline'],
            'progress' => 0
        ];
        echo json_encode($newGoal);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid input']);
    }
}