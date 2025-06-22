function escreverDigitando(elemento, texto, velocidade = 75) {
    let i = 0;
    elemento.textContent = '';
    elemento.style.opacity = '1';

    const intervalo = setInterval(() => {
        if (i < texto.length) {
            elemento.textContent += texto.charAt(i);
            i++;
        } else {
            clearInterval(intervalo);
            elemento.style.borderRight = 'none';

            // ⏳ Desaparecer após 5 segundos
            setTimeout(() => {
                elemento.style.opacity = '0';
            }, 5000);
        }
    }, velocidade);
}


document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.querySelector('.play-button');
    const favoriteButton = document.querySelector('.favorite-button');
    const overlay = document.getElementById("overlay");
    const linkMomentos = document.querySelector('a[href="#nossos-momentos"]');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const perfilModal = document.getElementById('perfilModal');
    const imagemPerfil = document.getElementById('imagemPerfilSelecionado');
    const profilePic = document.querySelector('.profile-pic');
    const saudacaoEl = document.getElementById('saudacaoPerfil');
    const params = new URLSearchParams(window.location.search);
    const perfil = params.get('perfil');
    const nomePerfil = perfil ? perfil.charAt(0).toUpperCase() + perfil.slice(1) : null;

    // Saudação com efeito de digitação
    if (nomePerfil && saudacaoEl) {
        const mensagem = `Olá ${nomePerfil} 💖`;
        escreverDigitando(saudacaoEl, mensagem);
    }

    // Botões "Assistir" e "Nosso Favorito"
    if (playButton) {
        playButton.addEventListener('click', () => {
            alert('Prepare o coração: nossa história vai começar 💘');
        });
    }

    if (favoriteButton) {
        let favoritoAtivado = false;

        favoriteButton.addEventListener('click', () => {
            if (!favoritoAtivado) {
                // Primeira vez ativa o favorito
                favoriteButton.innerHTML = '<i class="fas fa-heart"></i> Adicionado aos Favoritos!';
                favoriteButton.style.backgroundColor = '#e50914';
                favoritoAtivado = true;
            }

            // Pulsa o botão sempre
            favoriteButton.classList.add('pulsando');
            setTimeout(() => {
                favoriteButton.classList.remove('pulsando');
            }, 600);

            // Chuva de corações 💖
            const rect = favoriteButton.getBoundingClientRect();

            for (let i = 0; i < 15; i++) {
                const heart = document.createElement('div');
                heart.className = 'heart-burst';
                heart.textContent = '💖';

                // Posição aleatória da tela
                const startX = Math.random() * window.innerWidth;
                const startY = Math.random() * window.innerHeight;

                heart.style.left = `${startX}px`;
                heart.style.top = `${startY}px`;
                heart.style.position = 'fixed';
                heart.style.zIndex = '9999';

                // Movimento aleatório para cima com leveza
                const offsetX = (Math.random() - 0.5) * 200;
                const offsetY = -Math.random() * 100 - 100;

                heart.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
                heart.style.transition = 'transform 1.2s ease, opacity 1.2s ease';
                heart.style.opacity = '1';

                document.body.appendChild(heart);

                requestAnimationFrame(() => {
                    heart.style.opacity = '0';
                });

                setTimeout(() => {
                    heart.remove();
                }, 1200);
            }

        });
    }



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

    // Contador de tempo juntos
    function atualizarContagem() {
        const dataInicio = new Date(2025, 3, 12, 0, 0, 0);
        const agora = new Date();
        const diferencaTempo = agora - dataInicio;

        const segundos = Math.floor((diferencaTempo / 1000) % 60);
        const minutos = Math.floor((diferencaTempo / (1000 * 60)) % 60);
        const horas = Math.floor((diferencaTempo / (1000 * 60 * 60)) % 24);
        const dias = Math.floor(diferencaTempo / (1000 * 60 * 60 * 24));

        const contador = document.getElementById("contadorTempo");
        if (contador) {
            contador.textContent = `${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos juntos 💖`;
        }
    }

    atualizarContagem();
    setInterval(atualizarContagem, 1000);

    // Link Momentos com transição
    if (linkMomentos) {
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
    }

    // Lightbox de imagens
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
        }, 300);
    });

    // Modal de perfil
    if (profilePic) {
        profilePic.addEventListener('click', () => {
            perfilModal.style.display = 'flex';
        });
    }

    if (perfilModal) {
        perfilModal.addEventListener('click', (e) => {
            if (e.target.id === 'perfilModal') {
                perfilModal.style.display = 'none';
            }
        });
    }

    // Imagem do perfil
    if (perfil && imagemPerfil) {
        imagemPerfil.src = `perfil-${perfil}.png`;
        imagemPerfil.alt = `Perfil de ${nomePerfil}`;
    }
    if (perfil && profilePic) {
        profilePic.src = `perfil-${perfil}.png`;
        profilePic.alt = `Perfil de ${nomePerfil}`;
    }

});
