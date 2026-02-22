// Control de música de fondo (usa el MP3 local de /static/music.mp3)
const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let musicPlaying = false;
let autoUnlockBound = false;

music.volume = 0.75;
music.muted = true;
music.preload = 'auto';
music.load();

async function startMusic() {
    await music.play();
    musicPlaying = true;
    musicToggle.textContent = '♪ Música: ON';
}

function bindAutoplayUnlock() {
    if (autoUnlockBound) {
        return;
    }

    autoUnlockBound = true;

    const unlockEvents = ['pointerdown', 'touchstart', 'keydown', 'wheel'];

    const unlockAndPlay = async () => {
        try {
            music.muted = false;
            if (!musicPlaying) {
                await startMusic();
            } else {
                await music.play();
            }
            musicToggle.textContent = '♪ Música: ON';
        } catch (error) {
            musicToggle.textContent = '♪ Música: OFF';
        } finally {
            unlockEvents.forEach((eventName) => {
                window.removeEventListener(eventName, unlockAndPlay, { capture: true });
            });
        }
    };

    unlockEvents.forEach((eventName) => {
        window.addEventListener(eventName, unlockAndPlay, { once: true, capture: true, passive: true });
    });
}

async function tryAutoplayWithSound() {
    // 1) La mayoría de navegadores permiten autoplay en mute
    music.muted = true;
    await startMusic();

    // 2) Intento de pasar a sonido real automáticamente
    setTimeout(async () => {
        try {
            music.muted = false;
            await music.play();
            musicToggle.textContent = '♪ Música: ON';
        } catch (error) {
            // Si se bloquea, quedará listo para el primer gesto global
            musicToggle.textContent = '♪ Música: OFF';
        }
    }, 140);
}

// Intento de reproducción automática al cargar la página
window.addEventListener('load', async () => {
    bindAutoplayUnlock();

    try {
        await tryAutoplayWithSound();
    } catch (error) {
        musicToggle.textContent = '♪ Música: OFF';
    }
});

music.addEventListener('error', () => {
    musicToggle.textContent = '♪ El archivo music.mp3 no es válido';
});

musicToggle.addEventListener('click', async () => {
    try {
        if (musicPlaying) {
            music.pause();
            musicToggle.textContent = '♪ Música: OFF';
            musicPlaying = false;
            return;
        }

        music.load();
        music.muted = false;
        await startMusic();
    } catch (error) {
        musicToggle.textContent = '♪ No se pudo reproducir el MP3';
    }
});

// Efecto de aparición suave para tarjetas de capítulos
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

revealElements.forEach((element) => revealObserver.observe(element));

// Efecto letra por letra para cada párrafo de la historia
const typedElements = document.querySelectorAll('.typewriter');

function typeWriter(element, text, speed = 27) {
    let index = 0;
    const timer = setInterval(() => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index += 1;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

const typeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.typed) {
            const text = entry.target.dataset.text || '';
            entry.target.dataset.typed = 'true';
            typeWriter(entry.target, text);
        }
    });
}, { threshold: 0.4 });

typedElements.forEach((paragraph) => typeObserver.observe(paragraph));

// Capítulo 3: activa la animación del avión en el mapa mundial
const chapter3Scene = document.querySelector('.scene-3');

if (chapter3Scene) {
    const flightObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                chapter3Scene.classList.add('flight-active');
                flightObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.45 });

    flightObserver.observe(chapter3Scene);
}

// Escena final: botones Sí/No + mensaje animado
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const loveMessage = document.getElementById('loveMessage');
const starsContainer = document.getElementById('starsContainer');

function spawnStars(quantity = 80) {
    starsContainer.innerHTML = '';

    for (let index = 0; index < quantity; index += 1) {
        const star = document.createElement('span');
        star.classList.add('star');
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 2.4}s`;
        star.style.opacity = `${0.4 + Math.random() * 0.6}`;
        starsContainer.appendChild(star);
    }
}

if (yesButton) {
    yesButton.addEventListener('click', () => {
        spawnStars(120);
        loveMessage.textContent = 'Recuerda que el anillo que te di solo es de promesa, que algún día será de compromiso y algún otro día será de matrimonio, porque eso es lo que quiero contigo, te amo mi vida 💍❤️';
        loveMessage.classList.add('long-text');
        loveMessage.classList.add('show');
    });
}

if (noButton) {
    noButton.addEventListener('click', () => {
        spawnStars(70);
        loveMessage.textContent = 'Ni modo mi amor, ya te hice brujería y serás mía para toda la vida ✨';
        loveMessage.classList.remove('long-text');
        loveMessage.classList.add('show');
    });
}
