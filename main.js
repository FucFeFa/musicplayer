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
            name: 'Die For You',
            singer: 'VALORANT',
            image: './assets/img/maxresdefault.jpg',
            audio: './assets/music/music3.mp3'
        },
        {
            name: 'Die For You',
            singer: 'VALORANT',
            image: './assets/img/maxresdefault.jpg',
            audio: './assets/music/music3.mp3'
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
            } else {
                audio.play()
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
            _this.currentIndex++
            _this.loadCurrentSong()
            audio.play()
        }

        //Khi bam vao nut next
        nextBtn.onclick = function() {
            progress.value = 0
            _this.currentIndex++
            _this.loadCurrentSong()
            audio.play()
        }

        //Khi bam vao nut backward
        prevBtn.onclick = function() {
            if(_this.currentIndex > 0) {
                progress.value = 0
                _this.currentIndex--
                _this.loadCurrentSong()
                audio.play()
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
        //Dinh nghia cac thuoc tinh cho object
        this.defineProperties()

        //Xu ly cac su kien DOM
        this.handleEvents()

        //Tai thong tin bai hat hien tai
        this.loadCurrentSong()

        //Hien thi playlist
        this.renderMusic()
        audio.volume = 0.05
    }
}

app.start()
