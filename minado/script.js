// --- Variáveis de Configuração ---
let LINHAS;
let COLUNAS;
let NUM_BOMBAS;

const CONFIG_DIFICULDADE = {
	beginner: { LINHAS: 8, COLUNAS: 8, BOMBAS: 10 },
	intermediate: { LINHAS: 10, COLUNAS: 10, BOMBAS: 15 },
	expert: { LINHAS: 16, COLUNAS: 16, BOMBAS: 40 },
};

// --- Elementos do DOM ---
const tabuleiroElemento = document.getElementById('tabuleiro');
const botaoReiniciar = document.getElementById('botao-reiniciar');
const mensagemFinal = document.getElementById('mensagem-final');
const textoMensagem = document.getElementById('texto-mensagem');
const contadorBandeiras = document.getElementById('contador-bandeiras');
const seletorDificuldade = document.getElementById('dificuldade');
const timerElemento = document.getElementById('timer');

// --- Variáveis do Jogo ---
let tabuleiro; // Matriz 2D para a lógica do jogo
let bombasRestantes;
let jogoAtivo;
let cronometroInterval;
let tempoDecorrido;

/**
 * Aplica a dificuldade selecionada.
 * @param {string} dificuldade - Chave de dificuldade ('beginner', 'intermediate', 'expert').
 */
function aplicarDificuldade(dificuldade) {
	const config = CONFIG_DIFICULDADE[dificuldade];
	LINHAS = config.LINHAS;
	COLUNAS = config.COLUNAS;
	NUM_BOMBAS = config.BOMBAS;

	// Redefine o layout do grid no DOM
	tabuleiroElemento.style.gridTemplateColumns = `repeat(${COLUNAS}, 1fr)`;
	tabuleiroElemento.style.gridTemplateRows = `repeat(${LINHAS}, 1fr)`;
}

// --- Funções de Inicialização e Lógica ---

/**
 * Inicializa a matriz do tabuleiro com valores iniciais e
 * distribui as bombas.
 */
function inicializarTabuleiro() {
	tabuleiro = [];
	bombasRestantes = NUM_BOMBAS;
	jogoAtivo = true;
	mensagemFinal.classList.add('oculto');
	botaoReiniciar.textContent = '😊'; // Carinha feliz

	resetarCronometro();

	// 1. Cria a matriz inicial preenchida com 0 (zero)
	for (let i = 0; i < LINHAS; i++) {
		tabuleiro[i] = new Array(COLUNAS).fill(0);
	}

	// 2. Distribui as bombas (-1)
	let bombasColocadas = 0;
	while (bombasColocadas < NUM_BOMBAS) {
		const linha = Math.floor(Math.random() * LINHAS);
		const coluna = Math.floor(Math.random() * COLUNAS);

		// Se a célula ainda não tem bomba, coloque uma.
		if (tabuleiro[linha][coluna] !== -1) {
			tabuleiro[linha][coluna] = -1; // -1 representa uma bomba
			bombasColocadas++;
		}
	}

	// 3. Calcula os números vizinhos
	for (let i = 0; i < LINHAS; i++) {
		for (let j = 0; j < COLUNAS; j++) {
			if (tabuleiro[i][j] === -1) {
				continue; // Pula a bomba
			}
			tabuleiro[i][j] = contarBombasVizinhas(i, j);
		}
	}
}

/**
 * Conta quantas bombas existem nas 8 células vizinhas.
 */
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

/**
 * Cria a representação visual do tabuleiro no DOM.
 */
function criarDOMTabuleiro() {
	tabuleiroElemento.innerHTML = '';
	contadorBandeiras.textContent = String(bombasRestantes).padStart(3, '0');

	for (let i = 0; i < LINHAS; i++) {
		for (let j = 0; j < COLUNAS; j++) {
			const celula = document.createElement('div');
			celula.classList.add('celula');
			celula.dataset.linha = i;
			celula.dataset.coluna = j;

			// Tratamento de clique esquerdo (revelar)
			celula.addEventListener('click', () => {
				revelarCelula(i, j);
			});

			// Tratamento de clique direito (bandeira/interrogação)
			celula.addEventListener('contextmenu', (e) => {
				e.preventDefault();
				colocarBandeira(celula);
			});

			tabuleiroElemento.appendChild(celula);
		}
	}
}

