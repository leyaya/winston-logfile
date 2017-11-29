module.exports.indextemp = function (data) {
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>${data.title}</title>
	<style type="text/css">
		*{
			padding: 0;
			margin: 0;
		}

		.main{
			padding: 0 10px;
		}

		.title{
		    height: 44px;
		    line-height: 44px;
		    text-align: center;
		    font-size: 16px;
		    font-weight: bold;
		    color: #66cccc;
		    border-bottom: 1px solid #e9ecef;
		}

		.arylist{
			margin-bottom:28px;
		}

		.arylist .item{
			color: #FF4351;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom:4px;
		}

		.filename,.listtitle{
			text-decoration: none;
		}

		.filename{
			color: #94d020;
		}

		.checkbtn{
			margin-left: 10px;
			margin-right: 10px;
			display: inline-block;
			cursor: pointer;
		}

		.sumitbtn{
			background-color: #4cb0f9;
			border-color: #4cb0f9;
			color: #FFF;
			font-size: 12px;
			height: 30px;
			line-height: 30px;
			padding: 0 30px;
			text-decoration: none;
			outline: none;
			display: inline-block;
			border-radius: 4px;
			cursor: pointer;
		}

		.btnarea{
    		text-align: center;
		}

		.head{
			padding-bottom: 10px;
			padding-top:10px;
			background: #f6f8f9;
			border: none!important;
		}
	</style>
	<script type="text/javascript" src="http://apps.bdimg.com/libs/zepto/1.1.4/zepto.min.js"></script>
</head>
<body>
	<div class="main">
		<header class="title">${data.title}</header>
		<div class="content">
			<ul class="arylist">
				<li class="item head">
					<a class="listtitle">日志文件名称</a>
					<div>全选<input id="allbtn" class="checkbtn" checked="true" type="checkbox" /></div>
				 </li>
				 <% for(let i=0,l=arylist.length;i<l;i++ ) {%>
				 	<li class="item">
					<a class="filename" href="/detail?name=<%= arylist[i] %>"><%= arylist[i] %></a>
					<div>
						<a class="filename" href = "/empty?name=<%= arylist[i] %>">不匹配信息</a>
						<a class="filename" href = "/brief?name=<%= arylist[i] %>">简要信息</a>
						<a class="filename" href = "/detail?name=<%= arylist[i] %>">详情信息</a>
						<input data-name = "<%= arylist[i] %>" checked="true" name="itemcheck" class="checkbtn" type="checkbox" />
					</div>
				 	</li>
				 <% } %>
			</ul>
			<div class="btnarea">
				<a id="btnsend" class="sumitbtn">统计详细信息</a>
				<a id="btnsendbrief" class="sumitbtn">统计简略信息</a>
				<a id="btnsendempty" class="sumitbtn">统计不匹配信息</a>
			</div>
		</div>
	</div>
	<script type="text/javascript">
		$("#allbtn").on('click', function(e){
			const ary = $('input[name="itemcheck"]');
			const status = e.currentTarget.checked;
			ary.forEach(item =>{
				item.checked = status;
			})
		})

		function goto(page){
			const ary = $('input[name="itemcheck"]');
			let list = [];
			if(ary && ary.length){
				ary.forEach(item =>{
					if(item.checked){
						list.push(item.getAttribute('data-name'));
					}
				})
			}
			if(list.length == 0){
				alert('请选择要统计的文件！');
				return
			}
			window.location.href = window.location.origin + '/' +page + '?name=' + list.join(';');
		}

		$("#btnsend").on('click', function(){
			goto('detail');
		})

		$("#btnsendbrief").on('click', function(){
			goto('brief');
		})

		$("#btnsendempty").on('click', function(){
			goto('empty');
		})
	</script>
</body>
</html>`;
}





