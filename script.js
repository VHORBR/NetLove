document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.querySelector('.play-button');
    const favoriteButton = document.querySelector('.favorite-button');

    playButton.addEventListener('click', () => {
        alert('Prepare o coração: nossa história vai começar 💘');
    });

    favoriteButton.addEventListener('click', () => {
        if (favoriteButton.textContent.includes('Nosso Favorito')) {
            favoriteButton.innerHTML = '<i class="fas fa-heart"></i> Adicionado aos Favoritos!';
            favoriteButton.style.backgroundColor = '#e50914';
        } else {
            favoriteButton.innerHTML = '<i class="fas fa-check"></i> Nosso Favorito';
            favoriteButton.style.backgroundColor = 'rgba(109, 109, 110, 0.7)';
        }
    });

    // Corações flutuantes
    setInterval(() => {
        const coracao = document.createElement("div");
        coracao.classList.add("coracao");

        const tamanho = Math.random() * 10 + 15;
        coracao.style.width = tamanho + "px";
        coracao.style.height = tamanho + "px";
        coracao.style.left = Math.random() * 100 + "vw";

        const cores = ["#ffb6c1", "#ffc0cb", "#ff69b4", "#ff1493", "#db7093"];
        coracao.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];

        const duracao = Math.random() * 5 + 6;
        coracao.style.animationDuration = duracao + "s";

        document.body.appendChild(coracao);

        setTimeout(() => {
            coracao.remove();
        }, duracao * 1000);
    }, 400);

    // Transição suave ao clicar em "Momentos"
    const overlay = document.getElementById("overlay");
    const linkMomentos = document.querySelector('a[href="#nossos-momentos"]');

    linkMomentos.addEventListener("click", function (e) {
        e.preventDefault();
        overlay.classList.add("active");

        setTimeout(() => {
            document.querySelector("#nossos-momentos").scrollIntoView({ behavior: "smooth" });
        }, 400);

        setTimeout(() => {
            overlay.classList.remove("active");
        }, 1000);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    function atualizarContagem() {
        const dataInicio = new Date(2025, 3, 12, 0, 0, 0); // 12 de abril de 2025, meia-noite
        const agora = new Date();
        const diferencaTempo = agora - dataInicio; // Diferença em milissegundos

        const segundos = Math.floor((diferencaTempo / 1000) % 60);
        const minutos = Math.floor((diferencaTempo / (1000 * 60)) % 60);
        const horas = Math.floor((diferencaTempo / (1000 * 60 * 60)) % 24);
        const dias = Math.floor(diferencaTempo / (1000 * 60 * 60 * 24));

        document.getElementById("contadorTempo").textContent =
            `${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos juntos 💖`;
    }

    atualizarContagem();
    setInterval(atualizarContagem, 1000); // Atualiza a cada segundo
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');

document.querySelectorAll('.moment-item img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.style.display = 'flex';
    lightboxImg.style.animation = "fadeInZoom 0.3s ease forwards";
  });
});

lightbox.addEventListener('click', () => {
  lightboxImg.style.animation = "fadeOutZoom 0.3s ease forwards";
  
  setTimeout(() => {
    lightbox.style.display = 'none';
  }, 300); // Espera a animação terminar antes de esconder
});