/**
 * Reinicia o jogo.
 */
function iniciarJogo() {
	aplicarDificuldade(seletorDificuldade.value);
	inicializarTabuleiro();
	criarDOMTabuleiro();
}

// --- Funções do Cronômetro ---

function iniciarCronometro() {
	if (cronometroInterval) return;
	cronometroInterval = setInterval(() => {
		tempoDecorrido++;
		if (tempoDecorrido > 999) tempoDecorrido = 999;
		timerElemento.textContent = String(tempoDecorrido).padStart(3, '0');
	}, 1000);
}

function pararCronometro() {
	clearInterval(cronometroInterval);
	cronometroInterval = null;
}

function resetarCronometro() {
	pararCronometro();
	tempoDecorrido = 0;
	timerElemento.textContent = '000';
}

/**
 * Trata o clique esquerdo (revelar célula).
 */
function revelarCelula(r, c) {
	if (!jogoAtivo) return;

	// Inicia o cronômetro no primeiro clique
	if (tempoDecorrido === 0) {
		iniciarCronometro();
	}

	const celulaDOM = tabuleiroElemento.children[r * COLUNAS + c];

	// Se já estiver revelada ou tiver bandeira, não faz nada (interrogação pode ser revelada)
	if (
		celulaDOM.classList.contains('revelada') ||
		celulaDOM.classList.contains('bandeira')
	) {
		return;
	}

	// Se tiver interrogação, remove a interrogação antes de revelar
	if (celulaDOM.classList.contains('interrogacao')) {
		celulaDOM.classList.remove('interrogacao');
		celulaDOM.textContent = '';
	}

	celulaDOM.classList.add('revelada');

	const valor = tabuleiro[r][c];

	if (valor === -1) {
		// --- Bomba! Fim de jogo ---
		celulaDOM.classList.add('bomba', 'hit'); // 'hit' para a bomba clicada
		celulaDOM.innerHTML = '●'; // Ícone da bomba XP
		fimDeJogo(false); // Derrota
		return;
	}

	if (valor > 0) {
		// --- Número vizinho ---
		celulaDOM.textContent = valor;
		celulaDOM.classList.add(`n${valor}`); // Adiciona classe para cor do número
	}

	if (valor === 0) {
		// --- Vazio! Revelação em cascata (Flood Fill) ---
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
					revelarCelula(vizinhoLinha, vizinhoColuna); // Chamada recursiva
				}
			}
		}
	}

	verificarVitoria();
}

/**
 * Trata o clique direito (colocar/remover bandeira/interrogação).
 * Implementa o ciclo: Fechada -> Bandeira -> Interrogação -> Fechada.
 * @param {HTMLElement} celulaDOM - O elemento DOM da célula.
 */
function colocarBandeira(celulaDOM) {
	if (!jogoAtivo || celulaDOM.classList.contains('revelada')) return;

	// Inicia o cronômetro no primeiro clique (se ainda não começou)
	if (tempoDecorrido === 0) {
		iniciarCronometro();
	}

	const temBandeira = celulaDOM.classList.contains('bandeira');
	const temInterrogacao = celulaDOM.classList.contains('interrogacao');

	if (temBandeira) {
		// 1. De Bandeira para Interrogação
		celulaDOM.classList.remove('bandeira');
		celulaDOM.classList.add('interrogacao');
		celulaDOM.textContent = '?';
		// O contador de bombas (bombasRestantes) NÃO muda aqui.
	} else if (temInterrogacao) {
		// 2. De Interrogação para Fechada
		celulaDOM.classList.remove('interrogacao');
		celulaDOM.textContent = '';
		// Como a bandeira foi usada no passo anterior (Fechada -> Bandeira), devolvemos
		// a contagem de bandeiras aqui, quando a célula volta a ser vazia.
		bombasRestantes++;
	} else if (bombasRestantes > 0) {
		// 3. De Fechada para Bandeira (se houver bandeiras disponíveis)
		celulaDOM.classList.add('bandeira');
		celulaDOM.textContent = '▲'; // Ícone da bandeira XP
		bombasRestantes--;
	}

	contadorBandeiras.textContent = String(bombasRestantes).padStart(3, '0');
	verificarVitoria();
}

