# Como Rodar o Projeto

1. Clone/Fork o repositório.
2. Com o repositório na sua máquina, abra ele no seu editor de preferência e rode `yarn install`, o `package.json` usa o yarn como *packageManager*, porém se preferir pode usar outro gerenciador de sua preferência.
3. Rode localmente com `yarn dev` ou package manager de sua preferência.

## Decisões Técnicas

- Tentei deixar a aplicação o mais simples possível, porém funcional, para evitar over-engineering e não usar Context foi uma dessas coisas que decidi não adicionar para simplificar o app.
- Decidi usar o AntDesign como biblioteca de componentes já que tenho familiaridade.
- Não estruturei o layout/design em mobile-first e sim desktop-first, porém a aplicação está responsiva e funciona no mobile.
- o Hook `useTasks.ts` centraliza toda a lógica de gerenciamento das tarefas (create, read, update, delete).
- o Hook `useModalForm.ts` é usado para controlar o estado "open" da modal em diferentes componentes.
- Foi utlizado IA na refatoração, revisão de código e criação de funcionalidades reutilizáveis.

## Estrutura localStorage

No primeiro carregamento, o localStorage vem vazio, então é usado o mock data do `tasks.json`, porém ao fazer qualquer ação, os dados são salvos no localStorage e o mock data não é mais carregado.
As tasks tem uma chave *tasks* no storage onde a estrutura é um *Array* de *Tasks*, contendo o *id, title, description, dueDate, priority & done*.
