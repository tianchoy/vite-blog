<?php
    include_once 'db.php';
    $id = $_POST['id'];
    $sql = "update arts set art_love=art_love+1 where id='$id'"; //更新数据
    mysqli_query($link,$sql);
    $resql = "select art_love from arts where id='$id'";
    $result = mysqli_query($link,$resql);
    $row = mysqli_fetch_array($link,$result);
    $love = $row['art_love']; //获取赞数值
    echo $love;