(() => {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const sessionKey = '2doods.abertura';
  let alreadyShown = false;

  try {
    alreadyShown = sessionStorage.getItem(sessionKey) === '1';
    sessionStorage.setItem(sessionKey, '1');
  } catch {
    // A abertura continua disponível se o navegador bloquear o armazenamento.
  }

  if (alreadyShown || reducedMotion.matches || location.hash) return;

  root.classList.add('abertura-pendente');

  document.addEventListener('DOMContentLoaded', () => {
    const intro = document.querySelector('#abertura');
    const site = document.querySelector('#site');
    const content = document.querySelector('#conteudo');
    const skip = document.querySelector('.atalho-conteudo');

    if (!intro || !site || !content || !skip || reducedMotion.matches || location.hash) {
      root.classList.remove('abertura-pendente');
      return;
    }

    // A divisão do viewBox usa as mesmas coordenadas e caminhos do SVG v6.
    intro.innerHTML = `
      <div class="abertura__porta abertura__porta--esquerda" aria-hidden="true">
        <svg viewBox="0 0 210 460" width="210" height="460" aria-hidden="true" focusable="false">
          <g transform="translate(47.527559055118104 49) scale(2.8503937007874014) translate(-19 -13)">
            <path fill="#EF3159" fill-rule="evenodd" d="M30 13 H62 Q73 13 73 24 V40 H57 Q52 40 52 45 V108 Q52 113 57 113 H73 V129 Q73 140 62 140 H30 Q19 140 19 129 V24 Q19 13 30 13 Z"/>
          </g>
        </svg>
      </div>
      <div class="abertura__porta abertura__porta--direita" aria-hidden="true">
        <svg viewBox="210 0 210 460" width="210" height="460" aria-hidden="true" focusable="false">
          <g transform="translate(47.527559055118104 49) scale(2.8503937007874014) translate(-19 -13)">
            <path fill="#3573C5" fill-rule="evenodd" d="M90 13 H122 Q133 13 133 24 V129 Q133 140 122 140 H90 Q79 140 79 129 V113 H95 Q100 113 100 108 V45 Q100 40 95 40 H79 V24 Q79 13 90 13 Z"/>
          </g>
        </svg>
      </div>
      <button class="abertura__botao" type="button">
        <span class="abertura__rotulo">Entrar na 2Doods</span>
      </button>
    `;

    site.inert = true;
    const enter = intro.querySelector('.abertura__botao');
    const rightDoor = intro.querySelector('.abertura__porta--direita');
    const activeListeners = new AbortController();
    const listenerOptions = { signal: activeListeners.signal };
    let fallback;
    let opening = false;

    function finish(focus = true) {
      activeListeners.abort();
      window.clearTimeout(fallback);
      site.inert = false;
      root.classList.remove('abertura-pendente');
      intro.remove();
      if (focus) content.focus({ preventScroll: true });
    }

    function start() {
      if (opening) return;
      if (reducedMotion.matches) {
        finish();
        return;
      }

      const duration = Number.parseFloat(window.getComputedStyle(rightDoor).transitionDuration) * 1000;
      opening = true;
      intro.classList.add('abertura--abrindo');
      fallback = window.setTimeout(finish, duration + 70);
    }

    enter.addEventListener('click', start, listenerOptions);

    skip.addEventListener('click', (event) => {
      event.preventDefault();
      finish();
    }, listenerOptions);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && event.target === document.body && !event.defaultPrevented) {
        event.preventDefault();
        start();
      }
    }, listenerOptions);

    rightDoor.addEventListener('transitionend', (event) => {
      if (event.target === rightDoor && event.propertyName === 'transform') finish();
    }, listenerOptions);

    reducedMotion.addEventListener('change', (event) => {
      if (event.matches) finish();
    }, listenerOptions);

    window.addEventListener('hashchange', () => {
      if (location.hash) finish(false);
    }, listenerOptions);
  }, { once: true });
})();
