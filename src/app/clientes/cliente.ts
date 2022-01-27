// Classe criada para representar a classe da api

/* Erro ao criar propriedades sem inicializala
   1° opção: usando o ?
   O '?' depois do nome da propriedade indica que ela é opcional

   2° opção: configurando o arquivo tsconfig.json
   setar a propriedade "strictPropertyInitialization" como false
   dentro do objeto "compilerOptions"

   Escolhi configurar o arquivo para poder inicializar um objeto vazio
*/
export class Cliente {
   id: number;
   nome: string;
   cpf: string;
   dataCadastro: string;
}