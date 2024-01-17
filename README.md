# imgur-manager-ia

### Overview
Aplicação para gerenciar álbuns de imagens utilizando a api do imgur.

### Tecnologia
* React
* Node

### Como utilizar (how to)

* _É necessario ter o Node.js instalado em sua maquina para executar os comandos npm no seu console (cmd) (download node js https://nodejs.org/en):_ 

_digite o seguinte comando para instalar as dependecias do projeto (esse comando irá criar a pasta: node_modules no seu projeto):_
```
npm install
```
_com a pasta node_modules em seu projeto digite o seguinte comando para iniciar seu aplicatico react em um server local:_
```
npm start
```
![Captura de tela 2024-01-17 164246](https://github.com/perseul/imgur-manager-ia/assets/53841377/15bd8b77-8768-4e65-bfb5-8660d59e693c)

_devido API do Imgur não disponibiliza requisições vindas de localhost, aqui usamos o ngrok para obter o acesso via maquina local (Download ngrok https://ngrok.com/download)_
_com o ngrok instalado e configurada, digite o seguinte comando para abrir uma conexão na mesma porta em que o nosso aplicativo está ouvindo: 3000_

```
ngrok http 3000
```
![Captura de tela 2024-01-17 164159](https://github.com/perseul/imgur-manager-ia/assets/53841377/29723478-e1b9-464e-8c49-967681910fd8)

_em seguida acesse o link gerado pelo ngrok que publicou a sua aplicação em um sevidor disponivel para toda a web, assim irá conseguir gerenciar o album do imgur:_

![ngrok url](https://github.com/perseul/imgur-manager-ia/assets/53841377/5f4b4373-fbdd-4c3b-bbbc-680c58971844)

## Links
* [Download Node.js](https://nodejs.org/en)
* [Download ngrok](https://ngrok.com/download)

