## Componente de feedback de artigos

Este script JavaScript tem como objetivo criar um componente de pesquisa de satisfação para artigos em um site. Ele oferece uma interface para os usuários expressarem feedback sobre a utilidade do conteúdo.

## Demonstração do Funcionamento:

Aqui está um GIF demonstrando o funcionamento do script:

![Demonstração do Funcionamento](https://github.com/confluencendd/component-feedback-article/blob/current/assets/funcionamento.gif)

### Funcionalidades Principais:

1. **Configuração de Textos:**
   - O script armazena textos em diferentes idiomas para as perguntas da pesquisa, opções de feedback negativo e mensagens de agradecimento.

2. **Geração do HTML da Pesquisa:**
   - A função `generateSurveyHTML` cria a estrutura HTML da pesquisa de acordo com o idioma fornecido.
   
3. **Opções de Feedback Negativo:**
   - A função `generateNegativeFeedbackHTML` gera as opções de feedback negativo baseadas no idioma selecionado.
   
4. **Manipulação da Interface:**
   - Funções como `openModalFeedback`, `closeModalFeedback`, `sendPositiveFeedback` e `sendNegativeFeedback` controlam a exibição de elementos da interface com base nas interações do usuário.

5. **Event Listeners:**
   - `generateEventsButtonsSurvey` adiciona escutadores de eventos aos botões da pesquisa, controlando as interações do usuário e o fluxo da pesquisa.

### Uso:

1. **Configuração Inicial:**
   - O script inicia verificando o idioma da página. Se o idioma não estiver disponível nas opções definidas, a pesquisa é exibida em português.

2. **Inclusão na Página:**
   - Para adicionar a pesquisa de satisfação a uma página, é necessário incluir um marcador `{{component-feedback-article}}` dentro de um parágrafo (`<p>`). O script busca por esse marcador para inserir dinamicamente a pesquisa no local correto da página.

3. **Feedback do Usuário:**
   - Os usuários podem expressar sua opinião selecionando "Sim" ou "Não". Caso selecionem "Não", têm a opção de fornecer um feedback mais detalhado sobre o motivo pelo qual o artigo não foi útil.

4. **Captura de Eventos para Google Analytics (Google Tag Manager):**
   - Integramos ao Google Tag Manager para capturar eventos específicos, como cliques nos botões de feedback, e enviá-los ao Google Analytics para análise. Isso requer configuração adicional nos gatilhos e tags do Google Tag Manager para capturar e processar os eventos.

5. **Personalização:**
   - Para personalizar ou adicionar mais idiomas, é necessário editar os arrays `languages`, `text_survey`, e `text_negative_feedback_options` dentro do código.

6. **Estilização:**
   - Para aplicar estilos personalizados à pesquisa, é necessário modificar as classes CSS definidas no HTML gerado pelo script.

### Integração:

- O script pode ser integrado em sites com a estrutura HTML apropriada e permite que os usuários forneçam feedback sobre o conteúdo de forma interativa.
