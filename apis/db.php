<?php
$sit_link="localhost";
$user="root"; //数据库名称
$pw="root";   //数据库密码
$sql="blog";
@$link=mysqli_connect($sit_link,$user,$pw) or die ("数据库连接失败");
$blog=mysqli_select_db($link,$sql) or die ("选择表失败");
?>