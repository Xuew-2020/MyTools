$(function(){
	$("#page-two").hide();
	$("#one").on('click',function(){
		if(confirm("离开当前页面会清空所有操作，确定离开？") == false){
			return;
		}
		if($(this).hasClass('active') == false){
			$(this).addClass('active');
			$('#two').removeClass();
		}
		$("#page-one").show();
		$("#page-two").hide();
	});
	$("#two").on('click',function(){
		/* 创建分组 */
		function createGroup(group, set, flag){
			var quename = ['A','B','C','D'];
			var que = Array();
			for(var i=0; i<group.length; i++){
				if(group[i].value != "")
					que.push(group[i].value);
			}
			var len = que.length;
			for(var i=0; i<len; i++){
				for(var j=i+1; j<len; j++){
					var fight = que[i]+" VS "+que[j];
					var item = $('<div class="list-group-item delMark putArea"><div class="drag que'+flag+'" draggable="true" id="'+flag+'_'+i+j+'" data-que = '+quename[flag]+'>'+fight+'</div></div>');
					set.append(item);
				}
			}
		}
		/* 创建赛程表 */
		function createTableForBasketball(schedule, start, over){
			function createTable(data){
				data = data.split('/');
				var table = $('<table class="table table-bordered basketball"></table>');
				var thead = $('<thead><tr><td>日期</td><td>时间</td><td>组号</td><td colspan="2">赛程</td></tr></thead>');
				var tbody = $('<tbody><tr><td rowspan="8" style="line-height:240px">'+data[1]+'月'+data[2]+'号</td><td rowspan="4" style="line-height:120px">上午</td><td></td><td colspan="2" class="putArea"></td></tr>\
							  <tr><td></td><td colspan="2" class="putArea"></td></tr><tr><td></td><td colspan="2" class="putArea"></td></tr>\
							  <tr><td></td><td colspan="2" class="putArea"></td></tr><tr><td rowspan="4" style="line-height:120px">下午</td><td></td><td colspan="2" class="putArea"></td></tr>\
							  <tr><td></td><td colspan="2" class="putArea"></td></tr><tr><td></td><td colspan="2" class="putArea"></td></tr>\
							  <tr><td></td><td colspan="2" class="putArea"></td></tr></tbody>');
				var tfoot = $('<tfoot><tr><td></td><td></td><td></td><td></td><td></td></tr></tfoot>')
				table.append(thead).append(tbody).append(tfoot);
				return table;
			}
			var leftTable = $('<div class="col-md-6"></div>');
			var rightTable = $('<div class="col-md-6"></div>');
			var timeS = new Date(start);
			var timeE = new Date(over);
			var newTime = new Date();
			var daynum = (timeE.getTime() - timeS.getTime())/(24*60*60*1000);
			for(var i=0; i<=daynum; i+=2){
				newTime.setDate(timeS.getDate()+i);
				leftTable.append(createTable(newTime.toLocaleDateString()));
				newTime.setDate(timeS.getDate()+i+1);
				rightTable.append(createTable(newTime.toLocaleDateString()));
			}
			var div = $('<div class="main delMark"></div>');
			div.append(leftTable).append(rightTable);
			Schedule.append(div);
		}
		function createTableForBadminton(schedule, start, over){
			function createTable(data){
				data = data.split('/');
				var table = $('<table class="table table-bordered badminton"></table>');
				var thead = $('<thead><tr><td colspan="18">'+data[1]+'月'+data[2]+'号赛程</td></tr>\
						<tr><td colspan="3">比赛时间</td><td colspan="3">A</td><td></td>\
						<td colspan="3">B</td><td></td><td colspan="3">C</td>\
						<td></td><td colspan="3">D</td></tr></thead>');
				var tbody = $('<tbody></tbody>');
				var tfoot = $('<tfoot></tfoot>');
				var time_table_AM = ["8:00--8:40","8:50--9:30","9:40--10:20","10:30--11:10","11:20--12:00"];
				var time_table_PM = ["14.30--15.10","15.20--16.00","16.10--16.50","17.00--17.40","17.50--18.30"];
				for(var i=0; i<time_table_AM.length; i++){
					var tr = $('<tr><td colspan="3">'+time_table_AM[i]+'</td><td colspan="3" class="A putArea"></td><td class="divide"></td><td colspan="3" class="B putArea"></td>\
								<td class="divide"></td><td colspan="3" class="C putArea"></td><td class="divide"></td><td colspan="3" class="D putArea"></td></tr>');
					tbody.append(tr);
				}
				var tr_mid = $('<tr class="tr_mid"><td colspan="3"></td><td colspan="3"></td><td></td><td colspan="3"></td>\
							<td></td><td colspan="3"></td><td></td><td colspan="3"></td></tr>');
				tbody.append(tr_mid);
				for(var i=0; i<time_table_PM.length; i++){
					var tr = $('<tr><td colspan="3">'+time_table_PM[i]+'</td><td colspan="3" class="A putArea"></td><td class="divide"></td><td colspan="3" class="B putArea"></td>\
								<td class="divide"></td><td colspan="3" class="C putArea"></td><td class="divide"></td><td colspan="3" class="D putArea"></td></tr>');
					tbody.append(tr);
				}
				var tfoot_tr = $('<tr></tr>');
				for(var i=0; i<18; i++){
					var td = $('<td></td>');
					tfoot_tr.append(td);
				}
				tfoot.append(tfoot_tr);
				table.append(thead).append(tbody).append(tfoot);
				return table;
			}
			var timeS = new Date(start);
			var timeE = new Date(over);
			var newTime = new Date();
			var daynum = (timeE.getTime() - timeS.getTime())/(24*60*60*1000);
			var div = $('<div class="main delMark"></div>');
			for(var i=0; i<=daynum; i++){
				newTime.setDate(timeS.getDate()+i);
				div.append(createTable(newTime.toLocaleDateString()));
			}
			schedule.append(div);
		}
		var Schedule = $('#schedule');
		var startTime = $("#gm-time-start").val();
		var overTime = $("#gm-time-end").val();
		var gmType = $("input[type=radio]:checked").val();
		if(startTime=="" || overTime==""){
			alert("请输入比赛时间！");
			return false;
		}
		if($(this).hasClass('active') == false){
			$(this).addClass('active');
			$('#one').removeClass();
		}
		$(".delMark").remove();
		//分组集合
		var Groups = [$("#group-A input[type=text]"),$("#group-B input[type=text]"),$("#group-C input[type=text]"),$("#group-D input[type=text]")];
		var Sets = [$("#set-A"),$("#set-B"),$("#set-C"),$("#set-D")];
		for(var i=0; i<Sets.length; i++){
			createGroup(Groups[i], Sets[i], i);
		}
		//赛程表
		if(gmType == 0){
			createTableForBasketball(Schedule, startTime, overTime);
			$('#create_table').hide();
		}
		else{
			createTableForBadminton(Schedule, startTime, overTime)
			$('#create_table').show();
		}
		/*绑定拖拽事件*/
		var drag = $('.drag');
		var putArea = $('.putArea');
		for(var i=0; i<drag.length; i++){
			drag[i].ondragstart=function(e){
				e.dataTransfer.setData("text/html",e.target.id); 
			}
		}
		for(var i=0; i<putArea.length; i++){
			putArea[i].ondragover=function(e){
				if(this.querySelector('.drag') != null){
					return;
				}
				e.preventDefault();
			}
			putArea[i].ondrop=function(e){
				var id=e.dataTransfer.getData("text/html");
				var elem = document.getElementById(id);
				if(gmType == 0 && this.tagName == "TD"){
					var data = this.parentElement.parentElement.querySelectorAll('.drag');
					var text = $(elem).text();
					var txt = text.split(' VS ');
					for(var i=0; i<data.length; i++){
						var thistext = $(data[i]).text();
						var thisTxt = thistext.split(' VS ');
						if((thisTxt[0] == txt[0] || thisTxt[0] == txt[1] || thisTxt[1] == txt[0] || thisTxt[1] == txt[1]) && text!=thistext){
							if(confirm(txt[0]+" 或 "+txt[1]+" 这天已经安排过比赛，是否继续安排比赛") == false){
								return;
							}
							break;
						}
					}
					prev = e.target.previousElementSibling;
					$(prev).text(elem.dataset['que']);
				}
				if(gmType == 1 && this.tagName == "TD"){
					var className = elem.dataset['que'];
					if($(this).hasClass(className) == false){
						if(confirm("这场比赛不属于该组,是否跨组安排赛程?") == false){
							return;
						}
					}
				}
				if(elem.parentElement.tagName == 'DIV'){
					$(elem).parent().text(elem.innerText);
				}
				else{
					if(gmType == 0){
						$(elem).parent().prev().text(null);
					}
				}
				this.innerHTML = null;
				e.target.appendChild(elem);
				
			}
		}
		$("#page-one").hide();
		$("#page-two").show();
	});
	$('#create_table').on('click',function(){
		function randomSort(x,y){
			return 0.5 - Math.random();
		}
		function create(Que, Set){
			Que.sort(randomSort);
			for(var i=0; i<Set.length; i++){
				if(i >= Que.length)
					break;
				if(Que[i].parentElement.tagName == 'DIV'){
					$(Que[i]).parent().text(Que[i].innerText);
				}
				Set[i].append(Que[i]);
			}
		}
		var Ques = [$('.que0'), $('.que1'), $('.que2'), $('.que3')];
		var Sets = [$('.A'), $('.B'), $('.C'), $('.D')];
		for(var i=0; i<Sets.length; i++){
			create(Ques[i], Sets[i]);
		}
	});
	$('#reset_table').on('click',function(){
		$('#two').trigger('click');
	});
	$('#export_table').on('click',function(){
		var gmType = $("input[type=radio]:checked").val();
		var str = $('#schedule .main').html();
		//Worksheet名
		var worksheet = '赛程表'
		var uri = 'data:application/vnd.ms-excel;base64,';
		//下载的表格模板数据
		var template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
		 xmlns:x="urn:schemas-microsoft-com:office:excel" 
		 xmlns="http://www.w3.org/TR/REC-html40">
		 <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
			<x:Name>${worksheet}</x:Name>
			<x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
			</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
			</head><body>${str}</body></html>`;
		//下载模板
		var name = $('#gm-name').val();
		if(name == ""){
			name = "赛程表";
		}
		link = document.createElement('a');
		link.href = uri + base64(template);
		link.download =  name+".xls";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		//输出base64编码
		function base64 (s) { return window.btoa(unescape(encodeURIComponent(s))) }
	});
});
function addListItem(t){
	var item = $(t).parent().parent();
	var list = item.parent();
	var newItem = $('<div class="list-group-item"><input type="text" placeholder="输入队名" /></div>');
	item.before(newItem);
}
function delListItem(t){
	var item = $(t).parent().parent();
	var list = item.parent();
	var prevItem = item.prev();
	if(list.children('div').length < 3)
		return;
	prevItem.remove();
}

