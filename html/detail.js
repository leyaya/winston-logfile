module.exports.detailtemp = function () {
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>统计结果</title>
	<style type="text/css">
		*{
			padding: 0;
			margin: 0;
		}

		.main{
			padding: 0 10px;
		}

		.title{
		    height: 40px;
		    line-height: 40px;
		    text-align: center;
		    font-size: 16px;
		    font-weight: bold;
		    color: #66cccc;
		    border-bottom: 1px solid #e9ecef;
		}

		.arylist{
			margin: 8px 0px;
		}

		.arylist .item{
			color: #94d020;
			display: flex;
			align-items: center;
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
			text-align: center;
		}

		.center{
			text-align: center;
		}

		.wth108{
			width: 108px;
		}

		.pb10{
			padding-bottom: 10px;
		}
	</style>
</head>
<body>
	<div class="main">
		<header class="title">日志列表</header>
		<div class="content">
			<ul class="arylist">
				<li class="item pb10">
					<div class="infotitle wth108">搜索关键词</div>
					<div class="infotitle">各城市搜索量</div>
					<div class="infotitle wth108 center">合计搜索量</div>
				 </li>
				 <% for(let key in gather){%>
				 	<li class = "item">
						<div class="dishname wth108"><%= key %></div>
						<div class="cityname">
							<% let count = 0;%>
							<% for(let city in gather[key]) {%>
								<div>
									<%= city + gather[key][city]['count'] %>
								</div>
								<% count += gather[key][city]['count'] %>
							<% } %>
						</div>
						<div class="count wth108 center">
							<%= count %>
						</div>
					</li>
				 <% } %>
			</ul>
		</div>
	</div>
	<script type="text/javascript">
		
	</script>
</body>
</html>`;
}



