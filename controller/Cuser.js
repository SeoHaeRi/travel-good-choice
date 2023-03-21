const { User } = require("../model");
const { Op } = require("sequelize");
const axios = require("axios");

const kakao = {
  clientID: process.env.KAKAO_clientID,
  redirectUri: process.env.KAKAO_redirectUri,
  clientSecret: process.env.KAKAO_clientSecret,
  logoutRedirectUri: process.env.KAKAO_logoutRedirectUri,
};

/* login 페이지 */
exports.view_login = (req, res) => {
  if (req.session.user || req.session.kakao) {
    res.send("로그인 된 유저입니다!");
  } else res.render("login");
};

/* login */
exports.login = (req, res) => {
  let data = {
    id: req.body.id,
    pw: req.body.pw,
  };
  User.findOne({ where: { id: data.id, pw: data.pw } }).then((result) => {
    if (result) {
      console.log("Cuser 유저 정보 : ", result.dataValues); // 사용자 정보(객체)
      req.session.user = result.dataValues;
      res.send(true); // 로그인 성공
    } else {
      res.send(false); // 로그인 실패
    }
  });
};
// 카카오 로그인 화면
exports.view_kakaoLogin = (req, res) => {
  const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.redirectUri}&response_type=code`;
  res.redirect(kakaoAuthURL);
};
// 카카오 로그인
exports.kakaoLogin = async (req, res) => {
  //access토큰을 받기 위한 코드
  await axios({
    method: "POST",
    url: "https://kauth.kakao.com/oauth/token",
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    data: {
      grant_type: "authorization_code", //특정 스트링
      client_id: kakao.clientID,
      client_secret: kakao.clientSecret,
      redirect_uri: kakao.redirectUri,
      code: req.query.code, //결과값을 반환했다. 안됐다.
    },
  })
    .then((res) => {
      accessToken = res.data.access_token;
      return userInfo(res.data);
    })
    .then((user) => {
      console.log("user : ", user);

      // database에 있는 user면 그냥 바로 session, 없으면 create
      let data = {
        id: user.kakao_account.email,
        pw: "",
        name: user.properties.nickname,
        profile_img: user.properties.thumbnail_image,
        social_type: "kakao",
      };

      User.findOne({ where: { id: data.id } }).then((result) => {
        // 회원가입 된 유저
        if (result) {
          req.session.kakao = data;
          res.redirect("/");
        } else {
          // 닉네임 중복 검사
          User.findOne({ where: { name: data.name } }).then((result) => {
            if (result) {
              axios({
                method: "get",
                url: "https://nickname.hwanmoo.kr/?format=json&max_length=10",
              })
                .then((res) => {
                  data.name = res.data.words[0];
                })
                .then(() => {
                  User.create(data).then(() => {
                    req.session.kakao = data;
                    res.redirect("/");
                  });
                });
            } else {
              User.create(data).then(() => {
                req.session.kakao = data;
                res.redirect("/");
              });
            }
          });
        }
      });
    });
};

/* logout */
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.send(true);
  });
};
exports.view_kakaoLogout = (req, res) => {
  const kakaoLogout = `https://kauth.kakao.com/oauth/logout?client_id=${kakao.clientID}&logout_redirect_uri=${kakao.logoutRedirectUri}`;
  res.redirect(kakaoLogout);
};
exports.kakaoLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/");
  });
};

function userInfo(token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    }).then((res) => {
      resolve(res.data);
    });
  });
}

/* singup - User 정보 저장 */
exports.signup = (req, res) => {
  let data;
  // 프로필 이미지가 있으면
  if (req.file) {
    data = {
      id: req.body.id,
      pw: req.body.pw,
      name: req.body.name,
      profile_img: "/static/upload_img/" + req.file.filename,
    };
    // 프로필 이미지가 없으면
  } else {
    data = {
      id: req.body.id,
      pw: req.body.pw,
      name: req.body.name,
      profile_img: "/static/upload_img/noprofile/avatar_640.png",
    };
  }
  // 회원 가입 시, id 및 닉네임 중복 확인
  User.findOne({
    where: { [Op.or]: [{ id: data.id }, { name: data.name }] },
  }).then((result) => {
    if (result)
      // 데이터가 있으면
      res.send(false); // 사용 불가능
    else {
      User.create(data).then(() => {
        res.send(true); // 사용 가능
      });
    }
  });
};
