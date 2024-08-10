const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const cdWidth = cd.offsetWidth 
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')

const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const repeatBtn = $('.btn-repeat')

const theme = $('.theme-mode')
const themeBtn = $('.theme-btn')

const dashBoard = $('.dashboard')
const titles = $$('.title')


// tinh thoi gian bai hat:
//console.log(Math.floor(audio.duration/60)+':'+ Math.floor((audio.duration-Math.floor(audio.duration))*60))

var app = {
    currentIndex: 0,
    isPlaying: false,
    isRepeat: false,
    song: [
        {
            name: 'Glory days',
            singer: 'Luna Haruna',
            image: './assets/img/Glory_days_cover.webp',
            audio: './assets/music/y2mate.com - glory days movie Version.mp3'
        },
        {
            name: 'Hit Me Up',
            singer: 'KIRA',
            image: './assets/img/artworks-1ucaBWENwzSv6CyR-kPBfTg-t500x500.jpg',
            audio: './assets/music/utomp3.com - Muse DashHIT ME UPOfficial MV.mp3'
        },
        {
            name: 'Die For You',
            singer: 'VALORANT',
            image: './assets/img/maxresdefault.jpg',
            audio: './assets/music/y2mate.com - Die For You ft Grabbitz  Official Music Video  VALORANT Champions 2021.mp3'
        },
        {
            name: 'Starlog',
            singer: 'ChouCho',
            image: './assets/img/0.jpg',
            audio: './assets/music/utomp3.com - starlog.mp3'
        },
        {
            name: 'Darling In The Night',
            singer: 'The Eminence in the shadow',
            image: './assets/img/1669789143299_640.jpg',
            audio: './assets/music/utomp3.com - Darling in the Night.mp3'
        },
        {
            name: '青春のアーカイブ',
            singer: '花守ゆみり',
            image: './assets/img/MV5BMzc1MTA0ZmQtMWU1OC00MDJhLTkxZjQtYjk5OWVhNTliNjJiXkEyXkFqcGdeQXVyMTM3NDc1OTM2._V1_.jpg',
            audio: './assets/music/y2mate.com - 青春のアーカイフ.mp3'
        },
        {
            name: 'Only for you',
            singer: '千本木彩花',
            image: './assets/img/0 (1).jpg',
            audio: './assets/music/utomp3.com - Only for you.mp3'
        },
        {
            name: 'Had I Not Seen the Sun',
            singer: 'Robin',
            image: './assets/img/1200x1200bf-60.jpg',
            audio: './assets/music/y2mate.com - Had I Not Seen the Sun.mp3'
        },
        {
            name: 'Embers in a Shell',
            singer: 'HOYO-Mix',
            image: './assets/img/maxresdefault (1).jpg',
            audio: './assets/music/utomp3.com - Firefly Trailer OST Embers in a Shell HQ Cover  Honkai Star Rail.mp3'
        },
    ],
    
    renderMusic() {   
            htmls = app.song.map((music) => {
                return `
            <div class="song">
                <div class="thumb" style="background-image: url('${music.image}')">
                </div>
                <div class="body">
                <h3 class="title">${music.name}</h3>
                <p class="author">${music.singer}</p>
                </div>
                <div class="option">
                <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>`
            })
            $('.playlist').innerHTML = htmls.join('')
    },
    
    handleEvents() {
        const _this = this
        //Xu ly phong to/thu nho cd
        document.onscroll = function(){
            const scroll = window.scrollY || document.documentElement.scrollTop
            var newCdWidth = cdWidth - scroll
            cd.style.width =newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth/cdWidth
        }

        //Xu ly khi bam vao nut play
        playBtn.onclick = function() {
            if(_this.isPlaying) {
                audio.pause()
                cdThumb.style.animationPlayState = 'paused'
            } else {
                audio.play()
                cdThumb.style.animation = 'spin 10s linear infinite'
                cdThumb.style.animationPlayState = 'running'
            }
            
        }
        //Khi bai hat duoc play
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')            
        }

        //Khi bai hat dung
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
        }

        //Khi tien do bai hat thay doi
        audio.ontimeupdate = function() {
            if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime/audio.duration*100)
                progress.value = progressPercent
            }
            
        }

        //Tua thoi luong bai hat
        progress.oninput = function(e) {
            const seekTime = e.target.value
            audio.currentTime = seekTime / 100 * audio.duration
        }

        //Khi het bai hat thi chuyen sang bai tiep theo
        audio.onended = function() {
            if(_this.currentIndex < _this.song.length-1) {
                _this.currentIndex++
                _this.loadCurrentSong()
                audio.play()
            } else {
                _this.currentIndex = 0
                _this.loadCurrentSong()
                audio.play()
            }
        }

        //Khi bam vao nut next
        nextBtn.onclick = function() {
            if(_this.currentIndex < _this.song.length - 1) {
                progress.value = 0
                _this.currentIndex++
                _this.loadCurrentSong()
                audio.play()
                cdThumb.style.animation = 'spin 10s linear infinite'
            } else {
                _this.currentIndex = 0
                _this.loadCurrentSong()
                audio.play()
                cdThumb.style.animation = 'spin 10s linear infinite'
            }
        }

        //Khi bam vao nut backward
        prevBtn.onclick = function() {
            if(_this.currentIndex > 0) {
                progress.value = 0
                _this.currentIndex--
                _this.loadCurrentSong()
                audio.play()
                cdThumb.style.animation = 'spin 10s linear infinite'
            }
        }

        //Khi bam vao nut repeat
        repeatBtn.onclick = function() {
            if(_this.isRepeat) {
                _this.isRepeat = false
                repeatBtn.classList.remove('active')
                audio.onended = function() {
                    _this.currentIndex++
                    _this.loadCurrentSong()
                    audio.play()
                }
            } else {
                _this.isRepeat = true
                repeatBtn.classList.add('active')
                audio.onended = function() {
                    audio.play()
                }
            }
        }

        //Thay doi theme khi bam vao nut
        theme.onclick = function() {
            if(themeBtn.classList.contains('light-btn')){
                theme.classList.remove('light-theme')
                themeBtn.classList.remove('light-btn')
                theme.classList.add('dark-theme')
                themeBtn.classList.add('dark-btn')

                document.documentElement.style.setProperty('--text-color', 'white')
                
                $('html').style.backgroundColor = '#333'
                $('body').style.backgroundColor = '#333'
                $('h2').style.color = 'var(--text-color)'
                dashBoard.style.backgroundColor = 'black'
                dashBoard.style.border = '1px solid white'
                $$('.song').forEach(function(song){
                    song.style.backgroundColor = 'black'
                    song.style.border = '1px solid white'
                })
                
                
            } else {
                theme.classList.remove('dark-theme')
                themeBtn.classList.remove('dark-btn')
                theme.classList.add('light-theme')
                themeBtn.classList.add('light-btn')

                document.documentElement.style.setProperty('--text-color', '#333')
                $('html').style.backgroundColor = ''
                $('body').style.backgroundColor = '#f5f5f5'
                $('h2').style.color = 'var(--text-color)'
                dashBoard.style.backgroundColor = '#fff'
                dashBoard.style.border = ''

                $$('.song').forEach(function(song){
                    song.style.backgroundColor = 'white'
                    song.style.border = '1px solid white'
                })
            }
        }
        
            

    },

    defineProperties() {
        Object.defineProperty(this, 'currentSong', {
            get() {
                return this.song[this.currentIndex]
            }
        })
    },

    loadCurrentSong() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.audio
    },

    
    start() {
        //Hien thi playlist
        this.renderMusic()

        //Dinh nghia cac thuoc tinh cho object
        this.defineProperties()

        //Xu ly cac su kien DOM
        this.handleEvents()

        //Tai thong tin bai hat hien tai
        this.loadCurrentSong()

        audio.volume = 0.1
    }
}

app.start()
