function start() {
  const button = document.querySelectorAll(".btn2")
  var item = document.querySelectorAll(".card_filter2")


  button.forEach(b => b.addEventListener("click", (e) => {
    e.preventDefault()
    const filter = e.target.dataset.filter
    console.log(filter)


    item.forEach(i => {
      console.log(i)
      if (filter === 'ALL') {
        i.style.display = 'block'
      }
      else {
        if (i.classList.contains(filter)) {
          i.style.display = 'block'
        }
        else {
          i.style.display = 'none'
        }
      }
    })
  }))
}
function search_filter() {

  var item = document.querySelectorAll(".card_filter")
  var searchbox = document.querySelector(".search_input")

  searchbox = document.addEventListener("keyup", (e) => {
    const searchfilter = e.target.value.toLowerCase().trim()


    item.forEach((i) => {
      if (i.textContent.includes(searchfilter)) {
        i.style.display = 'block'
      }
      else {
        i.style.display = 'none'
      }
    })
  })

}

function writeOn() {

  var form = document.getElementById("community-form")
  const formData = new FormData();
  const file = document.getElementById("file")
  formData.append('title', form.title.value)
  formData.append('star', form.star.value)
  formData.append('content', form.content.value)
  formData.append('region', form.region.value)
  //formData.append('korea_region', form.korea_region.value)
  formData.append('community_file', file.files[0]);
  axios({
    method: "post",
    url: "/post/community",
    data: formData
  })
    .then((response) => {
      console.log("리스폰스", response)
      var title = document.getElementById("title");
      var content = document.getElementById("content");
      var region = document.getElementById("region");


      if (!title.value)
        alert("제목을 적어주세요.")
      else if (content.value == "내용을 입력해주세요." || !content.value)
        alert("내용을 적어주세요.")
      else {
        var table = document.getElementById("table");
        var tr = document.createElement("tr");

        var no = document.createElement("td");
        var cnt = response.data.data.index_number

        no.innerText = cnt;
        //cnt = cnt + 1;

        var title1 = document.createElement("td");
        title1.innerHTML = response.data.data.title
        //title1.innerHTML = '<a href="http://localhost:8000/" class="list">'+ title.value + "</a>";
        // title1.innerText = title.value;

        var star = document.createElement("td");

        star.innerText = response.data.data.star
        //star.innerText = star1;

        var region1 = document.createElement("td");
        // region1.classList = card_filter;
        region1.innerHTML = response.data.data.region
        //region1.innerHTML = region.value;

        var id = document.createElement("td");
        id.innerHTML = response.data.data.writer
        // title.innerText = id;

        var date = document.createElement("td");
        var dt = new Date();
        console.log(dt);

        date.innerHTML = response.data.data.uodatedAt
        date.innerText = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate() + " " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();


        tr.appendChild(no);
        tr.appendChild(title1);
        tr.appendChild(star);
        tr.appendChild(region1);
        tr.appendChild(id);
        tr.appendChild(date);
        tr.style.cssText = "cursor:pointer;"
        tr.setAttribute(onclick, location.href = "/post/" + cnt)
        //tr.click(function(){
        //     tr.css("cursor:pointer;", location.href='http://localhost:8000/post/response.data.result.index_number');
        // });

        table.appendChild(tr);



        // ----------------------창 닫힌 후 값 초기화 ---------------------------------

        var star = document.getElementsByClassName("star");

        title.value = "";
        content.value = "";
        file.value = "";
        $("input:radio[name='star']:checked").prop("checked", false);
        region.value = "";

      }

    }
    )
}

