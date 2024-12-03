    class Grafo{
        constructor(){
            this.map = new Map();
        }
        addVertice(vertice){
            if(!this.map.has(vertice)){
                this.map.set(vertice, []);
            }
        }
        addAresta(source, destination) {
            if (!this.map.has(source)) {
                this.addVertice(source);
            }
            this.map.get(source).push(destination);
        }
                    
        toString(){
            let result = "";
            for (const [vertex, edges] of this.map.entries()) {
                result += `${vertex}: ${edges.join(" ")}\n`;
            }
            return result;
        }
        
    }
    let grafo;

    function criarTabelaGrafos(){
        const input = document.getElementById("grafoQtd");
        const quantiaGrafo = parseInt(input.value , 10);

        if(isNaN(quantiaGrafo)|| quantiaGrafo <= 0){
            alert("Insira um valor maior ou igual a 1!");
        }
        //apaga a antiga matriz
        const tableContainer = document.getElementById("tableContainer");
        tableContainer.innerHTML = "";
        //apaga a lista
        const listContainer = document.getElementById("listContainer");
        listContainer.innerHTML = "";

        const table = document.createElement("table");

        const headerRow = document.createElement("tr");
        const headerCellVazia = document.createElement("th");
        headerRow.appendChild(headerCellVazia);

        //gera o header com os números 
        for(let i = 1; i <= quantiaGrafo; i++){
            const headerCell = document.createElement("th");
            headerCell.textContent = i;
            headerRow.appendChild(headerCell);
        }
        table.appendChild(headerRow);

        for(let i = 1; i <= quantiaGrafo; i++)
        {
            const row = document.createElement("tr");
            const rowHeader = document.createElement("th");
            rowHeader.textContent = i;
            row.appendChild(rowHeader);

            for(let j = 1; j <= quantiaGrafo; j++){
                const cell = document.createElement("td");
                const input = document.createElement("input");
                input.type = 1;
                input.placehoder = `(0 ou 1)`;
                cell.appendChild(input);
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        table.id ="matriz";
        tableContainer.appendChild(table);
    }

    function criarListaGrafos() {
        const input = document.getElementById("grafoQtd");
        const quantiaGrafo = parseInt(input.value, 10);
    
        if (isNaN(quantiaGrafo) || quantiaGrafo <= 0) {
            alert("Insira um valor maior ou igual a 1!");
            return;
        }
        alert("para evitar erros, digite da forma Aresta1 Aresta2 Aresta3!\nExemplo | 1 | 1 2 3 |");
    
        // Apaga a antiga matriz
        const tableContainer = document.getElementById("tableContainer");
        tableContainer.innerHTML = "";
    
        // Apaga a lista
        const listContainer = document.getElementById("listContainer");
        listContainer.innerHTML = "";
    
        const table = document.createElement("table");
    
        for (let i = 1; i <= quantiaGrafo; i++) {
            const row = document.createElement("tr");
            const rowHeader = document.createElement("th");
            rowHeader.textContent = i; // Define o cabeçalho da linha
            row.appendChild(rowHeader);
    
            for (let j = 1; j <= 1; j++) {
                const cell = document.createElement("td");
                const input = document.createElement("input");
                input.type = "text";
                input.placeholder = `Destino1 Destino2 Destino3...`;
                cell.appendChild(input);
                row.appendChild(cell); 
            }
    
            table.appendChild(row); 
        }
        table.id ="lista";
        tableContainer.appendChild(table); 
    }

    function criarGrafo() {
        const table = document.getElementById("matriz")
        const list = document.getElementById("lista")
        if (!table && !list) {
            alert("Por favor, crie a tabela primeiro.");
            return;
        }else{
            if(table){
                const grafoQtd = parseInt(document.getElementById("grafoQtd").value, 10);
                grafo = new Grafo();

                for (let i = 1; i <= grafoQtd; i++) {
                    for (let j = 1; j <= grafoQtd; j++) {
                        const cell = table.rows[i].cells[j].firstChild;
                        if (cell && cell.value.trim() === "1") {
                            grafo.addAresta(i, j);
                        }
                    }
                }
            }
            if(list){
                const grafoQtd = parseInt(document.getElementById("grafoQtd").value, 10);
                grafo = new Grafo()
                const rows = document.querySelectorAll("tr");
                rows.forEach(row => {
                    const origem = row.querySelector("th").textContent.trim(); 
                    const input = row.querySelector("input"); 
                    const destinos = input.value.trim().split(/\s+/);                              
                    grafo.addVertice(origem);            
                    destinos.forEach(destino => {
                        if (destino && destino<=grafoQtd) { 
                            grafo.addAresta(origem, destino);
                        }
                    });
                });
            }           
        }
        const output = document.getElementById("grafo");
        output.innerHTML = "";
        output.textContent = `Representação do Grafo:\n${grafo.toString()}`;
        document.body.appendChild(output);
        
        return grafo; 
    }

    function bfs(grafo, origem) {
        const fila = [];
        const visitados = new Set();
    
        fila.push(origem);
        visitados.add(origem);
    
        while (fila.length > 0) {
            const vertice = fila.shift(); 
            console.log(vertice); 
    
            const vizinhos = grafo.map.get(vertice);
            for (const vizinho of vizinhos) {
                if (!visitados.has(vizinho)) {
                    fila.push(vizinho);
                    visitados.add(vizinho);
                }
            }
        }
    }

    function dijkstra(grafo, inicio) {
        const distancias = {};
        const anteriores = {};
        const pq = new Set();

    
        for (let vertice of grafo.map.keys()) {
            distancias[vertice] = Infinity;
            anteriores[vertice] = null;
            pq.add(vertice);
        }
        distancias[inicio] = 0;

        while (pq.size > 0) {
            
            let atual = null;
            for (let vertice of pq) {
                if (atual === null || distancias[vertice] < distancias[atual]) {
                    atual = vertice;
                }
            }

        
            pq.delete(atual);

        
            if (distancias[atual] === Infinity) break;

            for (let vizinho of grafo.map.get(atual)) {
                const novaDistancia = distancias[atual] + 1;
                if (novaDistancia < distancias[vizinho]) {
                    distancias[vizinho] = novaDistancia;
                    anteriores[vizinho] = atual;
                }
            }
        }

        console.log("Distâncias mínimas: ", distancias);
    }

    function floydWarshall(grafo, grafoQtd) {
        const distancias = [];
        
        for (let i = 0; i < grafoQtd; i++) {
            distancias[i] = [];
            for (let j = 0; j < grafoQtd; j++) {
                if (i === j) {
                    distancias[i][j] = 0;
                } else {
                    distancias[i][j] = Infinity;
                }
            }
        }

        grafo.map.forEach((vizinhos, origem) => {
            vizinhos.forEach(destino => {
                distancias[origem - 1][destino - 1] = 1;
            });
        });

        for (let k = 0; k < grafoQtd; k++) {
            for (let i = 0; i < grafoQtd; i++) {
                for (let j = 0; j < grafoQtd; j++) {
                    distancias[i][j] = Math.min(distancias[i][j], distancias[i][k] + distancias[k][j]);
                }
            }
        }

        console.log("Matriz de distâncias mínimas entre todos os pares de vértices:");
        console.table(distancias);
    }       