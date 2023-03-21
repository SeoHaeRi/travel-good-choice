if(!window['worldCup']) {
	worldCup = {};
	( function (_O) {
    _O.init = () => {
      const v = _O.Vars;
      v.curRound = 16;
      v.curStage = 0;
      v.gameHistory = {
        '16': [],
        '8': [],
        '4': [],
        '2': [],
        '1': []
      };
      v.lists = _O.Ctrl.getLists();
      _O.Ctrl.prevCancelOnOff();
    };
    _O.start = () => {
      _O.init();
      _O.Ctrl.gameNewStart.bind(_O.Ctrl)();
    };
    _O.Vars = {
      lists:null,
      curRound: 0,
      curStage: 0,
      maxRound: 16,
      gameHistory: null
    };
    _O.Ctrl = {
      getLists() {
        return [
          {
            local: '서울Seoul',
            imgSrc: "../static/img/seoul.jpg",
            url : "https://travel.naver.com/domestic/09/guide/all",
            selected: false
          },
          {
            local: '인천Incheon',
            imgSrc: "../static/img/incheon.jpg",
            url : "https://travel.naver.com/domestic/11/guide/all",
            selected: false
          },
          {
            local: '가평Gapyeong',
            imgSrc: "../static/img/gapyeong.jpg",
            url : "https://travel.naver.com/domestic/02820/guide/all",
            selected: false
          },
          {
            local: '제주Jeju',
            imgSrc: "../static/img/Jeju.jpg",
            url : "https://travel.naver.com/domestic/14110/guide/all",
            selected: false
          },
          {
            local: '춘천Chuncheon',
            imgSrc: "../static/img/chuncheon.jpg",
            url : "https://travel.naver.com/domestic/01110/guide/all",
            selected: false
          },
          {
            local: '강릉Gangneung',
            imgSrc: "../static/img/Gangneung.jpg",
            url : "https://travel.naver.com/domestic/01150/guide/all",
            selected: false
          },
          {
            local: '정선Jeongseon',
            imgSrc: "../static/img/Jeongseon.jpg",
            url : "https://travel.naver.com/domestic/01770/guide/all",
            selected: false
          },
          {
            local: '대전Daejeon',
            imgSrc: "../static/img/Daejeon.jpg",
            url : "https://travel.naver.com/domestic/07/guide/all",
            selected: false
          },
          {
            local: '부여Buyeo',
            imgSrc: "../static/img/Buyeo.jpg",
            url : "https://travel.naver.com/domestic/15760/guide/all",
            selected: false
          },
          {
            local: '태안Taean',
            imgSrc: "../static/img/Taean.jpg",
            url : "https://travel.naver.com/domestic/15825/guide/all",
            selected: false
          },
          {
            local: '세종sejong',
            imgSrc: "../static/img/sejong.jpg",
            url : "https://travel.naver.com/domestic/17/guide/all",
            selected: false
          },
          {
            local: '청주Cheongju',
            imgSrc: "../static/img/Cheongju.jpg",
            url : "https://travel.naver.com/domestic/16110/guide/all",
            selected: false
          },
          {
            local: '단양Danyang',
            imgSrc: "../static/img/Danyang.jpg",
            url : "https://travel.naver.com/domestic/16800/guide/all",
            selected: false
          },
          {
            local: '광주Gwangju',
            imgSrc: "../static/img/Gwangju.jpg",
            url : "https://travel.naver.com/domestic/05/guide/all",
            selected: false
          },
          {
            local: '전주Jeonju',
            imgSrc: "../static/img/Jeonju.jpg",
            url : "https://travel.naver.com/domestic/13110/guide/all",
            selected: false
          },
          {
            local: '여수Yeosu',
            imgSrc: "../static/img/Yeosu.jpg",
            url : "https://travel.naver.com/domestic/12130/guide/all",
            selected: false
          }
        ];
      },
      rndLists(arr) { //배열 랜덤 섞음
        return arr.map((n) => { return [Math.random(), n] }).sort().map((n) => {  return n[1] });//n[1].selected = false;
      },
      selectedLists(arr) {
        return arr.filter((n) => n.selected === true);
      },
      gameNewStart() {
        const v = _O.Vars;
        v.gameHistory[v.curRound.toString()] = this.rndLists(v.lists);
        _O.Html.set.bind(_O.Html)();
      },
      copyObj(obj) { //Deep Copy
        let copy = {};
        for (let attr in obj) {
          if (obj.hasOwnProperty(attr)) {
            copy[attr] = obj[attr];
          }
        }
        copy.selected = false;
        return copy;
      },
      nextRound() {
        const v = _O.Vars;
        if(v.curRound <= 1) return;
        v.lists = _O.Ctrl.selectedLists(v.gameHistory[v.curRound.toString()]).map((n) => _O.Ctrl.copyObj(n));
        if(v.curRound > 1) v.curRound /= 2;
        v.curStage = 0;
        v.gameHistory[v.curRound.toString()] = this.rndLists(v.lists);
        // console.log('v.lists::',v.lists, 'v.gameHistory::',v.gameHistory);
        _O.Html.setRoundTitle();
      },
      prevCancelOnOff() {
        const footerObj = document.getElementById('footer');
        if(_O.Vars.curRound === _O.Vars.maxRound) {
          if(_O.Vars.curRound > 1 && _O.Vars.curStage > 0) footerObj.className = 'footer';
          else footerObj.className = 'footer soff';
        } else {
          if(_O.Vars.curRound > 1) footerObj.className = 'footer';
          else footerObj.className = 'footer soff';
        }
      }
    };
    _O.Event = {
      clickItem(obj) {
        const v = _O.Vars;
        if(v.curRound === 1) return;
        const idx = obj.id.split('_')[1];
        v.gameHistory[v.curRound.toString()][idx].selected = true;
        if(v.curStage < v.curRound/2) v.curStage++;
        if(v.curStage === v.curRound/2) _O.Ctrl.nextRound();
        _O.Html.setItem();
        _O.Ctrl.prevCancelOnOff();
      },
      overItem(obj) {
        const objs = document.querySelectorAll('#list_ideal li a[hover="true"]');
        objs.forEach((itm) => itm.setAttribute('hover', 'false'));
        if(obj.getAttribute('hover') === 'true') return;
        obj.setAttribute('hover', 'true');
      },
      outItem(obj) {
        if(obj.getAttribute('hover') === 'false') return;
        obj.setAttribute('hover', 'false');
      },
      clickCancel() {
        _O.start();
      },
      clickPrev() {
        const v = _O.Vars;
        if(v.curStage > 0) v.curStage--;
        else {
          v.gameHistory[v.curRound.toString()] = [];
          if(v.curRound < _O.Vars.maxRound) {
            v.curRound *= 2;
            v.curStage = v.curRound / 2 - 1;
          }
          _O.Html.setRoundTitle();
          v.lists = v.gameHistory[v.curRound.toString()];
        }

        v.lists[v.curStage * 2].selected = false;
        v.lists[v.curStage * 2 + 1].selected = false;
        _O.Html.setItem();
        _O.Ctrl.prevCancelOnOff();
      }
    };
    _O.Html = {
      set() {
        this.setRoundTitle();
        this.setContent();
      },
      setRoundTitle() {
        if(_O.Vars.curRound > 1) document.getElementById('roundTitle').innerText = `${_O.Vars.curRound}강 선택`;
        else document.getElementById('roundTitle').innerText = `축하합니다. 이번 겨울에는 여기 어때요?`;
      },
      setItem() {
        const s = _O.Html.getItem();
        const tObj = document.getElementById('list_ideal');
        if(!tObj) return;
        tObj.innerHTML = s;
        if(_O.Vars.curRound === 1) 
        _O.Html.setHistory();
      },
      getItem() {
        let s = '', i = _O.Vars.curStage * 2, length = i + (_O.Vars.curRound > 1 ? 2 : _O.Vars.curRound);
        for(i; i < length && length <= _O.Vars.curRound; i++) {
          s += `
          <li>
          <div style="text-align : center;">
          <a href="${_O.Vars.gameHistory[_O.Vars.curRound.toString()][i]['url']}">
          <button id="goto"  type="button">
          ${_O.Vars.gameHistory[_O.Vars.curRound.toString()][i]['local']} 여행지 둘러보기
          </button>
          </a>
          <br>
          <a class="item ${_O.Vars.curRound === 1 ? 'final' : ''}" id="item_${i}" hover="false" href="javascript:void(0);" onclick="worldCup.Event.clickItem(this);" onmouseover="worldCup.Event.overItem(this);" onmouseout="worldCup.Event.outItem(this);">
          <span class="thumb"><img src="${_O.Vars.gameHistory[_O.Vars.curRound.toString()][i]['imgSrc']}" alt="최종 여행지 사진"></span>
          <strong> ${_O.Vars.gameHistory[_O.Vars.curRound.toString()][i]['local']}</strong>
          </a>
          </div>
          </li>
          `;
          console.log();
        }
        return s;
      },
      setContent() {
        const tObj = document.getElementById('content');
        tObj.className = 'content in_game';
        let s = `
          <ul class="list_ideal" id="list_ideal">
          ${this.getItem()}
          </ul>
        `;
        tObj.innerHTML = s;
      }
    }
	}) (worldCup);
}