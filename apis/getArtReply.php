<?php
    header('Content-type:text/json');
    include_once 'db.php';

    function json($code,$message="",$data=array()){  
        $result=array(  
        'code'=>$code,  
        'message'=>$message,  
        'data'=>$data   
        );  
        //输出json  
        echo json_encode($result,JSON_UNESCAPED_UNICODE);  
        exit;  
    } 

    $id = $_GET['id'];
    $query = "select * from `reply` where art_id=$id order by pl_time DESC";
    $res=mysqli_query($link,$query);
    $dataArr = array();
    while ($row=mysqli_fetch_array($res)){ //循环开始
        //var_dump($row);
        $dataArr[]=$row;  
    }  
    echo json(200,'数据返回成功',$dataArr); 
?>