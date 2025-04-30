// SequentialID Função para gerar IDs sequenciais a partir de uma string base
class SequentialID {
    constructor() {}

    // A inicialização da classe é feita aqui e não no construtor para que ela possa configurada dentro de outra classe
    init() {
        this.map = new Map();
    }

    // Cria um ID sequencial baseado na string base
    create(base) {
        if (!this.map.has(base)) {
            this.map.set(base, 0);
        }
        const count = this.map.get(base);
        this.map.set(base, count + 1);
        return `${base}_${count}`;
    }
}
