const { scanItems, putItems } = require('./functions');

console.log('Iniciando importação...\n\n');

//Utilizado para buscar os itens da tabela de origem
const originTableParams = {
	TableName: 'NOME_TABELA_ORIGEM'
}

//Utilizado para passar os itens para a tabela de destino
const destinationTableParams = {
	TableName: 'NOME_TABELA_DESTINO'
}

//Busca todos os itens da tabela de origem
console.log(`Listando itens da tabela de origem (${originTableParams.TableName})\n`);

scanItems(originTableParams)
	.then(data => {
		console.log(`Quantidade de itens listados: ${data.length}\n`);

		if(data.length > 0) {
			console.log(`Importando itens para tabela de destino (${destinationTableParams.TableName})\n`);
			
			let hasError = [];

			data.forEach(async item => {
				try {
					await putItems({ ...destinationTableParams, Item: item });
				} catch(err) {
					hasError.push(`Ocorreu um erro ao salvar dados na tabela de destino (${destinationTableParams.TableName}) >>> ${err}`);
				}
			});

			console.log(`Importação realizada com sucesso!\nQuantidade de items importados com sucesso: ${data.length - hasError.length}\n\n`);

			if(hasError.length > 0) {
				console.log(`Um ou mais items foram importados com erro.\n\n\n`);
				hasError.forEach((err, idx) => console.log(`${idx+1}º >>> ${err}`));
			}
		}
	})
	.catch(err => 
		console.log(`Ocorreu um erro ao buscar dados da tabela de origem (${originTableParams.TableName}) >>>\n`, err)
	);