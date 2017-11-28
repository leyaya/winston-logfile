module.exports.brieftemp = function (data) {
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
			
		}

		.arylist .item{
			color: #94d020;
			display: flex;
			justify-content: space-between;
			margin-bottom:4px;
			border-bottom: 1px solid #b5dbf7;
		}

		.infotitle{
			color: #FF4351;
			padding: 0 20px;
		}

		.checkbtn{
			margin-left: 10px;
			margin-right: 10px;
			display: block;
		}

		.dishname,.cityname,.count{
			padding: 0 20px;
		}

		.cityname{
			flex: 1;
			text-align: left;
		}

		.keyratio{
			flex: 1;
			text-align: center;
		}

		.center{
			text-align: center;
		}

		.wid20{
			width: 20%;
		}

		.head{
			padding-bottom: 10px;
			padding-top: 10px;
			background: #f6f8f9;
			border: none!important;
		}
		.citytitle{
			flex:1;
		}
		.time{
			width: 120px;
		    position: fixed;
		    top: 50%;
		    right: 0;
		}
		.cname{
			display:inline-block;
			width:60px;
			white-space: nowrap;  
			text-overflow:ellipsis; 
			overflow:hidden;
		}
		.ccount{
			display:inline-block;
			width:30px;
			text-align: center;
		}
	</style>
</head>
<body>
	<div class="main">
		<div class = "time">
			<div>数据耗时：<%= dataTime %></div>
		</div>
		<header class="title">${data.title}</header>
		<div class="content">
			<ul class="arylist">
				<li class="item head">
					<div class="infotitle wid20">搜索关键词种类(<%= keyworkcategory %>)</div>
					<div class="infotitle citytitle center">城市类别总数</div>
					<div class="infotitle wid20 center">关键字匹配率(<%= (valid/keyworkcategory).toFixed(2)*100 + '%' %>)</div>
					<div class="infotitle wid20 center">合计搜索量(<%= searchcount %>)</div>
				 </li>
				 <% sortAry.map(item => {%>
					<li class = "item">
						<div class="dishname wid20"><%= item.key %></div>
						<div class="cityname center">
							<%= item.citycount %>
						</div>
						<div class="keyratio"><%= item.keystatus %></div>
						<div class="count wid20 center">
							<%= item.keycount %>
						</div>
					</li>
				 <%})%>
			</ul>
		</div>
	</div>
</body>
</html>`;
}




