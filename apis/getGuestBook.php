<?php
    header('Content-type:text/json');
    include_once 'db.php';
    $page = $_GET['page'];
    function json($code,$message="",$data=array(),$nums=""){  
        $result=array(  
        'code'=>$code,  
        'message'=>$message,  
        'data'=>$data,
        'total'=>$nums  
        );  
        //输出json  
        echo json_encode($result,JSON_UNESCAPED_UNICODE);  
        exit;  
    } 
    $pageCount = ($page-1)*10;
    //$pageCount = 0;
    $query = "select * from `liuyan` order by id DESC limit $pageCount, 10";
    $dataArr = array();
    $res=mysqli_query($link,$query);
    while ($row=mysqli_fetch_array($res)){  //循环开始
        $dataArr[] = $row;  
    }  

    $nums = "select count(*) from liuyan";
    $total = mysqli_query($link,$nums);
    $resu = mysqli_fetch_array($total);
    $count = $resu[0];

    echo json(200,'数据返回成功',$dataArr,$count); 
?>