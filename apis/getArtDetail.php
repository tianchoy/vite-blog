<?php 
    header('Content-type:text/json');
    include_once 'db.php';
    $id = $_GET['id'];
    $query = "select * from `arts` where `id`='$id' limit 1";
    $result = mysqli_query($link,$query);
    $row = mysqli_fetch_array($result);
    $query = "update `arts` set `hits`=hits+1 where `id`='$id'";
    $result = mysqli_query($link,$query);
    echo json_encode($row,JSON_UNESCAPED_UNICODE); 
?>