/**
 * Verifica se todas as células não-bomba foram reveladas.
 */
function verificarVitoria() {
	let celulasReveladas = 0;
	const totalCelulas = LINHAS * COLUNAS;

	for (let i = 0; i < tabuleiroElemento.children.length; i++) {
		if (tabuleiroElemento.children[i].classList.contains('revelada')) {
			celulasReveladas++;
		}
	}

	// Condição de vitória: Total de células - Número de bombas = Células reveladas
	if (celulasReveladas === totalCelulas - NUM_BOMBAS) {
		fimDeJogo(true);
	}
}

/**
 * Finaliza o jogo.
 */
function fimDeJogo(vitoria) {
	jogoAtivo = false;
	pararCronometro();

	// Revela todas as bombas e atualiza a carinha
	if (!vitoria) {
		// Derrota
		botaoReiniciar.textContent = '😞'; // Carinha triste
		for (let i = 0; i < LINHAS; i++) {
			for (let j = 0; j < COLUNAS; j++) {
				const celulaDOM = tabuleiroElemento.children[i * COLUNAS + j];

				if (tabuleiro[i][j] === -1) {
					// Mostra a bomba se não tiver bandeira
					if (!celulaDOM.classList.contains('bandeira')) {
						celulaDOM.classList.add('revelada', 'bomba');
						celulaDOM.textContent = '●';
					}
					// Remove interrogação para revelar a bomba
					if (celulaDOM.classList.contains('interrogacao')) {
						celulaDOM.classList.remove('interrogacao');
						celulaDOM.textContent = '●';
					}
				} else if (celulaDOM.classList.contains('bandeira')) {
					// Mostra bandeira errada (X)
					celulaDOM.classList.add('revelada');
					celulaDOM.textContent = '❌';
				}
				// Garante que todas as células sejam reveláveis (para remover o cursor de clique)
				celulaDOM.classList.add('revelada');
			}
		}
	} else {
		// Vitória
		botaoReiniciar.textContent = '😎'; // Carinha de óculos
		// Bandeira todas as bombas restantes
		for (let i = 0; i < LINHAS; i++) {
			for (let j = 0; j < COLUNAS; j++) {
				const celulaDOM = tabuleiroElemento.children[i * COLUNAS + j];
				// Remove qualquer interrogação
				celulaDOM.classList.remove('interrogacao');
				// Coloca bandeira nas bombas não marcadas
				if (
					tabuleiro[i][j] === -1 &&
					!celulaDOM.classList.contains('bandeira')
				) {
					celulaDOM.classList.add('bandeira');
					celulaDOM.textContent = '▲';
				}
				celulaDOM.classList.add('revelada');
			}
		}
		bombasRestantes = 0;
		contadorBandeiras.textContent = '000';
	}

	// Exibe a mensagem final
	mensagemFinal.classList.remove('oculto');
	mensagemFinal.classList.remove('vitoria', 'derrota');

	if (vitoria) {
		textoMensagem.textContent = `🎉 Você venceu em ${tempoDecorrido}s! 🎉`;
		mensagemFinal.classList.add('vitoria');
	} else {
		textoMensagem.textContent = '💥 Game Over! 💥';
		mensagemFinal.classList.add('derrota');
	}
}

// --- Event Listeners ---
botaoReiniciar.addEventListener('click', iniciarJogo);
seletorDificuldade.addEventListener('change', iniciarJogo);

// --- Início do Jogo ao carregar a página ---
document.addEventListener('DOMContentLoaded', () => {
	// Garante que a dificuldade inicial seja aplicada antes de iniciar
	aplicarDificuldade(seletorDificuldade.value);
	iniciarJogo();
});
