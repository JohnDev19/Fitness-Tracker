<?php
header('Content-Type: application/json');
function generateRandomData($min, $max, $days) {
    $data = [];
    for ($i = 0; $i < $days; $i++) {
        $data[] = rand($min, $max);
    }
    return $data;
}

$totalWorkouts = rand(30, 100);
$caloriesBurned = rand(5000, 20000);
$totalDuration = rand(1000, 5000);
$currentStreak = rand(1, 30);

$recentActivities = [
    "Completed a 5km run in 25 minutes",
    "Finished upper body workout",
    "Yoga session for 1 hour",
    "30-minute HIIT workout",
    "60-minute cycling session"
];

$weeklyProgress = [];
for ($i = 6; $i >= 0; $i--) {
    $date = date('Y-m-d', strtotime("-$i days"));
    $weeklyProgress[] = [
        'date' => $date,
        'duration' => rand(20, 120)
    ];
}

$dashboardData = [
    'totalWorkouts' => $totalWorkouts,
    'caloriesBurned' => $caloriesBurned,
    'totalDuration' => $totalDuration,
    'currentStreak' => $currentStreak,
    'recentActivities' => $recentActivities,
    'weeklyProgress' => $weeklyProgress
];

echo json_encode($dashboardData);