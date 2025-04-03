<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "Janes_Beale";
$password = "Jaystina@11";
$dbname = "portfolio_db";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Get projects with their tags
    $stmt = $conn->prepare("
        SELECT p.*, GROUP_CONCAT(t.name) as tag_names
        FROM projects p
        LEFT JOIN project_tags pt ON p.id = pt.project_id
        LEFT JOIN tags t ON pt.tag_id = t.id
        GROUP BY p.id
    ");
    $stmt->execute();
    
    $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Format the data for frontend
    $formattedProjects = array_map(function($project) {
        return [
            'title' => $project['title'],
            'description' => $project['description'],
            'image' => $project['image'],
            'demo_url' => $project['demo_url'],
            'code_url' => $project['code_url'],
            'tags' => $project['tag_names'] ? explode(',', $project['tag_names']) : []
        ];
    }, $projects);
    
    echo json_encode($formattedProjects);
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>