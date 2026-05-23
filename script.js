// ===============================
// CONFIGURAÇÕES DO SISTEMA
// ===============================
const telefone = '5551981962819';

// ===============================
// SISTEMA DE CARRINHO DE COMPRAS
// ===============================
let carrinho = [];
let totalPedido = 0;

// Função para adicionar Bolos e Doces
function adicionarAoCarrinho(produto, preco) {
    carrinho.push({ nome: produto, preco: preco });
    totalPedido += preco;
    atualizarCarrinho();
    alert(`✅ ${produto} adicionado ao carrinho!`);
}

// Atualiza os números e a lista no Carrinho
function atualizarCarrinho() {
    document.getElementById('contador-carrinho').innerText = carrinho.length;

    const listaItens = document.getElementById('itens-carrinho');
    listaItens.innerHTML = '';

    carrinho.forEach((item) => {
        listaItens.innerHTML += `
            <div class="item-carrinho">
                <span style="white-space: pre-wrap; flex: 2;">${item.nome}</span>
                <span style="font-weight: bold; flex: 1; text-align: right;">R$ ${item.preco.toFixed(2)}</span>
            </div>
        `;
    });

    document.getElementById('valor-total').innerText = totalPedido.toFixed(2);
}

// Controla a janelinha do carrinho
function abrirCarrinho() {
    document.getElementById('modal-carrinho').style.display = 'block';
}

function fecharCarrinho() {
    document.getElementById('modal-carrinho').style.display = 'none';
}

// Dispara tudo para o WhatsApp da Doceira
function enviarPedido() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio! Adicione alguns produtos antes de finalizar. 😊');
        return;
    }

    let textoPedido = `🎂 *NOVO PEDIDO - CANTINHO DOCE*\n\n`;
    textoPedido += `*Itens do Pedido:*\n`;

    carrinho.forEach(item => {
        textoPedido += `👉 ${item.nome} (R$ ${item.preco.toFixed(2)})\n`;
    });

    textoPedido += `\n💰 *Valor Total da Compra:* R$ ${totalPedido.toFixed(2)}\n\n`;
    textoPedido += `Olá! Conferi o carrinho e gostaria de finalizar esse pedido. Como faço o Pix do sinal? 😊`;

    const link = `https://wa.me/${telefone}?text=${encodeURIComponent(textoPedido)}`;
    window.open(link, '_blank');
}


// ==========================================
// SISTEMA INTERATIVO - CENTO DE SALGADOS
// ==========================================
let numeroSaboresMostrados = 1;

function toggleAreaSalgados() {
    const areaSeletores = document.getElementById('container-seletores-salgados');
    const btnToggle = document.getElementById('btn-toggle-cento');
    const btnFinalizar = document.getElementById('btn-finalizar-cento');

    if (areaSeletores.style.display === 'none') {
        areaSeletores.style.display = 'block';
        btnToggle.innerText = '✖ Cancelar Montagem';
        btnToggle.style.backgroundColor = '#ddd';
        btnToggle.style.color = '#555';
        btnFinalizar.style.display = 'block';
    } else {
        areaSeletores.style.display = 'none';
        btnToggle.innerText = '⚙️ Montar Meu Cento';
        btnToggle.style.backgroundColor = '#fce4ec';
        btnToggle.style.color = '#d63384';
        btnFinalizar.style.display = 'none';
        resetarSeletoresSalgadosCustomizados();
    }
}

function revelarMaisLinhasSabores() {
    if (numeroSaboresMostrados < 4) {
        numeroSaboresMostrados++;
        const proximaLinha = document.getElementById(`linha${numeroSaboresMostrados}`);
        if (proximaLinha) {
            proximaLinha.style.display = 'flex';
            if (numeroSaboresMostrados === 4) {
                document.getElementById('btn-add-sabor').style.display = 'none';
            }
        }
    }
}

function resetarSeletoresSalgadosCustomizados() {
    numeroSaboresMostrados = 1;
    document.querySelectorAll('#container-seletores-salgados select').forEach(select => select.selectedIndex = 0);
    document.querySelectorAll('#container-seletores-salgados input[type="number"]').forEach(input => input.value = '');
    for (let i = 2; i <= 4; i++) {
        const linha = document.getElementById(`linha${i}`);
        if (linha) {
            linha.style.display = 'none';
        }
    }
    document.getElementById('btn-add-sabor').style.display = 'block';
}

function pedirSalgadosCustomizados() {
    let saboresParaPedido = [];
    let totalSalgadosDigitado = 0;

    for (let i = 1; i <= 4; i++) {
        const sabor = document.getElementById(`sabor${i}`).value;
        const qtdInput = document.getElementById(`qtd${i}`);
        const qtd = parseInt(qtdInput.value) || 0;

        if (sabor !== "" && qtd > 0) {
            saboresParaPedido.push({ sabor: sabor, quantidade: qtd });
            totalSalgadosDigitado += qtd;
        }
    }

    if (saboresParaPedido.length === 0) {
        alert('Por favor, escolha pelo menos um sabor e uma quantidade para o cento.');
        return;
    }

    if (totalSalgadosDigitado !== 100) {
        const confirmar = confirm(`Atenção: O total de salgados digitado foi ${totalSalgadosDigitado} unidades.\nO cento deve ter 100 unidades.\nDeseja adicionar ao carrinho mesmo assim?`);
        if (!confirmar) return;
    }

    let detalheSabores = '';
    saboresParaPedido.forEach(item => {
        detalheSabores += `   - ${item.quantidade}x ${item.sabor}\n`;
    });

    const nomeProduto = `Cento de Salgadinhos:\n${detalheSabores}`;

    // Adiciona ao carrinho em vez de ir direto pro WhatsApp
    carrinho.push({ nome: nomeProduto, preco: 70.00 });
    totalPedido += 70.00;
    atualizarCarrinho();

    alert('✅ Cento de salgadinhos adicionado ao carrinho!');
    toggleAreaSalgados(); // Fecha e limpa a caixinha de montar
}


// ===============================
// ANIMAÇÕES E EFEITOS VISUAIS
// ===============================
const cards = document.querySelectorAll('.card');
window.addEventListener('scroll', () => {
    cards.forEach((card) => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < window.innerHeight - 100) {
            card.classList.add('show');
        }
    });
});

const links = document.querySelectorAll('nav a');
links.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const id = link.getAttribute('href');
        const secao = document.querySelector(id);
        if (secao) {
            window.scrollTo({
                top: secao.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

const botaoTopo = document.createElement('button');
botaoTopo.innerHTML = '↑';
botaoTopo.classList.add('topo-btn');
document.body.appendChild(botaoTopo);

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        botaoTopo.classList.add('ativo');
    } else {
        botaoTopo.classList.remove('ativo');
    }
});

botaoTopo.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const titulo = document.querySelector('.hero-text h1');
if (titulo) {
    const textoOriginal = titulo.innerHTML.trim();
    titulo.innerHTML = '';
    let i = 0;

    function escreverTexto() {
        if (i < textoOriginal.length) {
            titulo.innerHTML += textoOriginal.charAt(i);
            i++;
            setTimeout(escreverTexto, 40);
        }
    }
    escreverTexto();
}

window.addEventListener('load', () => {
    console.log(`🍰 Sistema Premium de Confeitaria carregado com sucesso!\n🚀 Carrinho de compras e Montagem de Salgados 100% ativos.`);
});