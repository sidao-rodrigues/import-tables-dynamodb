# Script para importar e exportar dados entre tabelas no Dynamodb da AWS.

Já existem um arquivo de debug caso queria debugar o script e ver o passo a passo.

## Tabelas

Para informar a tabela de origem e a tabela de destino, basta informar os nomes das tabelas no arquivo index.js nos atributos (TableName)

## Configuração AWS

Para realizar a importação é necessário configurar as chaves de acesso da sua conta AWS.
Assim, para realizar a configuração basta seguir os passos descritos neste [link](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html).

## Execução

Após configurado as tabelas lembre-se de dar um `npm install`

Para executar o scrip basta executar o comando:

```sh
npm run import
``` 
