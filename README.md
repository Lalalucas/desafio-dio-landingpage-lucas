# 🎮 Detona Ralph - Jogo com JavaScript

Projeto criado do zero por **Lucas Gabriel de Morais** como desafio DIO.

## Tecnologias
- HTML5 moderno, semântico e acessível
- CSS3 avançado com dark mode, animações e responsividade
- JavaScript ES6+ orientado a objetos e modular

## Descrição
Um jogo estilo runner onde o personagem Ralph destrói blocos e evita obstáculos, com controles via teclado, animações suaves e placar dinâmico.

## Como jogar
- Clique em "Iniciar" para começar
- Use a tecla [Espaço] para pular
- Evite os blocos que se movem da direita para a esquerda
- Se colidir, o jogo reinicia e mostra a pontuação

## Estrutura do projeto
- `index.html`: estrutura principal e layout
- `css/styles.css`: estilos modernos e animações
- `js/game.js`: lógica e interação do jogo
- `assets/img/`: pasta para imagens (sprites etc.)
- `assets/sounds/`: pasta para sons (pulos, efeitos)

## Autor
- Lucas Gabriel de Morais  
- GitHub: [Lalalucas](https://github.com/Lalalucas)  
- Email: lucasescobarmorais@gmail.com  

---
> Projeto criado com foco em performance, acessibilidade e design
#!/data/data/com.termux/files/usr/bin/bash

# VARIÁVEIS
GITHUB_USERNAME="Lalalucas"
REPO_NAME="desafio-dio-landingpage-lucas"
TOKEN="SEU_PERSONAL_ACCESS_TOKEN_AQUI"
PROJECT_PATH="/data/data/com.termux/files/home/desafio-dio-landingpage-lucas"

# Instala dependências
pkg install curl git -y

# ATIVANDO SSH
echo "🔐 Iniciando agente SSH..."
eval "SSH_AUTH_SOCK=/data/data/com.termux/files/usr/tmp/ssh-37c0i1auQMbD/agent.5718; export SSH_AUTH_SOCK;
SSH_AGENT_PID=5720; export SSH_AGENT_PID;
echo Agent pid 5720;" >/dev/null
ssh-add ~/.ssh/id_rsa >/dev/null && echo "✅ Chave SSH carregada com sucesso!"

# TESTANDO AUTENTICAÇÃO
echo "🔎 Testando autenticação SSH com GitHub..."
ssh -T git@github.com 2>&1 | grep -q "successfully authenticated" || {
  echo "❌ Falha na autenticação SSH. Verifique sua chave." ; exit 1;
}
echo "✅ SSH autenticado com sucesso!"

# CRIANDO REPOSITÓRIO VIA GITHUB API
echo "🛠️ Criando repositório no GitHub..."
curl -s -o /dev/null -w "%{http_code}" -X POST   -H "Authorization: token SEU_PERSONAL_ACCESS_TOKEN_AQUI"   -d "{\"name\":\"desafio-dio-landingpage-lucas\",\"private\":false}"   https://api.github.com/user/repos | grep -q "201" && echo "✅ Repositório criado!" || echo "⚠️ Repositório já existe ou houve erro."

# CRIANDO ESTRUTURA DO PROJETO
echo "📁 Gerando estrutura do projeto em /data/data/com.termux/files/home/desafio-dio-landingpage-lucas..."
mkdir -p "/data/data/com.termux/files/home/desafio-dio-landingpage-lucas/css" "/data/data/com.termux/files/home/desafio-dio-landingpage-lucas/js" "/data/data/com.termux/files/home/desafio-dio-landingpage-lucas/assets/img" "/data/data/com.termux/files/home/desafio-dio-landingpage-lucas/sobre"
cd "/data/data/com.termux/files/home/desafio-dio-landingpage-lucas" || exit

# Adicionando Gifs de exemplo (substitua por seus próprios gifs depois!)
echo "🔗 Baixando gifs animados de exemplo para a galeria..."
curl -L -o assets/img/anime1.gif https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.gif
curl -L -o assets/img/anime2.gif https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif
curl -L -o assets/img/anime3.gif https://media.giphy.com/media/10dU7AN7xsi1I4/giphy.gif

# CRIANDO index.html
cat > index.html <<HTML
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Landing Page DIO</title>
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body>
  <header class="animate" data-animation="fade-in">
    <h1>Desafio DIO - Landing Page Anime</h1>
  </header>
  <main>
    <section>
      <div class="gallery">
        <img src="assets/img/anime1.gif" alt="Anime 1" class="animate" data-animation="zoom-in" data-delay="0.1s">
        <img src="assets/img/anime2.gif" alt="Anime 2" class="animate" data-animation" class="animate" data-animation="zoom-in" data-delay="0.5s">
      </div>
    </section>
  </main>
  <footer>
    <p>Desenvolvido por <a href="https://github.com/Lalalucas" target="_blank">Lalalucas</a></p>
  </footer>
  <script src="js/main.js"></script>
</body>
</html>
HTML

# CRIANDO CSS ANIMADO
cat > css/styles.css <<CSS
body {
  background-color: #121212;
  color: #fff;
  font-family: 'Segoe UI', Arial, sans-serif;
  text-align: center;
  padding: 20px;
}
header {
  background: #1f1f1f;
  padding: 2em;
}
.gallery {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 24px;
}
.gallery img {
  width: 160px;
  border-radius: 10px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.3);
  opacity: 0;
  transform: scale(0.85);
}
/* Animações */
.animate[data-animation="fade-in"] {
  animation: fadeIn 1.2s forwards;
}
.animate[data-animation="zoom-in"] {
  animation: zoomIn 1.2s forwards;
}
@keyframes fadeIn {
  to { opacity: 1; }
}
@keyframes zoomIn {
  to { opacity: 1; transform: scale(1);}
}
.animate {
  opacity: 0;
}
.animate.visible {
  opacity: 1;
}
CSS

