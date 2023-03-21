const express = require("express");
const socket = require('socket.io');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const http = require('http');
const app = express();
const server = http.createServer(app);

/* 생성된 서버를 socket.io에 바인딩 */
const io = socket(server)

const dotenv = require("dotenv");
dotenv.config({ path: './controller/.env' })

const port = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.use("/static", express.static("static"));
app.use('/css', express.static('./static/css'));
app.use('/js', express.static('./static/js'));
app.use('/contents', express.static('./static/post_img'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: '1234',
  resave: false,
  saveUninitialized: true
  // cookie: {}
  // secure:
}))

const router = require("./routes");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post")
app.use('/', router);
app.use('/user', userRouter);
app.use('/post', postRouter)
app.use('/css', express.static('./static/css'))
app.use('/js', express.static('./static/js'))


app.get('*', (req, res) => {
  res.send("접근할 수 없는 주소입니다.");
});

io.sockets.on('connection', (socket) => {

  /* 새로운 유저가 접속했을 경우 다른 소켓에게도 알려줌 */
  socket.on('newUser', (name) => {

    console.log(name + ' 님이 접속하였습니다.')

    /* 소켓에 이름 저장해두기 */
    socket.name = name

    /* 모든 소켓에게 전송 */
    io.sockets.emit('update', { type: 'connect', name: 'SERVER', message: name + '님이 접속하였습니다.' })
  })

  /* 전송한 메시지 받기 */
  socket.on('message', function (data) {
    /* 받은 데이터에 누가 보냈는지 이름을 추가 */
    data.name = socket.name

    console.log(data)

    /* 보낸 사람을 제외한 나머지 유저에게 메시지 전송 */
    socket.broadcast.emit('update', data);
  })

  /* 접속 종료 */
  socket.on('disconnect', function () {
    console.log(socket.name + '님이 나가셨습니다.')

    /* 나가는 사람을 제외한 나머지 유저에게 메시지 전송 */
    socket.broadcast.emit('update', { type: 'disconnect', name: 'SERVER', message: socket.name + '님이 나가셨습니다.' });
  })
})

server.listen(port, () => {
  console.log("Server Port : ", port);
});