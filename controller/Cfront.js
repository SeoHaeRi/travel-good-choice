const axios = require('axios');

exports.front = (req, res) => {
  if (req.cookies.popup == "1") {
    if (req.session.user) {
      res.render("index", { islogin: true, iskakao: false, popup: "none" })
    } else if (req.session.kakao) {
      res.render("index", { islogin: true, iskakao: true, popup: "none" })
    }
    else res.render("index", { islogin: false, iskakao: false, popup: "none" })
  } else {
    if (req.session.user) {
      res.render("index", { islogin: true, iskakao: false, popup: "block" })
    } else if (req.session.kakao) {
      res.render("index", { islogin: true, iskakao: true, popup: "block" })
    }
    else res.render("index", { islogin: false, iskakao: false, popup: "block" })
  }
}

exports.setpopup = (req, res) => {
  if (req.body.value) {
    res.cookie("popup", "1", {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000,
    })
    res.send(true)
  } else {
    res.send(false)
  }
}

exports.recommend = (req, res) => {
  res.render("recommend")
}
exports.signup = (req, res) => {
  res.render("signup")
}

exports.train_list = (req, res) => {
  var url = 'http://apis.data.go.kr/1613000/TrainInfoService/getStrtpntAlocFndTrainInfo';

  axios({
    url: url,
    method: 'GET',
    params: {
      serviceKey: 'hwuYzDgihaQI7HHmtDqfRtOBDGkg7phhDDFj8d2GtNWiTm4GgvmHeq1dPQbkeJqNuRw/dvXENngYfoOq09Gj3w==',
      numOfRows: '100',
      depPlaceId: req.body.departure,
      arrPlaceId: req.body.arrival,
      depPlandTime: req.body.time,
    }
  }).then((result) => {
    // 배열 : result.data.response.body.items
    /*{
      adultcharge: 0,
      arrplacename: '제천',
      arrplandtime: 20221229140200,
      depplacename: '청량리',
      depplandtime: 20221229123000,
      traingradename: '무궁화호',
      trainno: 1635
    }*/
    let data = result.data.response.body.items
    console.log("result : ", result.data.response.body.items);
    res.send(data);
  });
}

exports.search = (req, res) => {
  if (req.session.user) {
    res.render("search", { islogin: true, iskakao: false })
  } else if (req.session.kakao) {
    res.render("search", { islogin: true, iskakao: true })
  }
  else res.render("search", { islogin: false, iskakao: false })
}

exports.train = (req, res) => {
  if (req.session.user) {
    res.render("train", { islogin: true, iskakao: false })
  } else if (req.session.kakao) {
    res.render("train", { islogin: true, iskakao: true })
  }
  else res.render("train", { islogin: false, iskakao: false })
}

exports.sights1 = (req, res) => {
  if (req.session.user) {
    res.render("sights1", { islogin: true, iskakao: false })
  } else if (req.session.kakao) {
    res.render("sights1", { islogin: true, iskakao: true })
  }
  else res.render("sights1", { islogin: false, iskakao: false })
}
exports.sights2 = (req, res) => {
  if (req.session.user) {
    res.render("sights2", { islogin: true, iskakao: false })
  } else if (req.session.kakao) {
    res.render("sights2", { islogin: true, iskakao: true })
  }
  else res.render("sights2", { islogin: false, iskakao: false })
}
exports.sights3 = (req, res) => {
  if (req.session.user) {
    res.render("sights3", { islogin: true, iskakao: false })
  } else if (req.session.kakao) {
    res.render("sights3", { islogin: true, iskakao: true })
  }
  else res.render("sights3", { islogin: false, iskakao: false })
}
exports.sights4 = (req, res) => {
  if (req.session.user) {
    res.render("sights4", { islogin: true, iskakao: false })
  } else if (req.session.kakao) {
    res.render("sights4", { islogin: true, iskakao: true })
  }
  else res.render("sights4", { islogin: false, iskakao: false })
}
exports.sights5 = (req, res) => {
  if (req.session.user) {
    res.render("sights5", { islogin: true, iskakao: false })
  } else if (req.session.kakao) {
    res.render("sights5", { islogin: true, iskakao: true })
  }
  else res.render("sights5", { islogin: false, iskakao: false })
}
exports.sights6 = (req, res) => {
  if (req.session.user) {
    res.render("sights6", { islogin: true, iskakao: false })
  } else if (req.session.kakao) {
    res.render("sights6", { islogin: true, iskakao: true })
  }
  else res.render("sights6", { islogin: false, iskakao: false })
}
exports.worldCup = (req, res) => {
  if (req.session.user) {
    res.render("worldCup", { islogin: true, iskakao: false })
  } else if (req.session.kakao) {
    res.render("worldCup", { islogin: true, iskakao: true })
  }
  else res.render("worldCup", { islogin: false, iskakao: false })
}
exports.todolist = (req, res) => {
  res.render("todolist")
}
exports.chat = (req, res) => {
  if (req.session.user) {
    console.log('origin:', req.session.user.name);
    res.render("chat", { name: req.session.user.name });
  } else if (req.session.kakao) {
    console.log('origin:', req.session.kakao.name);
    res.render("chat", { name: req.session.kakao.name });
  } else res.render("chat");
}
