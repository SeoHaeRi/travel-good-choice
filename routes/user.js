var express = require('express');
var controller = require('../controller/Cuser');
const multer = require("multer");
const path = require('path');
const router = express.Router();
const mypage = require('../controller/CmyPage');

/* user 프로필 업로드 */
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'static/upload_img');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const filename = req.body.name + ext;
      done(null, filename);
    },
  }),
});

router.post('/signup', upload.single("userfile"), controller.signup);

router.get('/login', controller.view_login)
router.post('/login', controller.login);
router.get('/login/kakao', controller.view_kakaoLogin);
router.get('/kakao/finish', controller.kakaoLogin);

router.delete('/logout', controller.logout);
router.get('/logout/kakao', controller.view_kakaoLogout);
router.get('/kakao/logout', controller.kakaoLogout);

router.get('/modify', mypage.post_modify);
router.patch('/update', mypage.post_update);


router.get('/mypage', checkSession, mypage.mypage_index);
/* 로그인 확인 미들웨어 */
function checkSession(req, res, next) {
  if (((req.session.user.id || req.session.kakao.id) != null) && (req.session.user.id || req.session.kakao.id) != '') next();
  else {
    res.redirect('/login');
  }
}

module.exports = router;