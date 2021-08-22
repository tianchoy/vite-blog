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
    $query = "select * from `reply` left join `arts` on (arts.id = reply.art_id) order by pl_time DESC limit $pageCount, 10";
    $nums = "select count(*) from reply";
   
    $total = mysqli_query($link,$nums);
    $resu = mysqli_fetch_array($total);
    $count = $resu[0];

    $res = mysqli_query($link,$query);
    $dataArr = array();
    while ($row=mysqli_fetch_array($res)){  //循环开始
        $row['content'] = iconv_substr($row['content'],0,10,'utf-8');
        $dataArr[]=$row;  
    }  
    echo json(200,'数据返回成功',$dataArr,$count); 
?>