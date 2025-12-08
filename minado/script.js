let LINHAS;
let COLUNAS;
let NUM_BOMBAS;

const CONFIG_DIFICULDADE = {
	beginner: { LINHAS: 8, COLUNAS: 8, BOMBAS: 10 },
	intermediate: { LINHAS: 10, COLUNAS: 10, BOMBAS: 15 },
	expert: { LINHAS: 16, COLUNAS: 16, BOMBAS: 40 },
};

const tabuleiroElemento = document.getElementById('tabuleiro');
const botaoReiniciar = document.getElementById('botao-reiniciar');
const mensagemFinal = document.getElementById('mensagem-final');
const textoMensagem = document.getElementById('texto-mensagem');
const contadorBandeiras = document.getElementById('contador-bandeiras');
const seletorDificuldade = document.getElementById('dificuldade');
const timerElemento = document.getElementById('timer');

let tabuleiro;
let bombasRestantes;
let jogoAtivo;
let cronometroInterval;
let tempoDecorrido;

const ASSETS_PATHS = {
	0: 'empty.png',
	1: 'open1.png',
	2: 'open2.png',
	3: 'open3.png',
	4: 'open4.png',
	5: 'open5.png',
	6: 'open6.png',
	7: 'open7.png',
	8: 'open8.png',

	FLAG: 'flag.png',
	QUESTION: 'question.png',
	MINE: 'mine-ceil.png',
	MINE_DEATH: 'mine-death.png',
	MISFLAGGED: 'misflagged.png',

	SMILE: 'smile.png',
	OHH: 'ohh.png',
	DEAD: 'dead.png',
	WIN: 'win.png',

	digit0: 'digit0.png',
	digit1: 'digit1.png',
	digit2: 'digit2.png',
	digit3: 'digit3.png',
	digit4: 'digit4.png',
	digit5: 'digit5.png',
	digit6: 'digit6.png',
	digit7: 'digit7.png',
	digit8: 'digit8.png',
	digit9: 'digit9.png',
};

function getAssetHTML(assetKey) {
	const fileName = ASSETS_PATHS[assetKey];
	if (fileName) {
		return `<img src="./assets/${fileName}" alt="${assetKey}" class="asset-icon">`;
	}
	return '';
}

function renderizarContador(numero) {
	let num = Math.min(999, Math.max(0, numero));
	const numStr = String(num).padStart(3, '0');

	let html = '';

	for (let i = 0; i < 3; i++) {
		const digito = parseInt(numStr[i]);
		const fileName = ASSETS_PATHS[`digit${digito}`];
		if (fileName) {
			html += `<img src="./assets/${fileName}" alt="${digito}">`;
		}
	}
	return html;
}

function aplicarDificuldade(dificuldade) {
	const config = CONFIG_DIFICULDADE[dificuldade];
	LINHAS = config.LINHAS;
	COLUNAS = config.COLUNAS;
	NUM_BOMBAS = config.BOMBAS;

	tabuleiroElemento.style.gridTemplateColumns = `repeat(${COLUNAS}, 1fr)`;
	tabuleiroElemento.style.gridTemplateRows = `repeat(${LINHAS}, 1fr)`;
}

function inicializarTabuleiro() {
	tabuleiro = [];
	bombasRestantes = NUM_BOMBAS;
	jogoAtivo = true;
	mensagemFinal.classList.add('oculto');

	botaoReiniciar.innerHTML = getAssetHTML('SMILE');
	botaoReiniciar.classList.remove('derrota', 'vitoria');

	resetarCronometro();

	for (let i = 0; i < LINHAS; i++) {
		tabuleiro[i] = new Array(COLUNAS).fill(0);
	}

	let bombasColocadas = 0;
	while (bombasColocadas < NUM_BOMBAS) {
		const linha = Math.floor(Math.random() * LINHAS);
		const coluna = Math.floor(Math.random() * COLUNAS);

		if (tabuleiro[linha][coluna] !== -1) {
			tabuleiro[linha][coluna] = -1;
			bombasColocadas++;
		}
	}

	for (let i = 0; i < LINHAS; i++) {
		for (let j = 0; j < COLUNAS; j++) {
			if (tabuleiro[i][j] === -1) {
				continue;
			}
			tabuleiro[i][j] = contarBombasVizinhas(i, j);
		}
	}
}

