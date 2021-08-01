const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);

const cd = $(".cd");
const cdWidth = cd.offsetWidth;
const heading = $('header h2');
const singer = $('header h4');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn.btn-toggle-play')
const player = $('.player');
const likeBtn = $('.btn-like');
const control = $('.control');
const access = $('.Accessibility');
const progress = $('#progress');
const sound = $('#sound');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const baiHat = $('.song');
const randomBtnUp = $(".btn-random.up");
const repeatBtnUp = $(".btn-repeat.up");
const randomBtnDown = $(".btn-random.down");
const repeatBtnDown = $(".btn-repeat.down");
const download = $(".btn-option");
const playlist = $(".playlist");
const timeLeft = $('.time-left');
const timeRight = $('.time-right');
const muted = $('.muted');
const mute = $('.fa-volume-mute');
const volUp = $('.volume-up')
const appearBtn = $('.btn-down');
const appear = $('.appear');
const upBtn = $('.fa-caret-up');
const downBtn = $('.fa-caret-down');


const app = {
    currentIndex: 0,
    isRandom: false,
    isRepeat: false,
    isDownload: false,
    isAppear: false,
    isPlaying: false,
    isLike: false,
    isDisplay: false,
    isMuted: false,
    songs: [
        {
            name:'Hạ còn vương nắng',
            singer:'DATKAA x KIDO x Prod',
            path:'./assets/music/Ha Con Vuong Nang - DatKaa.mp3',
            image: './assets/image/ha_con_vuong_nang.jpg'
        },
        {
            name:'Unravel',
            singer:'Tokyo Ghoul Opening',
            path:'./assets/music/UnravelTokyoGhoulOpening-TKLingTositeSigure-3252204.mp3',
            image: './assets/image/tokyo_ghoul.jpg'
        },
        {
            name:'Quê tôi Remix',
            singer:'Dũng bố đời',
            path:'./assets/music/Nhac-Chuong-Que-Toi-Remix-Thuy-Chi.mp3',
            image: './assets/image/que_toi.jpg'
        },
        {
            name:'Giấc mơ trưa',
            singer:'Thùy Chi',
            path:'./assets/music/GiacMoTruaRemix-DJThanh_pbjc.mp3',
            image: './assets/image/giac_mo_trua.jpg'
        },
        {
            name:'Vẽ',
            singer:'Trúc Nhân',
            path:'./assets/music/VeElectroVersion-TrucNhan-3673181.mp3',
            image: './assets/image/ve_tn.jpg'
        },
        {
            name:'Unity',
            singer:'Alan Walker',
            path:'./assets/music/Unity-AlanWalkerWalkers-6037889.mp3',
            image: './assets/image/unity.jpg'
        },
        {
            name:'Tây Tiến',
            singer:'Quang Dũng',
            path:'./assets/music/TayTien-VidicHTropix-6135979.mp3',
            image: './assets/image/tay_tien.jpg'
        },
    ],
    render: function() {
        const htmls = this.songs.map((song,index) => {
            return `<div class="song ${ index === this.currentIndex ? 'active' : ''}" data-index="${index}">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>`
        })
        playlist.innerHTML = htmls.join('')
    },
    
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong',{
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvent: function() {
        const _this = this;

        // xử lí CD quay 
        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration:10000,
            iterations:Infinity,
        })
        cdThumbAnimate.pause()
        
        // xử lí phóng to / thu nhỏ CD
        document.onscroll = function() { 
            const scrollTop = document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
            if(cd.style.width === 0 + 'px') {
                access.style.display = 'none'  
                _this.isDisplay = false
            } else {
                access.style.display = 'block'
                _this.isDisplay = true
            }
            if(_this.isDisplay) {
                playlist.style.marginTop = 550 + 'px'
                control.classList.remove('apply')
                control.style.justifyContent = 'center'
            } else {
                playlist.style.marginTop = 450 + 'px'
                control.classList.add('apply')
                control.style.justifyContent = 'space-around'
            }
        }

        // xử lý click vào play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();                
            } else {
                audio.play();
            }


            // khi song được play 
            audio.onplay = function () {
                _this.isPlaying = true
                player.classList.add('playing');
                cdThumbAnimate.play()
            }
            // khi song pause
            audio.onpause = function () {
                _this.isPlaying = false
                player.classList.remove('playing');
                cdThumbAnimate.pause()
            }
            // thay đổi tiến độ bài hát
            audio.ontimeupdate = function(){
            if(audio.duration) {
                const progressPercents = Math.floor(audio.currentTime / audio.duration *100)
                progress.value = progressPercents
                _this.loadCurrentTime()
            }
        }
    }

        
        // thay đổi khi tua bài hát
        progress.oninput = function (e) {
            const seekTime = progress.value * audio.duration / 100
            audio.currentTime = seekTime
        }

        // xử lí khi thay đổi âm lượng
        sound.oninput = function () {
            audio.volume = sound.value
        }

        // xử lí bật tắt tiếng
        muted.onclick = function () {
            if(_this.isMuted) {
                audio.muted = false
                muted.classList.remove("active")
                _this.isMuted = false
            } else {
                audio.muted = true
                muted.classList.add("active")
                _this.isMuted = true
            }
        }

        // xử lí click nút like
        likeBtn.onclick = function () {
            if(_this.isLike){
                likeBtn.classList.remove('active')
                _this.isLike = false
            } else {
                likeBtn.classList.add('active')
                _this.isLike = true
            }
        }

        // xử lí click nút nextSong
        nextBtn.onclick = function () {
            if(_this.isRandom){
                _this.playRandomSong()
            } else {
                _this.nextSong
            }
            _this.nextSong()
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // xử lí click nút prevSong
        prevBtn.onclick = function () {
            if(_this.isRandom){
                _this.playRandomSong()
            } else {
                _this.prevSong
            }
            _this.prevSong()
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // Random bài hát
        randomBtnUp.onclick = function () {
            _this.isRandom = !_this.isRandom
            // _this.setConfig('isRandom', _this.isRandom)
            randomBtnUp.classList.toggle('active', _this.isRandom)
            randomBtnDown.classList.toggle('active', _this.isRandom)
        }
        randomBtnDown.onclick = function () {
            _this.isRandom = !_this.isRandom
            // _this.setConfig('isRandom', _this.isRandom)
            randomBtnDown.classList.toggle('active', _this.isRandom)
            randomBtnUp.classList.toggle('active', _this.isRandom)
        }

        // Xử lí phát lại 1 bài hát 
        repeatBtnUp.onclick = function () {
            _this.isRepeat = !_this.isRepeat
            // _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtnUp.classList.toggle('active', _this.isRepeat)
            repeatBtnDown.classList.toggle('active', _this.isRepeat)

        }
        repeatBtnDown.onclick = function () {
            _this.isRepeat = !_this.isRepeat
            // _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtnDown.classList.toggle('active', _this.isRepeat)
            repeatBtnUp.classList.toggle('active', _this.isRepeat)

        }

        // Xử lí download
        download.onclick = function () {
            _this.isDownload = !_this.isDownload
            download.classList.toggle('active', _this.isdownload)
        }

        // Xử lí next Song khi audio end
        audio.onended = function () {
            if(_this.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }

        // Xử lí hiện playlist 
        appearBtn.onclick = function () {
            if(_this.isAppear) {
                playlist.classList.remove("slip-down")
                upBtn.style.display = "none"
                downBtn.style.display = "block"
                _this.isAppear = false

            } else {
                playlist.classList.add("slip-down")
                upBtn.style.display = "block"
                downBtn.style.display = "none"
                _this.isAppear = true
            }
        }

        // Lắng nghe click vào playlist
        playlist.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)')

            if(e.target.closest('.song:not(.active)') || !e.target.closest('.option')) {
                
                // Xử lí khi click vào song
                if(e.target.closest('.song:not(.active)')) {
                    if(songNode) {
                        _this.currentIndex = Number(songNode.dataset.index)
                        _this.loadCurrentSong()
                        _this.render()
                        audio.play()
                    }
                }

            }
        }
    },

    scrollToActiveSong: function () {
        setTimeout(() => {
            if (this.currentIndex <= 3) {
              $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'end',
              });
            } else {
              $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }
          }, 300);
    },

    loadCurrentSong: function() {
        const _this = this
        heading.textContent = this.currentSong.name
        singer.textContent = this.currentSong.singer
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
        audio.onloadedmetadata = function () {
            _this.loadDurationTime()
        }
    },
    loadCurrentTime: function() {
        timeLeft.textContent =  this.secondsToHms(Math.floor(audio.currentTime))
    },
    loadDurationTime: function() {
        timeRight.textContent =  this.secondsToHms(Math.floor(audio.duration))
    },
    secondsToHms:function (d) {
        d = Number(d);
        var m = Math.floor(d / 60);
        var s = Math.floor(d % 60);
    
        var mDisplay = m > 0 ? (m>=10 ? m : "0" + m) : "00";
        var sDisplay = s > 0 ? (s>=10 ? s : "0" + s) : "00";
        return  mDisplay + ":" + sDisplay; 
    },
    playRandomSong: function () {
        let newIndex
        do{
            newIndex = Math.floor(Math.random() * this.songs.length)
        }while(newIndex === this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    nextSong: function() {
        this.currentIndex++ 
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function() {
        this.currentIndex--
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    start: function() {
        // định nghĩa các thuộc tính của object
        this.defineProperties()

        // Lắng nghe và xử lý các sự kiện(DOM events)
        this.handleEvent()


        // tải thông tin bài hát đầu tiên vào UI khi run app
        this.loadCurrentSong()

        // render playlist
        this.render();
    }
}
app.start();