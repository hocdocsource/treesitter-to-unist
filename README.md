# treesitter-to-unist

A typescript library to transform a [Tree-sitter](http://tree-sitter.github.io/) tree to a [Universal Syntax Tree](https://github.com/syntax-tree/unist).

It can be used to analyze source codes with the tools from [unifiedjs](https://unifiedjs.com).

## Install

npm:

```
npm install treesitter-to-unist
```

## Usage

```ts
import treesitterToUninst from 'treesitter-to-unist';

// First parse source to a TreeSitter tree
const unistTree = treesitterToUninst(treesitterTree);
```

See [the Javascript parser test](test/javascript.test.ts) for a full example.

## Local Development

Below is a list of commands you will probably find useful.

### `npm start` or `yarn start`

Runs the project in development/watch mode. Your project will be rebuilt upon changes. TSDX has a special logger for you convenience. Error messages are pretty printed and formatted for compatibility VS Code's Problems tab.

<img src="https://user-images.githubusercontent.com/4060187/52168303-574d3a00-26f6-11e9-9f3b-71dbec9ebfcb.gif" width="600" />

Your library will be rebuilt if you make edits.

### `npm run build` or `yarn build`

Bundles the package to the `dist` folder.
The package is optimized and bundled with Rollup into multiple formats (CommonJS, UMD, and ES Module).

<img src="https://user-images.githubusercontent.com/4060187/52168322-a98e5b00-26f6-11e9-8cf6-222d716b75ef.gif" width="600" />

### `npm test` or `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.

## License

[MIT](LICENSE) © Bernhard Berger
