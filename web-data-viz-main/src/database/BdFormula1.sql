CREATE DATABASE Formula1;
USE Formula1;

CREATE TABLE usuario (
  idUsuario INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL
);

CREATE TABLE partida (
    idPartida INT PRIMARY KEY AUTO_INCREMENT,
    dataFim DATETIME
);

CREATE TABLE resultado (
    idResultado INT PRIMARY KEY AUTO_INCREMENT,
    totalAcertos INT,
    pontos INT,
    totalErros INT,
    fkPartida INT,
		FOREIGN KEY (fkPartida) 
			REFERENCES partida(idPartida),
	fkUsuario INT,
		FOREIGN KEY (fkUsuario) 
			REFERENCES usuario(idUsuario)
);
