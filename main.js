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

const randomBtn = $('.btn-random')
const playlist = $('.playlist')

const duration = $('.duration')
// tinh thoi gian bai hat:
//console.log(Math.floor(audio.duration/60)+':'+ Math.floor((audio.duration-Math.floor(audio.duration))*60))

var app = {
    currentIndex: 0,
    isPlaying: false,
    isRepeat: false,
    isRandom: false,
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
        {
            name: 'Sunny',
            singer: 'Yorushika',
            image: './assets/img/1200x1200bf-60 (1).jpg',
            audio: './assets/music/y2mate.com - Sunny.mp3'
        },
        {
            name: 'TruE',
            singer: 'HOYO-Mix',
            image: './assets/img/artworks-IZ4sNASYOkpZMrro-b8yoXQ-t500x500.jpg',
            audio: './assets/music/y2mate.com - TruE.mp3'
        },
        {
            name: 'If I Can Stop One Heart From Breaking',
            singer: 'Robin',
            image: './assets/img/INSIDE.webp',
            audio: './assets/music/y2mate.com - If I Can Stop One Heart From Breaking.mp3'
        },
        {
            name: 'Ticking Away',
            singer: 'Valorant',
            image: './assets/img/ab67616d0000b2732dec0133eb6e5dd2ea17ebbb.jpeg',
            audio: './assets/music/utomp3.com - Ticking Away ft Grabbitz  bbno Official Music Video  VALORANT Champions 2023 Anthem.mp3'
        },
        {
            name: 'LOVE 2000',
            singer: 'Anna Yanami',
            image: './assets/img/1719927757306_640.jpg',
            audio: './assets/music/utomp3.com - LOVE 2000.mp3'
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
        const songs = $$('.song')
        //Xu ly phong to/thu nho cd
        document.onscroll = function(){
            const scroll = window.scrollY || document.documentElement.scrollTop
            var newCdWidth = cdWidth - scroll
            cd.style.width =newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth/cdWidth

            //resize playlist
            var dashBoardHeight = dashBoard.clientHeight + 6
            
            playlist.style.marginTop = dashBoardHeight + 'px'
            // console.log(playlist.style.marginTop)
        }
        //Khi an vao bat ki dau thi se resize lai playlist
        player.onclick = function() {
            const dashBoardHeight = dashBoard.clientHeight + 6
            playlist.style.marginTop = dashBoardHeight + 'px'
            // console.log(playlist.style.marginTop)
        }

        //Xu ly khi bam vao nut play
        playBtn.onclick = function() {
            if(_this.isPlaying) {
                audio.pause()
                cdThumb.style.animationPlayState = 'paused'
            } else {
                audio.play()
                cdThumb.style.animation = 'spin 15s linear infinite'
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
                
                //Thoi luong bai hat
                var minutes = Math.floor(audio.duration/60)
                var seconds = Math.floor((audio.duration / 60 - minutes)*60)
                var currentMinutes = Math.floor(audio.currentTime/60)
                var currentSeconds = Math.floor((audio.currentTime / 60 - currentMinutes)*60)
                console.log(minutes, seconds)
                duration.textContent = currentMinutes+':'+currentSeconds.toString().padStart(2, '0') + ' / '+minutes + ':' + seconds.toString().padStart(2, '0')
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
                songs[_this.currentIndex-1].classList.remove('highlight-song')
                songs[_this.currentIndex-1].style.border = '1px solid white'
                songs[_this.currentIndex].classList.add('highlight-song')
                songs[_this.currentIndex].style.border = ''
                _this.loadCurrentSong()
                audio.play()
            } else {
                _this.currentIndex = 0
                songs[_this.song.length-1].classList.remove('highlight-song')
                songs[_this.song.length-1].style.border = '1px solid white'
                songs[_this.currentIndex].classList.add('highlight-song')
                songs[_this.currentIndex].style.border = ''
                _this.loadCurrentSong()
                audio.play()
            }
        }

        //Khi bam vao nut next
        nextBtn.onclick = function() {
            if(_this.isRandom) {
                if(_this.currentIndex >= 0) {
                    progress.value = 0
                    _this.currentIndex = Math.floor(Math.random() * _this.song.length)
                    
                    //highlight bai hat
                    songs.forEach(function(song){
                        song.classList.remove('highlight-song')
                        song.style.border = '1px solid white'
                    })
                    songs[_this.currentIndex].style.border = ''
                    songs[_this.currentIndex].classList.add('highlight-song')
                    
                    _this.loadCurrentSong()
                    audio.play()
                    cdThumb.style.animation = 'spin 15s linear infinite'
                }
            } else {
                if(_this.currentIndex < _this.song.length - 1) {
                    progress.value = 0
                    _this.currentIndex++
                    //highlight bai hat
                    songs.forEach(function(song){
                        song.classList.remove('highlight-song')
                        song.style.border = '1px solid white'
                    })
                    songs[_this.currentIndex].style.border = ''
                    songs[_this.currentIndex].classList.add('highlight-song')

                    _this.loadCurrentSong()
                    audio.play()
                    cdThumb.style.animation = 'spin 15s linear infinite'
                } else {
                    _this.currentIndex = 0

                    //highlight bai hat
                    songs.forEach(function(song){
                        song.classList.remove('highlight-song')
                        song.style.border = '1px solid white'
                    })
                    songs[_this.currentIndex].style.border = ''
                    songs[_this.currentIndex].classList.add('highlight-song')

                    _this.loadCurrentSong()
                    audio.play()
                    cdThumb.style.animation = 'spin 15s linear infinite'
                }
            }
        }

        //Khi bam vao nut backward
        prevBtn.onclick = function() {
            if(_this.isRandom) {
                if(_this.currentIndex >= 0) {
                    progress.value = 0
                    _this.currentIndex = Math.floor(Math.random() * _this.song.length)
                     
                    //highlight bai hat
                    songs.forEach(function(song){
                        song.classList.remove('highlight-song')
                        song.style.border = '1px solid white'
                    })
                    songs[_this.currentIndex].style.border = ''
                    songs[_this.currentIndex].classList.add('highlight-song')

                    _this.loadCurrentSong()
                    audio.play()
                    cdThumb.style.animation = 'spin 15s linear infinite'
                }
            }else {
                if(_this.currentIndex > 0) {
                    progress.value = 0
                    _this.currentIndex--

                    //highlight bai hat
                    songs.forEach(function(song){
                        song.classList.remove('highlight-song')
                        song.style.border = '1px solid white'
                    })
                    songs[_this.currentIndex].style.border = ''
                    songs[_this.currentIndex].classList.add('highlight-song')

                    _this.loadCurrentSong()
                    audio.play()
                    cdThumb.style.animation = 'spin 15s linear infinite'
                } else {
                    _this.currentIndex = _this.song.length - 1

                    //highlight bai hat
                    songs.forEach(function(song){
                        song.classList.remove('highlight-song')
                        song.style.border = '1px solid white'
                    })
                    songs[_this.currentIndex].style.border = ''
                    songs[_this.currentIndex].classList.add('highlight-song')
                    
                    _this.loadCurrentSong()
                    audio.play()
                    cdThumb.style.animation = 'spin 15s linear infinite'
                }
            }
        }

        //Khi bam vao nut repeat
        repeatBtn.onclick = function() {
            if(_this.isRepeat) {
                _this.isRepeat = false
                repeatBtn.classList.remove('active')
                audio.onended = function() {
                    if(_this.currentIndex < _this.song.length - 1) {
                        _this.currentIndex++
                        _this.loadCurrentSong()
                        audio.play()
                    } else {
                        _this.currentIndex = 0
                        _this.loadCurrentSong()
                        audio.play()
                    }
                }
            } else {
                _this.isRandom = false
                randomBtn.classList.remove('active')
                _this.isRepeat = true
                repeatBtn.classList.add('active')
                audio.onended = function() {
                    audio.play()
                }
            }
        }

        //Khi bam vao nut random
        randomBtn.onclick = function() {
            if(_this.isRandom) {
                _this.isRandom = false
                randomBtn.classList.remove('active')
                audio.onended = function() {
                    if(_this.currentIndex < _this.song.length - 1) {
                        _this.currentIndex++
                        _this.loadCurrentSong()
                        audio.play()
                    } else {
                        _this.currentIndex = 0
                        _this.loadCurrentSong()
                        audio.play()
                    }
                }
            } else {
                _this.isRepeat = false

                //bo highlight nut repeat
                repeatBtn.classList.remove('active')
                
                _this.isRandom = true
                randomBtn.classList.add('active')
                audio.onended = function() {
                    const randomIndex = Math.floor(Math.random() * _this.song.length)
                    _this.currentIndex = randomIndex
                    songs.forEach(function(song){
                        song.classList.remove('highlight-song')
                        song.style.border = '1px solid white'
                    })
                    songs[_this.currentIndex].style.border = ''
                    songs[_this.currentIndex].classList.add('highlight-song')
                    _this.loadCurrentSong()
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
                duration.style.color = 'var(--text-color)'
                dashBoard.style.backgroundColor = 'black'
                dashBoard.style.border = '1px solid white'
                $$('.song').forEach(function(song){
                    song.style.backgroundColor = 'black'
                    if(!song.classList.contains('highlight-song')){
                        song.style.border = '1px solid white'
                    }
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
                })
            }
        }
        
        // Khi bam vao bai hat
        songs.forEach(function(song, index){
            song.onclick = function(){
                songs.forEach(function(song){
                    song.classList.remove('highlight-song')
                    song.style.border = '1px solid white'
                })
                this.style.border = ''
                this.classList.add('highlight-song') 
                cdThumb.style.animation = 'spin 15s linear infinite'
                _this.currentIndex = index
                _this.loadCurrentSong()
                audio.play()
            }
        })
            

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
        $('.song').classList.add('highlight-song')
        // duration.textContent = this.currentSong.audio.duration
       audio.onloadedmetadata = function(){
         var minutes = Math.floor(audio.duration/60)
         var seconds = Math.floor((audio.duration / 60 - minutes)*60)
         console.log(minutes, seconds)
         duration.textContent = '0:00 / '+minutes + ':' + seconds.toString().padStart(2, '0')       
       }
    },

    
    start() {
        //Hien thi playlist
        this.renderMusic()

        //Dinh nghia cac thuoc tinh cho object
        this.defineProperties()

        //Tai thong tin bai hat hien tai
        this.loadCurrentSong()

        //Xu ly cac su kien DOM
        this.handleEvents()


        audio.volume = 0.05
    }
}

app.start()
