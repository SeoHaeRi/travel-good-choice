const exp = require('express');
const Models = require('../model');

exports.mypage_index = (req, res) => {
  let data
  if (req.session.user) {
    data = {
      id: req.session.user.id,
      pw: req.session.user.pw,
      name: req.session.user.name
    }
  } else if (req.session.kakao) {
    data = {
      id: req.session.kakao.id,
      pw: req.session.kakao.pw,
      name: req.session.kakao.name
    }
  }
  Models.User.findOne({ where: { id: data.id } })
    .then((result) => {
      res.render("mypage");
    });
}

/* 비밀 번호 중복 확인 및 변경 */
exports.post_modify = (req, res) => {
  if (req.session.user) {
    res.render("modify", { id: req.session.user.id, name: req.session.user.name });
  } else if (req.session.kakao) {
    res.render("modify", { id: req.session.kakao.id, name: req.session.kakao.name });
  }
}

exports.post_update = (req, res) => {
  let data = {
    id: req.body.id,
    pw: req.body.pw
  };

  Models.User.update(data, { where: { id: data.id } })
    .then(() => {
      res.send(true);
    })
};
// exports.post_delete = (req,res) =>{
// let data = {
//   id:req.body.id
// }
// Models.User.destroy({ where: { id: data } })
// .then(()=>{
//   res.send(true)
// })
// }