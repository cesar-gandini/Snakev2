let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let box = 32;
let snake = [
    { x: 8 * box, y: 8 * box },
    { x: 9 * box, y: 8 * box }
  ];
  let direction = "right";
  const food = {
    x: Math.floor(Math.random() * 15 + 1) * box, 
    y: Math.floor(Math.random() * 15 + 1) * box 
  };
  let score = 0;
  
  function createBG(){
    context.fillStyle = "black";
    context.fillRect(0, 0, 16 * box, 16 * box);
  }
  function createSnake() {
    for (let i = 0; i < snake.length; i++) {
      context.fillStyle = i === 0 ? "green" : "lightgreen";
      context.fillRect(snake[i].x, snake[i].y, box, box);
      context.strokeStyle = "white";
      context.strokeRect(snake[i].x, snake[i].y, box, box);
    }
  }
  function createFood() {
    context.fillStyle = "red"; 
    context.fillRect(food.x, food.y, box, box);
  }
  function update(event) {
    // Verificar se a tecla pressionada é uma seta e definir a direção
    switch (event.keyCode) {
      case 37: // Seta para a esquerda
        if (direction !== "right") {
          direction = "left";
        }
        break;
      case 38: // Seta para cima
        if (direction !== "down") {
          direction = "up";
        }
        break;
      case 39: // Seta para a direita
        if (direction !== "left") {
          direction = "right";
        }
        break;
      case 40: // Seta para baixo
        if (direction !== "up") {
          direction = "down";
        }
        break;
    }
  }
  
  function drawScore() {
    context.fillStyle = "white";
    context.font = "2vw Arial";
    context.fillText("Score: " + score, 12, 500);
  }

    function startGame() {
    let game = setInterval(() => {
      console.log("Game Interval Executing...");
    // Declaração das variáveis snakeX e snakeY
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    document.addEventListener("keydown", update);  
    // Definir intervalo para a atualização contínua do jogo
    
      // Lógica de movimentação da cobra
      if (direction === "right") snakeX += box;
      if (direction === "left") snakeX -= box;
      if (direction === "up") snakeY -= box;
      if (direction === "down") snakeY += box;
  
      // Lógica de atravessar para o outro lado
      if (snakeX > 15 * box) snakeX = 0;
      if (snakeX < 0) snakeX = 15 * box;
      if (snakeY > 15 * box) snakeY = 0;
      if (snakeY < 0) snakeY = 15 * box;
  
      
      
                
      // Verificar se a cobra comeu a comida
      if (snakeX === food.x && snakeY === food.y) {
        
        // Gerar uma nova posição aleatória para a comida
        do {
            food.x = Math.floor(Math.random() * 13 + 3) * box;
            food.y = Math.floor(Math.random() * 13 + 3) * box; // Ajuste na fórmula para garantir que o food esteja dentro da área
          } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
          
          const newHead = { x: snakeX, y: snakeY };
          snake.unshift(newHead);
          score += 100;
        } else {
            const newHead = { x: snakeX, y: snakeY };
        snake.unshift(newHead);
            snake.pop();
        }
            // Se a cobra não comeu a comida, adicionar um novo segmento à frente (cabeça)
          //const newHead = { x: snakeX, y: snakeY };
          //snake.unshift(newHead);
          
        // else {
        // Se a cobra não comeu a comida, remover o último segmento da cobra
        //snake.pop();
      //}
  
      // Atualizar a posição da cabeça da cobra
      snake[0] = { x: snakeX, y: snakeY };
      console.log("Snake Head Position:", snakeX, snakeY);
      // Verificar colisão da cobra com ela mesma
      for (var i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
          // Game over - colisão com a própria cobra
          
          clearInterval(game);
          context.fillStyle = "#f00";
          context.font = "120px Arial Bold";
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.fillText("Game Over!!!", 4 * box, 6 * box, 8 * box);
          context.font = "70px Arial Bold";
          context.fillText("Seu Score foi:  " + score, 3 * box, 8 * box, 10 * box);
          const restartButton = document.createElement("button");
          restartButton.id = "restart";
          restartButton.textContent = "Restart";
          restartButton.style.position = "absolute";  // Configurar posição absoluta
          restartButton.style.top = "70%";  // Configurar a distância do topo (ajuste conforme necessário)
          restartButton.style.left = "50%";  // Configurar a distância da esquerda (ajuste conforme necessário)
          restartButton.style.transform = "translate(-50%, -50%)";
          restartButton.addEventListener("click", function() {
    // Recarregar a página
          window.location.reload();
  });
  // Adicionar botão ao corpo do documento
          document.body.appendChild(restartButton);
          return;
        }
      }
  
      // Invocar as funções de desenho
      createBG();
      createSnake();
      createFood();
      drawScore();
    }, 90); // Ajuste o intervalo conforme necessário
  }
  
  startGame();