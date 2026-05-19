Plano para implementar a edição da tabela de diárias

1. Criar uma fonte única para os dados da tabela
- Definir uma estrutura compartilhada para os itens de diária com:
  - id
  - nome/cargo
  - valor para Capital
  - valor para Outras localidades
  - descrição opcional
- Mover os valores que hoje estão duplicados entre a Calculadora e a aba Informações para o componente principal da página, garantindo que a calculadora use os mesmos dados exibidos/editados na tabela.

2. Atualizar a aba Informações
- Em cada item da tabela, adicionar um botão “Editar”.
- Ao clicar em “Editar”, abrir uma janela/aba modal de edição com os campos:
  - Nome
  - Valor Capital
  - Valor Outras
- Manter os valores atuais preenchidos no formulário.
- Adicionar botões “Salvar” e “Cancelar”.
- Validar os campos antes de salvar:
  - nome obrigatório
  - valores numéricos obrigatórios
  - valores não negativos
- Ao salvar, atualizar o item na tabela imediatamente.

3. Atualizar a Calculadora
- Fazer o seletor “Cargo/Função” carregar os nomes atualizados da tabela.
- Fazer o cálculo usar os valores atualizados de Capital e Outras Localidades.
- Se o usuário editar o item atualmente selecionado, o cálculo seguinte já usará os novos valores.
- Opcionalmente, limpar o resultado anterior ao salvar uma edição, para evitar que um resultado antigo fique visível com valores já alterados.

4. Persistência dos valores editados
- Como o projeto ainda não possui integração Supabase configurada nos arquivos atuais, implementarei inicialmente persistência local no navegador usando localStorage.
- Assim, os valores editados continuam salvos ao recarregar a página no mesmo navegador.
- Também adicionarei opção de restaurar os valores padrão, se fizer sentido na interface.

5. Teste da conexão com Supabase
- O projeto não possui atualmente cliente Supabase, pasta de integração ou configuração encontrada no código.
- Após sua aprovação, posso verificar a disponibilidade de conexão/variáveis do Supabase no ambiente e, se houver integração ativa, testar uma consulta simples.
- Se não houver Supabase conectado, informarei que é necessário conectar o Supabase/Lovable Cloud antes de persistir esses valores em banco.

Detalhes técnicos
- Arquivos principais a alterar:
  - `src/pages/Index.tsx`: manter o estado compartilhado dos itens de diária e passar para os componentes.
  - `src/components/DailyAllowanceCalculator.tsx`: receber os itens por props e calcular com os dados atualizados.
  - `src/components/InfoPanel.tsx`: receber os itens por props, exibir tabela e abrir modal de edição.
- Usarei componentes já existentes do projeto:
  - `Dialog`
  - `Button`
  - `Input`
  - `Label`
  - `Card`
  - `Badge`
- Não criarei backend próprio. Caso a persistência em banco seja necessária depois, será feita via Supabase/Lovable Cloud.