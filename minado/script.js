// --- Variáveis de Configuração ---
const LINHAS = 10;
const COLUNAS = 10;
const NUM_BOMBAS = 15;

// --- Elementos do DOM ---
const tabuleiroElemento = document.getElementById('tabuleiro');
const botaoReiniciar = document.getElementById('botao-reiniciar');
const mensagemFinal = document.getElementById('mensagem-final');
const textoMensagem = document.getElementById('texto-mensagem');
const contadorBandeiras = document.getElementById('contador-bandeiras');

// --- Variáveis do Jogo ---
let tabuleiro; // Matriz 2D para a lógica do jogo
let bombasRestantes;
let jogoAtivo;

// Define o layout do grid no CSS (inline, pois depende das constantes)
tabuleiroElemento.style.gridTemplateColumns = `repeat(${COLUNAS}, 1fr)`;
tabuleiroElemento.style.gridTemplateRows = `repeat(${LINHAS}, 1fr)`;

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
 * @param {number} r - Linha da célula.
 * @param {number} c - Coluna da célula.
 * @returns {number} - O número de bombas vizinhas.
 */
function contarBombasVizinhas(r, c) {
	let contagem = 0;

	// Itera sobre os vizinhos 3x3
	for (let i = -1; i <= 1; i++) {
		for (let j = -1; j <= 1; j++) {
			const vizinhoLinha = r + i;
			const vizinhoColuna = c + j;

			// Verifica se está dentro dos limites do tabuleiro
			if (
				vizinhoLinha >= 0 &&
				vizinhoLinha < LINHAS &&
				vizinhoColuna >= 0 &&
				vizinhoColuna < COLUNAS
			) {
				// Se o vizinho for uma bomba (-1)
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
	tabuleiroElemento.style.gridTemplateColumns = `repeat(${COLUNAS}, 1fr)`;
	tabuleiroElemento.style.gridTemplateRows = `repeat(${LINHAS}, 1fr)`;
	tabuleiroElemento.innerHTML = '';
	contadorBandeiras.textContent = bombasRestantes;

	for (let i = 0; i < LINHAS; i++) {
		for (let j = 0; j < COLUNAS; j++) {
			const celula = document.createElement('div');
			celula.classList.add('celula');
			celula.dataset.linha = i; // Armazena a posição na célula
			celula.dataset.coluna = j;

			// Tratamento de clique esquerdo (revelar)
			celula.addEventListener('click', () => {
				revelarCelula(i, j);
			});

			// Tratamento de clique direito (bandeira)
			celula.addEventListener('contextmenu', (e) => {
				e.preventDefault(); // Impede o menu de contexto padrão
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
	inicializarTabuleiro();
	criarDOMTabuleiro();
	// Você pode ver a matriz no console para debug!
	// console.log(tabuleiro);
}

/**
 * Trata o clique esquerdo (revelar célula).
 * @param {number} r - Linha.
 * @param {number} c - Coluna.
 */
function revelarCelula(r, c) {
	if (!jogoAtivo) return;

	const celulaDOM = tabuleiroElemento.children[r * COLUNAS + c];

	// Se já estiver revelada ou tiver bandeira, não faz nada
	if (
		celulaDOM.classList.contains('revelada') ||
		celulaDOM.classList.contains('bandeira')
	) {
		return;
	}

	celulaDOM.classList.add('revelada');

	const valor = tabuleiro[r][c];

	if (valor === -1) {
		// --- Bomba! Fim de jogo ---
		celulaDOM.classList.add('bomba');
		celulaDOM.innerHTML = '💣';
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
		// Aqui chamamos a revelação de todos os vizinhos
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
 * Trata o clique direito (colocar/remover bandeira).
 * @param {HTMLElement} celulaDOM - O elemento DOM da célula.
 */
function colocarBandeira(celulaDOM) {
	if (!jogoAtivo || celulaDOM.classList.contains('revelada')) return;

	if (celulaDOM.classList.contains('bandeira')) {
		// Remove a bandeira
		celulaDOM.classList.remove('bandeira');
		celulaDOM.textContent = '';
		bombasRestantes++;
	} else if (bombasRestantes > 0) {
		// Coloca a bandeira
		celulaDOM.classList.add('bandeira');
		celulaDOM.textContent = '🚩';
		bombasRestantes--;
	}

	contadorBandeiras.textContent = bombasRestantes;
	verificarVitoria();
}

/**
 * Verifica se todas as células não-bomba foram reveladas.
 */
function verificarVitoria() {
	let celulasReveladas = 0;
	const totalCelulas = LINHAS * COLUNAS;

	// Conta quantas células foram reveladas
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
 * @param {boolean} vitoria - True se for vitória, False se for derrota.
 */
function fimDeJogo(vitoria) {
	jogoAtivo = false;

	// Revela todas as bombas se for derrota
	if (!vitoria) {
		for (let i = 0; i < LINHAS; i++) {
			for (let j = 0; j < COLUNAS; j++) {
				if (tabuleiro[i][j] === -1) {
					const celulaDOM =
						tabuleiroElemento.children[i * COLUNAS + j];
					celulaDOM.classList.add('revelada', 'bomba');
					celulaDOM.textContent = '💣';
				}
			}
		}
	}

	// Exibe a mensagem final
	mensagemFinal.classList.remove('oculto');
	mensagemFinal.classList.remove('vitoria', 'derrota');

	if (vitoria) {
		textoMensagem.textContent = '🎉 Parabéns, você venceu! 🎉';
		mensagemFinal.classList.add('vitoria');
	} else {
		textoMensagem.textContent = '💥 Game Over! Você atingiu uma bomba. 💥';
		mensagemFinal.classList.add('derrota');
	}
}

// --- Event Listeners ---
botaoReiniciar.addEventListener('click', iniciarJogo);

// --- Início do Jogo ao carregar a página ---
document.addEventListener('DOMContentLoaded', iniciarJogo);