# CRIANDO JS ANIMADOR
cat > js/main.js <<JS
document.addEventListener("DOMContentLoaded", function() {
  const animated = document.querySelectorAll('.animate');
  animated.forEach(el => {
    let delay = el.getAttribute('data-delay');
    setTimeout(() => { el.classList.add('visible'); }, delay ? parseFloat(delay)*1000 : 0);
  });
});
JS

# CRIANDO README.md ROBUSTO
cat > README.md <<README
# 🚀 Desafio DIO: Landing Page Animada

Landing page criada automaticamente por **Lucas Gabriel de Morais** como parte do bootcamp DIO.

## 📸 Imagens Animadas
A pasta `assets/img` contém gifs animados representando animes, integrados ao projeto e exibidos na galeria principal, cada um com animações CSS customizadas.

## 📂 Sobre o Projeto

Acesse a pasta `/sobre` para saber mais!

## 🎯 Objetivo
- Colocar em prática os fundamentos da web criando uma landing page moderna, responsiva e escalável.
- Demonstrar o uso de animações CSS e manipulação de atributos personalizados.

## 🛠️ Passos e Ferramentas Utilizadas
1. **HTML5:** Estrutura da página.
2. **CSS3:** Tema escuro, layout flexível e animações.
3. **JavaScript:** Ativação dinâmica das animações via atributos.
4. **Git/GitHub:** Versionamento e hospedagem do projeto.
5. **Bash:** Script para automação da estrutura e publicação.
6. **Termux:** Ambiente Linux Android.

## 📁 Estrutura
- `index.html`: Página principal
- `css/styles.css`: Estilização visual escura e animada
- `js/main.js`: Script de animação
- `assets/img`: Imagens animadas de animes
- `sobre/`: Documentação sobre o projeto

## 🔗 Autor
- GitHub: [github.com/Lalalucas](https://github.com/Lalalucas)
- Email: lucasescobarmorais@gmail.com
- WhatsApp/Signal: +55 62 98245-6245

---
> Feito com foco, técnica e automação 🛠️
