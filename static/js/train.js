const { toDefaultValue } = require("sequelize/types/utils");

function showList(obj) {
    var regionlist = document.getElementById("regionlist");
    regionlist.style.display = "block";
    regionlist.name = obj.value;
  }

  function showStation(obj) {
    //역리스트 초기화
    var station = document.getElementById("station");
    station.style.display = "block";
    station.innerText = "";

    var xhr = new XMLHttpRequest();
    var url = 'http://apis.data.go.kr/1613000/TrainInfoService/getCtyAcctoTrainSttnList'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'hwuYzDgihaQI7HHmtDqfRtOBDGkg7phhDDFj8d2GtNWiTm4GgvmHeq1dPQbkeJqNuRw%2FdvXENngYfoOq09Gj3w%3D%3D'; /*Service Key*/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); /**/
    queryParams += '&' + encodeURIComponent('_type') + '=' + encodeURIComponent('xml'); /**/
    queryParams += '&' + encodeURIComponent('cityCode') + '=' + encodeURIComponent(obj.value); /**/
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        console.log('Status: ' + this.status + 'nHeaders: ' + JSON.stringify(this.getAllResponseHeaders()) + 'nBody: ' + this.responseText);
        var xml = xhr.responseXML;

        var st_code = xml.getElementsByTagName("nodeid");
        var st_name = xml.getElementsByTagName("nodename");

        for (let i = 0; i < 100; i++) {
          var a = st_code[i].firstChild.nodeValue;
          var b = st_name[i].firstChild.nodeValue;

          //역 버튼 생성
          var regionlist = document.getElementById("regionlist");
          // console.log(regionlist.name);
          if (regionlist.name == "inputDep") {
            var station = document.getElementById("station");
            var btn = document.createElement("button");
            btn.innerText = b;
            btn.id = a;
            btn.className = "station-btn";
            btn.value = a;
            btn.setAttribute("onClick", "inputStn(this)");
            station.appendChild(btn);
          }

          else if (regionlist.name == "inputArr") {
            var station = document.getElementById("station");
            var btn = document.createElement("button");
            btn.innerText = b;
            btn.id = a;
            btn.className = "station-btn";
            btn.value = a;
            btn.setAttribute("onClick", "inputStn(this)");
            station.appendChild(btn);
          }
        }
      }
    };
    xhr.send('');
  }

  function inputStn(obj) {
    var stn_code = obj.value;
    var regionlist = document.getElementById("regionlist");
    if (regionlist.name == "inputDep") {
      var start = document.getElementById("start");
      start.value = stn_code;
      var station = document.getElementById("station");
      regionlist.style.display = "none";
      station.style.display = "none";
      regionlist.name = "";
    }
    else {
      var end = document.getElementById("end");
      end.value = stn_code;
      var station = document.getElementById("station");
      regionlist.style.display = "none";
      station.style.display = "none";
      regionlist.name = "";
    }
  }

  function searchTrain() {
    

    var departure = document.getElementById('start');
    var arrival = document.getElementById('end');
    var time = document.getElementById('time');
    var result = document.getElementById("result");

    $("#result *").remove('td');

    axios({
      url: '/train_list',
      method: 'post',
      data: {
        departure: departure.value,
        arrival: arrival.value,
        time: time.value,
      }
    }).then((res) => {
      console.log(res);
      if (res) {
        var i = 1;
        for(var i = 1; i <100 ; i++){
          
          var table = document.getElementById("result");
          var tr = document.createElement("tr");
      
          var no = document.createElement("td");
          no.innerText = i;
  
          var train = document.createElement("td");
          train.innerText = res.data.item[i].traingradename;
          
          var train_no = document.createElement("td");
          train_no.innerText = res.data.item[i].trainno;
  
          var dep = document.createElement("td");
          dep.innerText = res.data.item[i].depplacename;
      
          var arr = document.createElement("td");
          arr.innerText = res.data.item[i].arrplacename;
      
          var dep_time = document.createElement("td");
          var divdep = res.data.item[i].depplandtime;
          var spldep = divdep.toString().slice(0,12);
          dep_time.innerText = spldep[8]  + spldep[9]  + ':' +spldep[10]  + spldep[11];
          
          var arr_time = document.createElement("td");
          var divarr = res.data.item[i].arrplandtime;
          var splarr = divarr.toString().slice(0,12);
          arr_time.innerText = splarr[8]  + splarr[9]  + ':' +splarr[10]  + splarr[11];
          
          var charge = document.createElement("td");
          if (res.data.item[0].adultcharge == '0'){charge.innerHTML = '<a href="https://www.letskorail.com/">KORAIL에서 확인</a>'}
          else {charge.innerText = res.data.item[0].adultcharge};
          
          
          tr.appendChild(no);
          tr.appendChild(train);
          tr.appendChild(train_no);
          tr.appendChild(dep);
          tr.appendChild(arr);
          tr.appendChild(dep_time);
          tr.appendChild(arr_time);
          tr.appendChild(charge);
          // tr.style.cssText = "cursor:pointer;" 
          // tr.setAttribute(onclick,location.href="https://www.letskorail.com/")
          //tr.click(function(){
         //     tr.css("cursor:pointer;", location.href='http://localhost:8000/post/response.data.result.index_number');
         // });
     
          table.appendChild(tr);
        }
      } else {
        alert('값X')

      }

    });
  }