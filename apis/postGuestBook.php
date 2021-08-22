<?php
    header('Content-type:text/json');
    include_once 'db.php';

    $name = $_POST['name'];
    $content = $_POST['content'];
    $city = $_POST['city'];
    $time = $_POST['time'];
    function json($code,$message=""){  
        $result=array(  
          'code'=>$code,  
          'message'=>$message 
        );  
        //输出json  
        echo json_encode($result,JSON_UNESCAPED_UNICODE);  
        exit;  
    };
    if($name != '' && $content != ''){
        $query = "insert into `liuyan` (`id`,`name`,`content`,`city`,`time`) values (NULL,'$name','$content','$city','$time')";
        if(mysqli_query($link,$query)){
            echo json(200,'恭喜，留言成功');
        }else{
            echo json(201,'留言失败！'),mysqli_error();
        }
    }else{
        echo json(202,'姓名或者内容不可为空'),mysqli_error();
    }
?>