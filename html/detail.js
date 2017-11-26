module.exports.detailtemp = function (data) {
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

		.head{
			padding-bottom: 10px;
			padding-top: 10px;
			background: #f6f8f9;
			border: none!important;
		}
	</style>
</head>
<body>
	<div class="main">
		<header class="title">${data.title}</header>
		<div class="content">
			<ul class="arylist">
				<li class="item head">
					<div class="infotitle wth108">搜索关键词</div>
					<div class="infotitle">各城市搜索量</div>
					<div class="infotitle wth108 center">合计搜索量</div>
				 </li>
				 <% sortAry.map(item => {%>
					<li class = "item">
						<div class="dishname wth108"><%= item.key %></div>
						<div class="cityname">
							<% item.citylist.map(obj =>{%>
								<div>
									<%= obj.cityname + obj.count %>
								</div>
							<% })%>
						</div>
						<div class="count wth108 center">
							<%= item.count %>
						</div>
					</li>
				 <%})%>
			</ul>
		</div>
	</div>
</body>
</html>`;
}




