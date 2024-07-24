<?php
header('Content-Type: application/json');

function generateProgressData($startValue, $endValue, $days) {
    $data = [];
    $step = ($endValue - $startValue) / $days;
    for ($i = 0; $i < $days; $i++) {
        $date = date('Y-m-d', strtotime("-$i days"));
        $value = $startValue + ($step * $i) + (rand(-10, 10) / 10);
        $data[] = ['date' => $date, 'value' => round($value, 1)];
    }
    return array_reverse($data);
}

$weightData = generateProgressData(80, 75, 30);
$durationData = generateProgressData(30, 60, 30);

$progressData = [
    'weightData' => array_map(function($item) {
        return ['date' => $item['date'], 'weight' => $item['value']];
    }, $weightData),
    'durationData' => array_map(function($item) {
        return ['date' => $item['date'], 'duration' => round($item['value'])];
    }, $durationData)
];

echo json_encode($progressData);