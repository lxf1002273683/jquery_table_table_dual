//插件
var module = {
	table_dual_init:function(){
		//更新列表数量  需用户自己调用 传入左右
		var that = this;
		this.updateNum = function(el){
			var num = $(el).find('.table_list_item span').length;
			$(el).find('.table_list_item_num').text(num);
		}
		//搜索 需用户自己初始
		this.querySearch = function(el,func){
			$(el).on('change', '.table_list_search', func);
		}
		//span添加点击初始 
		this.optionAddClick = function(){
			$('.table_list_item').on('click', 'span', function(){
				if(!that.sortState) return false;
				$(this).toggleClass('active');
			})
		}
		//添加
		this.move = function(){
			operation('.move', '.table_list_left', '.table_list_right', false);
		}
		//全部添加
		this.moveAll = function(){
			operation('.moveAll', '.table_list_left', '.table_list_right', true);
		}
		//删除
		this.remove = function(){
			operation('.remove', '.table_list_right', '.table_list_left', false);
		}
		//全部删除
		this.removeAll = function(){
			operation('.removeAll', '.table_list_right', '.table_list_left', true);
		}
		//el添加事件元素  from数据所在位置  to添加位置 type 1是全部 0是单个
		var operation = function(el, from, to, type){
			$(el).on('click', function(){
				if(!that.sortState) return false;
				$(from).find('.table_list_item span').each(function(){
					if(type){
						$(to).find('.table_list_item').prepend(this);
					}
					if(!type){
						if($(this).hasClass("active")){
				        	$(to).find('.table_list_item').prepend(this);
				        }
					}
			    })
				that.updateNum(from);
				that.updateNum(to);
			})
		}
		
		//排序需用户自己初始
		this.sortState = true;
		this.sortDefault = 1;
		this.sort = function(el){
			$(el).on('click', '.table_list_sort', function(){
				if(that.sortState){
					that.sortState = false;
					$(this).parent().siblings('.table_list_item_box').find('span').each(function(){
						var str = '<b class="table_list_numerical">'+that.sortDefault+'</b>';
						$(this).append(str)
					})
					$(this).text('完成');
				}else{
					that.sortState = true;
					this.sortDefault = 1;
					$(this).parent().siblings('.table_list_item_box').find('span').each(function(){
						$(this).find('.table_list_numerical').remove();
					})
					//完成时重新排序
					var table_list_item = $(this).parent().siblings('.table_list_item_box').find('.table_list_item');
					var spans = $(this).parent().siblings('.table_list_item_box').find('.table_list_item span');
					//带有sort参数 排序
					for(var i = 1; i <= spans.length; i++){
						for(var j = 0; j < spans.length; j++){
							var num = $(spans[j]).attr('data-sort');
							if(num == i){
								table_list_item.append(spans[j]);
							}
						}
					}
					//没有sort参数 排序
					spans.each(function(){
						if(!$(this).attr('data-sort')){
							table_list_item.append(this);
						}
						$(this).removeAttr('data-sort');
						$(this).find('.table_list_numerical').removeClass('sort_active');
					})
					$(this).text('排序');
				}
			})
			$('.table_list_item').on('click','.table_list_numerical', function(){
				if($(this).hasClass('sort_active')){
					return false;
				}
				var num = $(this).text();
				$(this).parent().attr('data-sort',num);
				$(this).addClass('sort_active');
				num++;
				$(this).parents('.table_list_item').find('span').each(function(){
					if(!$(this).attr('data-sort')){
						$(this).find('.table_list_numerical').text(num);
					}
				})
			})
		}

		//默认初始化
		this.optionAddClick();
		this.move();
		this.moveAll();
		this.remove();
		this.removeAll();
		return this;
	}
}
$.fn.extend(module);