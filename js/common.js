	$(document).ready(function(){
		$('a.rightboxbtn').each(function(i){
				var thisNum = i+1;
				$(this).on("click",function(){
						var imgUrl = $(".rightboxarea").find(".inner").css("background-image");
						var imgSplit = imgUrl.split("rightbox_");
						var imsSs = imgSplit[1].split(".jpg");
						$(".rightboxarea").css("display","block");
						$(".rightboxarea").find(".inner").css('background-image',imgSplit[0]+'rightbox_'+thisNum+'.jpg")');
						return false;					
				});
		});
		
		$(".rightboxarea,.rightboxarea .inner .closebtn").on("click",function(){
			$(".rightboxarea").css("display","none");
		});


		/*******당첨자발표 확인*******/
		$(".winner-result-view-btn").on("click",function(){
			$("#rank-area").html("")
			$("#rank-area").removeClass()
			var emptyCheck = 0;
			$(".inputarea table tbody tr").each(function(i){
				var elem = $(this).find("td input");
				var thisId = $(elem).attr("id");
				if($(elem).val() == ''){
						if(thisId == "rname"){
							alert("이름을 입력해주세요.");
							$(elem).focus();
							emptyCheck = 0;
							return false;
						}else if(thisId == "rnum"){
							alert("전화번호를 입력해주세요.")
							$(elem).focus();
							emptyCheck = 0;
							return false;
						}
				}else{
					emptyCheck = 1;				
				}
			});
			if(emptyCheck == 1){
				var rName = $(".inputarea input#rName").val().replace(/ /gi, "");
				var rNum = $(".inputarea input#rNum").val().replace(/ /gi, "");
				ajaxRequest(rName,rNum);			
			}
		});

		function ajaxRequest(rName,rNum){
			$.ajax({
			url:"./json/result.json",
			type:"GET",
			dataType:"json",
			success:function(result){
			  var succecssCheck = 0;
			  console.log(result.resultList)
			  $.each(result.resultList,function(i,e){				
				  if(this.name == rName && this.phonenumber == rNum){
					$("#rank-area").html("")
					$("#rank-area").removeClass().addClass("rank"+this.rank);
					succecssCheck = 1;
					alert(this.rank+"등 당첨되었습니다.")
				  }
			  });
			  if(succecssCheck == 0){
				  $("#rank-area").removeClass();
				  $("#rank-area").html("<span>아쉽게도 당첨명단에<br/>포함되시지 않았습니다.</span>")
				  alert("당첨되지않았습니다.")
			  }
			},
			error: function (data, textStatus, jqXHR) { notify(textStatus); }
			});		
		}

	});