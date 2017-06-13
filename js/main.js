//初始化
var tab = $('.table_dual_list_box').table_dual_init();
//更新数量
tab.updateNum('.table_list_left');
tab.updateNum('.table_list_right');
//输入框绑定事件  回车触发
tab.querySearch('.table_list_left',function(){
	console.log(20);
});
tab.querySearch('.table_list_right',function(){
	console.log(30);
});
tab.sort('.table_list_right');