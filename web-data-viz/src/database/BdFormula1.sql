CREATE DATABASE Formula1;
USE Formula1;

CREATE TABLE usuario (
  idUsuario INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL
);

CREATE TABLE pergunta (
  idPergunta INT PRIMARY KEY AUTO_INCREMENT,
  pergunta TEXT NOT NULL,
  alternativaA TEXT,
  alternativaB TEXT,
  alternativaC TEXT,
  alternativaD TEXT,
  correta VARCHAR(15) NOT NULL
);

CREATE TABLE resposta (
  idResposta INT PRIMARY KEY AUTO_INCREMENT,
  resposta VARCHAR(15),
  acertou TINYINT(1),
  momento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fkUsuario INT,
  CONSTRAINT fk_resposta_usuario 
	FOREIGN KEY (fkUsuario)
    REFERENCES usuario(idUsuario),
  fkPergunta INT,
  CONSTRAINT fk_resposta_pergunta 
	FOREIGN KEY (fkPergunta)
    REFERENCES pergunta(idPergunta)
);

-- tabela de histórico soma (opcional, útil para KPIs)
CREATE TABLE quizHistorico (
  idHistorico INT PRIMARY KEY AUTO_INCREMENT,
  dataJogo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  acertos INT,
  erros INT,
  duracaoSegundos INT,
  fkUsuario INT,
  CONSTRAINT fk_historico_usuario 
	FOREIGN KEY (fkUsuario)
    REFERENCES usuario(idUsuario)
);

INSERT INTO pergunta (pergunta, alternativaA, alternativaB, alternativaC, alternativaD, correta) VALUES
	('Quem é o maior campeão da história da Fórmula 1 em número de títulos?', 'Ayrton Senna', 'Max Verstappen', 'Lewis Hamilton', 'Sebastian Vettel', 'alternativaC'),
	('Em que ano ocorreu a primeira corrida da Fórmula 1?', '1950', '1947', '1960', '1939', 'alternativaA'),
	('Qual equipe detém o maior número de títulos de construtores?', 'Mercedes', 'Ferrari', 'McLaren', 'Red Bull', 'alternativaB'),
	('Qual desses circuitos não faz parte do calendário atual?', 'Jacarepaguá', 'Ímola', 'Valência', 'Sepang', 'alternativaB'),
	('Quem é conhecido como "The Flying Finn"?', 'Mika Häkkinen', 'Fernando Alonso', 'Rubens Barrichello', 'Jenson Button', 'alternativaA'),
	('Qual piloto possui o maior número de pódios na F1?', 'Michael Schumacher', 'Ayrton Senna', 'Lewis Hamilton', 'Max Verstappen', 'alternativaC'),
	('Qual é o país de origem da equipe Red Bull Racing?', 'Alemanha', 'Áustria', 'Reino Unido', 'Suíça', 'alternativaB'),
	('Qual piloto disse a famosa frase "Vamos focar em mudar a mentalidade"?', 'Lewis Hamilton', 'Kimi Räikkönen', 'Mark Webber', 'Nico Rosberg', 'alternativaA'),
	('Qual desses pilotos é tricampeão mundial?', 'Niki Lauda', 'Alain Prost', 'Nelson Piquet', 'Todos os anteriores', 'alternativaD'),
	('Onde fica a sede da Mercedes-AMG Petronas F1?', 'Mônaco', 'Brackley', 'Modena', 'Milton Keynes', 'alternativaB');
    
SELECT * FROM pergunta;
