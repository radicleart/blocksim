# blocksim

Blockchain visualisation tool.

## Developing

```bash
npm install
npm install sass
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Github Pages

```bash
npm install
npm run build
node ./gh-pages.js
```

This pushes the contents of `build/` to the `gh-pages` branch. Github Pages
have been configured the server the application from:

```bash
https://radicleart.github.io/blocksim
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Packaging

```bash
./node_modules/.bin/svelte-kit package
cd package
npm publish
```

## Blocks Controls

Button controls on each block;

- H - Highlight ancestors and descendant's - click once to highlight click twice to reset or click and hold - changes the subtree block colour to purple.
- T/F click to toggle Freeze/Thaw block - mining is prevented when block is frozen - changes block colour to light blue / cyan.
- C/D click to toggle Concealed/Disclosed - changes the block colour to white, does not change mining rules etc atm.
- M click to mine a block. a block will be added to the tree. Throws error if business rules don't allow mining from this block.

## API

### API - Business Model

See src/lib/blocks.ts

- window.mineBlock(id) // mines a new block given the given parent id or throws error
- window.freezeBlock(id) // freezes the given block or throws error
- window.thawBlock (id) // thaws the given block or throws error
- window.concealBlock (id) // conceals the given block or throws error
- window.discloseBlock(id) // discloses the given block or throws error
- window.setMinableBlocks() // resets the the mining rules to the default - overwrites existing state
- window.setBlocks([]:BlockType) // sets the block state from a list of blocks
- window.undoLastOperation // undo last operation
- window.redoLastOperation // not yet implemented
- window.clearBlocks() // clears blocks

### API - User Interface

See src/lib/components/route-home.svelte

- window.redraw() // syncs the ui state with the model

## Features

### Business Rules

These rules are subject to change on review;

1. By default mining is allowed from the two most recent blocks.
2. Concealing / disclosing has no effect aside changing the colour of the block.
3. Freezing / thawing a block overrides the default mining behaviour.

Clean separation between business and UI logic allows the commands to be driven by simple API commands.

### Undo / Redo

the tree can be grown and shrunk up to the last saved state by .

### Move Blocks

Blocks move horizontally. Children nodes follow the movement of parents but not the other way around. Vertical block movement is limited to small steps.
