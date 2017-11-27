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
	</style>
</head>
<body>
	<div class="main">
		<header class="title">${data.title}</header>
		<div class="content">
			<ul class="arylist">
				<li class="item head">
					<div class="infotitle wid20">搜索关键词</div>
					<div class="infotitle citytitle center">各城市搜索量</div>
					<div class="infotitle wid20 center">菜品关键字匹配率</div>
					<div class="infotitle wid20 center">合计搜索量</div>
				 </li>
				 <% sortAry.map(item => {%>
					<li class = "item">
						<div class="dishname wid20"><%= item.key %></div>
						<div class="cityname">
							<% item.citylist.map(obj =>{%>
								<div>
									<%= obj.cityname + obj.count +  ' 菜品城市匹配率：'  + obj.urlstatus + '/' + obj.count + '=' + (obj.urlstatus/obj.count).toFixed(2)*100 + '%' %>
								</div>
							<% })%>
						</div>
						<div class="keyratio"><%= item.keycount + '/' + item.count + '=' + (item.keycount/item.count).toFixed(2)*100 + '%' %></div>
						<div class="count wid20 center">
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




