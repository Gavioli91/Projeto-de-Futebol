O projeto é um site informativo sobre partidas e classificações de futebol.
Foi utilizada uma API (aplicando o método TDD) e também para integrar - através do docker-compose - as aplicações são que elas funcionem consumindo um banco de dados.
O projeto, foi construído com back-end dockerizado, utilizando modelagem de dados através do Sequelize. E a API foi capaz de consumir um front-end já existente no projeto.
Para adicionar uma partida foi necessário ter um token, sendo assim, a pessoa usuária deverá estar logada para fazer as alterações. Foi feito uma relação entre as tabelas teams e matches para atualizar as partidas.
O back-end foi implementado nas regras de negócio para popular adequadamente a tabela disponível no front-end que foi mostrada para a pessoa usuária do sistema.
