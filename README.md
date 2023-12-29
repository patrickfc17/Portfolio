# Site pessoal para Portfólio.

-   Patrick Ferreira Carvalho

## Tecnologias Utilizadas

-   Frontend:
    -   TypeScript
    -   WebComponents
    -   Sass
    -   Vite
-   Backend:
    -   NodeJS / TS
    -   ExpressJS / TS

## Setup Inicial

```bash
git clone https://github.com/patrickfc17/Portfolio.git
```

```bash
cd Portfolio
```

## Frontend

```bash
cd frontend
```

```bash
npm install
```

```bash
cp .env.example .env
```

```bash
npm run dev
```

```bash
npx sass ./src/Pages/main.scss ./src/app.css
// ou
npm install -g sass
sass ./src/Pages/main.scss ./src/app.css
```

```bash
./loader
```

## Backend

```bash
cd backend
```

```bash
npm install
```

```bash
cp .env.example .env
```

```bash
npm run dev
// ou
npm run start
```

## Estrutura (Frontend)

Este portfólio utiliza a "Component-Based Architecture", ou seja, a construção da UI se baseia em componentes reutilizáveis.
Ao contrário de muitas aplicações Web modernas que utilizariam frameworks frontend para diferentes estratégias de renderização de páginas (CSR, SSR, ISR...),
este projeto utiliza uma API muito simples da especificação da Mozilla: Web Components.

A API de Web Components permite criar uma arquitetura bastante similar à de frameworks atuais, encapsulando fragmentos da UI em componentes isolados (HTML, CSS e JS).

Para começar a criar componentes neste projeto, você pode acessar o diretório "src/Components" e criar uma pasta com o nome do seu componente desejado.
Após isso, crie um arquivo index.html e defina nele o template, ou seja, a estrutura base do seu componente, podendo adicionar também estilos (CSS) e script (JS/TS).

```html
<!-- src/Components/NewComponent/index.html -->
<link rel="stylesheet" href="style.css" />

<template id="new-component">
    <h1 class="title">Olá Web Components! :D</h1>
</template>

<!-- <script type="module" src="script.ts"></script> -->
```

Agora, será necessário criar o script que irá definir o seu novo WebComponent. Por padrão, este projeto utiliza o prefixo "+define" para arquivos TypeScript que definem um WebComponent. Para a definição do "Shadow Root" de seu componente, você pode utilizar o Hook "useShadowRoot", passando como parâmetro o id do seu componente e, opcionalmente, se ele possui um estilo prório ou não (o padrão para este parâmetro de estilo é "true". Dessa forma, caso seu componente não possua estilo, este parâmetro deve ser informado como "false")

```ts
// src/Components/NewComponent/+define.ts

import { LoadComponentProcedure } from "@/Types/components";
import { useShadowRoot } from "@/Hooks/shadow-root-template";

export const loadComponent: LoadComponentProcedure = () => {
    customElements.define(
        "new-component-",
        useShadowRoot({ id: "new-component" })
    );
};
```

Lembrando que o Tipo "LoadComponentProcedure" define o retorno desta função/procedimento como "void | FailedToLoadElementError | RequiredAttributeError". Como pode ver, existem dois tipos de erros a serem tratados nesses procedimentos: um erro caso não seja possível recuperar o elemento "template" do arquivo e outro caso este elemento não possua algum parâmetro obrigatório (no caso dos WebComponents utilizados neste projeto, todos devem possuir um "id" com o nome de seu componente).

Assim, caso queira utilizar este novo componente customizado em uma página HTML, tudo que é necessário é utilizar o Hook "useComponent", definido dentro do diretório "src/Hooks" no arquivo "import-component.ts". Este Hook aceita dois parâmetros: o caminho para o diretório desse componente e o nome do arquivo Root (Template HTML) deste componente, que por padrão é 'index'.

```ts
// script.ts
import { useComponent } from "../Hooks/import-component";
import { loadComponent } from '@/Components/NewComponent/+define'

useComponent("src/Components/NewComponent", loadComponent);
```

Pronto! Agora com seu componente definido e importado no script da página que deseja usar, é só adicionar este script na página e usar o WebComponent:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script type="module" src="./script.ts" defer></script>
        <title>Page</title>
        <style>
            body {
                height: max-content;
            }
        </style>
    </head>
    <body>
        <new-component-></new-component->
    </body>
</html>
```

Essa é a estrutura mais básica para trabalhar com WebComponents neste projeto. Caso precise de mais informações sobre esta API, consulte:

-   https://developer.mozilla.org/pt-BR/docs/Web/API/Web_components
