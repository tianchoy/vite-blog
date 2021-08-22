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

    function StringToText($string,$num){
        if($string){
            //把一些预定义的 HTML 实体转换为字符
            $html_string = htmlspecialchars_decode($string);
            //将空格替换成空
            $content = str_replace(" ", "", $html_string);
            //函数剥去字符串中的 HTML、XML 以及 PHP 的标签,获取纯文本内容
            $contents = strip_tags($content);
            //返回字符串中的前$num字符串长度的字符
            return mb_strlen($contents,'utf-8') > $num ? mb_substr($contents, 0, $num, "utf-8").'....' : mb_substr($contents, 0, $num, "utf-8");
        }else{
            return $string;
        }
    }
    
    $query = "select * from `arts` order by id DESC limit 5";  //查询数据
    $res=mysqli_query($link,$query);
    $dataArr = array();
    while ($row=mysqli_fetch_array($res)){ //循环开始
        //var_dump($row);
        $data[] = $row;
        //$data['content'] = StringToText($data['content'],200);
        $dataArr[]=$row;  
    }  
    echo json(200,'数据返回成功',$dataArr); 
?>