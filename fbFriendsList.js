$(function () {
    // var bgWindow = chrome.extension.getBackgroundPage();
    // console.log(bgWindow.backgroundFunction());

    function createTableOfFriendsData(friends_data){
    	var table = $('<table>');
    	table.attr('id', 'friends_data');

		var th = $('<tr>')
		.append('<th>Name</th>')
		.append('<th>URL</th>');

		table.append($('<thead>').append(th));

		var tbody = $('<tbody>');
		for (var key in friends_data) {
		    var td = $('<tr>')
		    .append('<td>' + friends_data[key].fb_name + '</td>')
		    .append('<td>' + friends_data[key].fb_url + '</td>');

		    tbody.append(td);
		}
		table.append(tbody);
		return table;
    }

    function createCSVExportButton(){
    	var button = $('<button>');
    	button.attr('id', 'export');
    	button.text('export to csv');
    	return button;
    }

    $("#do").click(function(){
	    chrome.tabs.query({active:true}, function(tab) {
		    chrome.tabs.sendMessage(tab[0].id, {text:''}, function(response) {
		        url = tab[0].url;
		        $('#place').html("");
		        friends_data = JSON.parse(response.data);
		        if(friends_data.length != 0){
			        table = createTableOfFriendsData(friends_data)
			        $('#place').append(table);
			        button = createCSVExportButton();
			        $('#place').append(button);
			        console.log(JSON.parse(response.data));

		            $("#export").click(function(){
				    	$("table#friends_data").tableToCSV();
				    });

		        }else{
			        $('#place').append("末尾までスクロールしてください");
		        }
		     });
		});
    });


});
