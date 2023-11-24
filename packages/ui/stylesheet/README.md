# Stylesheet

The source code of styles for all UI components. The styles are written in `stylus` syntax and compiled to CSS during build process. Resulting `wallet-adapter.css` file is copied to respective JS frameworks relevant folders after compilation.

All selectors are prefixed with `wallet-adapter-` to avoid conflicts.

## How to Build

0. Dependencies

- stylus
- Node 16 or newer
- NPM

1. Clone this git repository and change to the project directory

```shell
git clone https://github.com/aztemi/mina-wallet-adapter.git
cd mina-wallet-adapter/packages/ui/
```

2. Install project dependencies

```shell
npm install
```

3. Run below command to compile. This will compile the styl files and copy resulting css file to respective JS frameworks relevant folders.

```shell
npm build
```
