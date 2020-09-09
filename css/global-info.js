(function(){
    function getUrlQuery(name,url){
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        if(url){
            var r = url.match(reg);
        }else{
            var r = window.location.search.substr(1).match(reg);
        }
        if (r != null) return unescape(r[2]);
        return null;
    }

    var url = getUrlQuery('successUrl');
    var order_id = getUrlQuery('order_id');

    if(/confirm/.test(window.location.href)){
        if(url){
            window.h5PaySuccessUrl = decodeURIComponent(url);
        }
        else{
            window.h5PaySuccessUrl =  '/payment/finish.html?ZZCAppArg=NoGoBackBtn&order_id='+order_id
        }
    }
  	
  	// 临时处理
    setTimeout(function(){
    if(window.serverData && window.serverData.channelConfig && window.serverData.channelConfig.channel_id && window.location.pathname
 == '/') {
    var channel_id = serverData.channelConfig.channel_id;
    var testArr = [4433, 4432, 4431, 4430, 4429, 2750, 2751 ,2755 ,2796];
    var bottomDom = document.querySelector('[data-host="a"]') && document.querySelector('[data-host="b"]')
    if(bottomDom){
      	bottomDom = document.querySelector('[data-host="a"]').style.display == 'block'?document.querySelector('[data-host="a"]'):document.querySelector('[data-host="b"]');
    }
    if($.inArray && $.inArray(channel_id, testArr) !=-1 && bottomDom){
        var str = '广州骑士网络科技有限公司 版权所有<br>粤ICP备19144218号-2<br>广州市天河区棠下荷光三横路3号510-002房<br>客服电话：1010-0118<br> <span class="text-info">免费领取，配送费需自理</span>'
        bottomDom.innerHTML = str
    }   
}
},2000)
    // 临时处理 针对直接进入表单页 没有记录到channel_hash的问题
    var channelHash = window.localStorage.getItem("channel-hash") || "";
    if(!channelHash){
        channelHash = getUrlQuery('channel_hash') || '';
        window.localStorage.setItem("channel-hash",channelHash);
    }
  	
  	//临时处理
  	var entryMoneyTxt = document.querySelector('.J-fixed-head .fixed-icon-box .money');
	if(entryMoneyTxt){entryMoneyTxt.innerText = '¥24163';}
})();

window.GLOBALINFO = {
  tj: {
    percent: '100',
    isMonitor:true
  },
  shunFengKy:{
    isUse:true,
    noAirProvinces:['广东省','江西省','广西壮族自治区','福建省','海南省'],
  },
}