function contarBombasVizinhas(r, c) {
	let contagem = 0;
	for (let i = -1; i <= 1; i++) {
		for (let j = -1; j <= 1; j++) {
			const vizinhoLinha = r + i;
			const vizinhoColuna = c + j;

			if (
				vizinhoLinha >= 0 &&
				vizinhoLinha < LINHAS &&
				vizinhoColuna >= 0 &&
				vizinhoColuna < COLUNAS
			) {
				if (tabuleiro[vizinhoLinha][vizinhoColuna] === -1) {
					contagem++;
				}
			}
		}
	}
	return contagem;
}

function criarDOMTabuleiro() {
	tabuleiroElemento.innerHTML = '';
	contadorBandeiras.innerHTML = renderizarContador(bombasRestantes);

	for (let i = 0; i < LINHAS; i++) {
		for (let j = 0; j < COLUNAS; j++) {
			const celula = document.createElement('div');
			celula.classList.add('celula');

			celula.addEventListener('mousedown', (event) => {
				if (jogoAtivo && event.button === 0)
					botaoReiniciar.innerHTML = getAssetHTML('OHH');
			});
			celula.addEventListener('mouseup', () => {
				if (jogoAtivo) botaoReiniciar.innerHTML = getAssetHTML('SMILE');
			});

			celula.addEventListener('click', () => {
				revelarCelula(i, j);
			});

			celula.addEventListener('contextmenu', (e) => {
				e.preventDefault();
				colocarBandeira(celula);
			});

			tabuleiroElemento.appendChild(celula);
		}
	}
}

function iniciarJogo() {
	aplicarDificuldade(seletorDificuldade.value);
	inicializarTabuleiro();
	criarDOMTabuleiro();
}

function iniciarCronometro() {
	if (cronometroInterval) return;
	cronometroInterval = setInterval(() => {
		tempoDecorrido++;
		if (tempoDecorrido > 999) tempoDecorrido = 999;
		timerElemento.innerHTML = renderizarContador(tempoDecorrido);
	}, 1000);
}

function pararCronometro() {
	clearInterval(cronometroInterval);
	cronometroInterval = null;
}

function resetarCronometro() {
	pararCronometro();
	tempoDecorrido = 0;
	timerElemento.innerHTML = renderizarContador(0);
}

function revelarCelula(r, c) {
	if (!jogoAtivo) return;

	if (tempoDecorrido === 0) {
		iniciarCronometro();
	}

	const celulaDOM = tabuleiroElemento.children[r * COLUNAS + c];

	if (
		celulaDOM.classList.contains('revelada') ||
		celulaDOM.classList.contains('bandeira')
	) {
		return;
	}

	if (celulaDOM.classList.contains('interrogacao')) {
		celulaDOM.classList.remove('interrogacao');
		celulaDOM.innerHTML = '';
	}

	celulaDOM.classList.add('revelada');

	const valor = tabuleiro[r][c];

	if (valor === -1) {
		celulaDOM.classList.add('bomba', 'hit');
		celulaDOM.innerHTML = getAssetHTML('MINE_DEATH');
		fimDeJogo(false);
		return;
	}

	if (valor >= 0) {
		celulaDOM.innerHTML = getAssetHTML(valor);
	}

	if (valor === 0) {
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				const vizinhoLinha = r + i;
				const vizinhoColuna = c + j;

				if (
					vizinhoLinha >= 0 &&
					vizinhoLinha < LINHAS &&
					vizinhoColuna >= 0 &&
					vizinhoColuna < COLUNAS
				) {
					revelarCelula(vizinhoLinha, vizinhoColuna);
				}
			}
		}
	}

	verificarVitoria();
}

/**
 * LÓGICA CORRIGIDA: Contagem de bombasRestantes só muda ao adicionar/remover FLAG.
 */
