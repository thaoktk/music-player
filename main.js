/**
 * 1. render songs --> OK
 * 3. play / pause / seek --> OK
 * 4. cd rotate --> OK
 * 5. next / prev --> OK
 * 7. next/ repeat when ended --> OK
 * 8. active song --> OK
 * 9. like
 * 10. play song when click --> OK
 * 11. menu/ back --> Ok
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'THAOKTK_PLAYER'

const listMusic = $('.list')
const playlist = $('.playlist')
const player = $('.player')
const heading = $('.info h3')
const author = $('.info p')
const audio = $('#audio');
const cdThumb = $('.cd-thumb')
const playBtn = $('.btn-toggle-play')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const repeatBtn = $('.btn-repeat')
const randomBtn = $('.btn-random')
const likeBtn = $('.btn-like')
const progress = $('.progress')
const progressContainer = $('.progress-container')
const menu = $('.header-icon-menu')
const backMainBtn = $('.header-icon-back-playlist')
const backInMainBtn = $('.header-icon')
const playlistOnSecond = $('.playlist .header-icon-menu')
const volumeSlider = $('.volume-slider')
const upVolume = $('.up-volume')
const downVolume = $('.down-volume')
const dashboard = $('.dashboard')

const app = {
    currentIndex: 0,
    isLiked: false,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {}, // chỗ này là get, lấy ra nên phải parse
    songs: [
        {
            name: 'Say So',
            singer: 'Doja Cat',
            path: './assets/songs/SaySo-DojaCat-6159032.mp3',
            image: './assets/img/sayso.png',
            time: '3:57'
        },
        {
            name: 'Lemon Tree',
            singer: 'Gustixa',
            path: './assets/songs/LemonTree-Gustixa-6737476.mp3',
            image: './assets/img/lemontree.jpg',
            time: '2:06'
        },
        {
            name: 'Outside',
            singer: 'Ellie Goulding',
            path: './assets/songs/Outside - Calvin Harris_ Ellie Goulding.mp3',
            image: './assets/img/outside.png',
            time: '3:46'
        },
        {
            name: 'Save Your Tears',
            singer: 'The Weeknd',
            path: './assets/songs/SaveYourTears-TheWeeknd-6341494.mp3',
            image: './assets/img/save your tears.jpg',
            time: '3:35'
        },
        {
            name: 'Play Date',
            singer: ' Melanie Martinez',
            path: './assets/songs/Play Date - Melanie Martinez.mp3',
            image: './assets/img/playdate.jpg',
            time: '2:59'
        },
        {
            name: 'L.O.V.E',
            singer: 'Nat King Cole',
            path: './assets/songs/L_O_V_E - Nat King Cole.mp3',
            image: './assets/img/l.o.v.e.2.jpeg',
            time: '2:34'
        },
        {
            name: 'Rockabye',
            singer: 'Clean Bandit',
            path: './assets/songs/Rockabye - Clean Bandit_ Sean Paul_ Anne.mp3',
            image: './assets/img/rockabye.jpg',
            time: '4:09'
        },
        {
            name: 'Love Story',
            singer: 'Taylor Swift',
            path: './assets/songs/LoveStory-TaylorSwift-5046622.mp3',
            image: './assets/img/lovestory.png',
            time: '3:54'
        },
        {
            name: 'You Belong With Me',
            singer: 'Taylor Swift',
            path: './assets/songs/You Belong With Me - Taylor Swift.mp3',
            image: './assets/img/youbelongwithme.jpg',
            time: '3:52'
        },
        {
            name: 'Symphony',
            singer: 'Clean Bandit',
            path: './assets/songs/Symphony-CleanBanditZaraLarsson-4822950.mp3',
            image: './assets/img/symphony.jpg',
            time: '3:32'
        },
        {
            name: 'Rather Be',
            singer: 'Clean Bandit',
            path: './assets/songs/Rather Be - Clean Bandit_ Jess Glynne.mp3',
            image: './assets/img/rather-be.jpg',
            time: '3:48'
        }
    ],
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
                <div data-index="${index}" class="song ${index === this.currentIndex ? 'active' : ''}">
                    <div class="song-name">
                        <h3>${song.name}</h3>
                        <p>${song.singer}</p>
                    </div>
                    <div class="song-play">
                        <div class="time">${song.time}</div>
                        <div class="button-on-play">
                            <div class="btn btn-toggle-play-on-active">
                                <i class='icon-pause bx bx-pause' ></i>
                                <i class='icon-play bx bx-play' ></i>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }).join('');

        listMusic.innerHTML = htmls;
    },
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config)) // set thì cho nó về chuỗi json, get ở trên thì cho nó về obj
    },
    defineProperties: function() { 
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]; 
            }
        })
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        author.textContent = this.currentSong.singer;
        cdThumb.src = this.currentSong.image;
        audio.src = this.currentSong.path;
    },
    handleEvents: function() {
        audio.volume = volumeSlider.value / 100
        const _this = this;

        // xử lý khi cd quay 
        const cdThumbAnimate = cdThumb.animate({ transform: 'rotate(360deg'}, { duration: 10000, iterations: Infinity})
        cdThumbAnimate.pause();

        // xử lý khi play, pause
        playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
            
        }

        // cho vao set time de no render bai hat ra moi chay dong nay dc
        setInterval(function() {
            // xử lý play khi đang ở trên playlist 
                if ($('.song.active')) {
                    const playOnPlaylist = $('.song.active .button-on-play')
                    playOnPlaylist.onclick = function() {
                        if (_this.isPlaying) {
                            audio.pause()
                        }
                    }
                }
        }, 100)

        // khi audio dc phát
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        }

        // khi audio dừng
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }

        // thanh progress chạy
        audio.ontimeupdate = function() {
            if (audio.duration) { // nếu còn thời lượng
                const progressPercent = audio.currentTime / audio.duration * 100; // ra %
                progress.style.width = `${progressPercent}%`;
            }
        }

        // khi ấn vào thanh progress để tua 
        progressContainer.onclick = function(e) {
            const width = this.clientWidth; // chiều dài của cái progress
            const clickX = e.offsetX; // vị trí chiều ngang khi click
            const duration = audio.duration;

            audio.currentTime = (clickX / width) * duration; // lấy vị trí click chia cho đọ rộng thanh bar r nhân với thời lượng ra time;
        }

        // xử lý khi next bài
        nextBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.nextSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        // xử lý khi prev bài
        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        // xử lý khi hết bài khi bấm repeat 
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }

        // random song
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom', _this.isRandom);
            randomBtn.classList.toggle('active', _this.isRandom);
        }

        // xử lý khi like 
        likeBtn.onclick = function() {
            _this.isLiked = !_this.isLiked;
            likeBtn.classList.toggle('liked', _this.isLiked);
        }

        // xử lý nextSong khi audio ended 
        audio.onended = function() {
            if (_this.isRepeat) {
                audio.play(); // nút repeat mà dc bật thì chạy lại
            } else {
                nextBtn.click(); // tự click 
            }
        }

        listMusic.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)');

            if (songNode) {
                _this.currentIndex = Number(songNode.getAttribute('data-index'));
                _this.loadCurrentSong(); //load lại thông tin
                _this.render(); // phía load lại bài hát hiện tại chứ
                audio.play();
            }
        }

        // menu mở list nhạc
        menu.onclick = function() {
            playlist.classList.add('active')
            dashboard.classList.add('active')
        }

        // trở về trnag chủ 
        backMainBtn.onclick = function() {
            playlist.classList.remove('active')
            dashboard.classList.remove('active')
        }

        // back in main 
        backInMainBtn.onclick = function() {
            alert('Nothing to back!');
        }
        // playlist menu on playlist
        playlistOnSecond.onclick = function() {
            alert('Nothing to show!');
        }

        volumeSlider.oninput = function() {
            _this.setVolume();
        }

        upVolume.onclick = function() {
            _this.upVolume();
        }
        

        downVolume.onclick = function() {
            _this.downVolume();
        }
    },
    playRandomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex);

        this.currentIndex = newIndex
        this.loadCurrentSong();
    },
    nextSong: function() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }

        this.loadCurrentSong();
    },
    prevSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }

        this.loadCurrentSong();
    },
    setVolume: function() {
        audio.volume = volumeSlider.value / 100
    },
    upVolume: function() {
        audio.volume = audio.volume + 0.01;
        if (audio.volume > 1) {
            audio.volume = 1;
        }
        volumeSlider.value = Math.floor((audio.volume) * 100)
    },
    downVolume: function() {
        audio.volume = audio.volume - 0.01;
        if (audio.volume < 0) {
            audio.volume = 0;
        }
        volumeSlider.value = Math.floor((audio.volume) * 100)
    },
    scrollToActiveSong: function() {
        const songActive = $('.song.active')
        setTimeout(() => {
            if (this.currentIndex <= 3) {
                songActive.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                })
            } else {
                songActive.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                })
            }
        }, 100)
    },
    loadConfig: function() {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    start: function() {
        this.loadConfig();
        this.handleEvents();
        this.defineProperties();
        this.loadCurrentSong();
        this.render();

        randomBtn.classList.toggle('active', this.isRandom);
        repeatBtn.classList.toggle('active', this.isRepeat);
    }
}

app.start();