function colocarBandeira(celulaDOM) {
	if (!jogoAtivo || celulaDOM.classList.contains('revelada')) return;

	if (tempoDecorrido === 0) {
		iniciarCronometro();
	}

	const temBandeira = celulaDOM.classList.contains('bandeira');
	const temInterrogacao = celulaDOM.classList.contains('interrogacao');

	if (temBandeira) {
		// 1. De Bandeira para Interrogação
		celulaDOM.classList.remove('bandeira');
		celulaDOM.classList.add('interrogacao');
		celulaDOM.innerHTML = getAssetHTML('QUESTION');
		// A bandeira foi removida: Aumenta a contagem de bombas restantes.
		bombasRestantes++;
	} else if (temInterrogacao) {
		// 2. De Interrogação para Fechada
		celulaDOM.classList.remove('interrogacao');
		celulaDOM.innerHTML = '';
		// Contador NÃO é alterado aqui, pois a célula estava apenas marcada como incerta.
	} else if (bombasRestantes > 0) {
		// 3. De Fechada para Bandeira (se houver bandeiras disponíveis)
		celulaDOM.classList.add('bandeira');
		celulaDOM.innerHTML = getAssetHTML('FLAG');
		// A bandeira foi adicionada: Diminui a contagem de bombas restantes.
		bombasRestantes--;
	}

	contadorBandeiras.innerHTML = renderizarContador(bombasRestantes);
	verificarVitoria();
}

function verificarVitoria() {
	let celulasReveladas = 0;
	const totalCelulas = LINHAS * COLUNAS;

	for (let i = 0; i < tabuleiroElemento.children.length; i++) {
		if (tabuleiroElemento.children[i].classList.contains('revelada')) {
			celulasReveladas++;
		}
	}

	if (celulasReveladas === totalCelulas - NUM_BOMBAS) {
		fimDeJogo(true);
	}
}

function fimDeJogo(vitoria) {
	jogoAtivo = false;
	pararCronometro();

	if (!vitoria) {
		botaoReiniciar.innerHTML = getAssetHTML('DEAD');
		for (let i = 0; i < LINHAS; i++) {
			for (let j = 0; j < COLUNAS; j++) {
				const celulaDOM = tabuleiroElemento.children[i * COLUNAS + j];

				if (tabuleiro[i][j] === -1) {
					if (
						!celulaDOM.classList.contains('hit') &&
						!celulaDOM.classList.contains('bandeira')
					) {
						celulaDOM.classList.add('revelada', 'bomba');
						celulaDOM.innerHTML = getAssetHTML('MINE');
					}
					if (celulaDOM.classList.contains('bandeira')) {
						celulaDOM.classList.add('revelada');
					}
				} else if (celulaDOM.classList.contains('bandeira')) {
					celulaDOM.classList.add('revelada');
					celulaDOM.innerHTML = getAssetHTML('MISFLAGGED');
				} else if (celulaDOM.classList.contains('interrogacao')) {
					celulaDOM.classList.remove('interrogacao');
					celulaDOM.innerHTML = '';
				}
				celulaDOM.classList.add('revelada');
			}
		}
	} else {
		botaoReiniciar.innerHTML = getAssetHTML('WIN');
		for (let i = 0; i < LINHAS; i++) {
			for (let j = 0; j < COLUNAS; j++) {
				const celulaDOM = tabuleiroElemento.children[i * COLUNAS + j];
				celulaDOM.classList.remove('interrogacao');

				if (
					tabuleiro[i][j] === -1 &&
					!celulaDOM.classList.contains('bandeira')
				) {
					celulaDOM.classList.add('bandeira');
					celulaDOM.innerHTML = getAssetHTML('FLAG');
				}
				celulaDOM.classList.add('revelada');
			}
		}
		bombasRestantes = 0;
		contadorBandeiras.innerHTML = renderizarContador(0);
	}

	mensagemFinal.classList.remove('oculto');
	mensagemFinal.classList.remove('vitoria', 'derrota');

	if (vitoria) {
		textoMensagem.textContent = `🎉 Parabéns! Você venceu em ${tempoDecorrido}s! 🎉`;
		mensagemFinal.classList.add('vitoria');
	} else {
		textoMensagem.textContent = '💥 Game Over! 💥';
		mensagemFinal.classList.add('derrota');
	}
}

botaoReiniciar.addEventListener('click', iniciarJogo);
seletorDificuldade.addEventListener('change', iniciarJogo);

document.addEventListener('DOMContentLoaded', () => {
	aplicarDificuldade(seletorDificuldade.value);
	iniciarJogo();
});
