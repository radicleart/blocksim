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

- H - Highlight ancestors and descendant's - click once to highlight click twice to reset - changes block colour to purple.
- T/F click to toggle Freeze/Thaw block - mining is prevented when block is frozen - changes block colour to light blue / cyan.
- C/D click to toggle Concealed/Disclosed - changes the colour of the block to white background, does not change mining rules etc atm.

## API - Business Model

See src/lib/blocks.ts

- window.mineBlock(id) // mines a new node from the given parent or throws error
- window.freezeBlock(id) // freezes the given block or throws error
- window.thawBlock (id) // thaws the given block or throws error
- window.concealBlock (id) // conceals the given block or throws error
- window.discloseBlock(id) // discloses the given block or throws error
- window.setMinableBlocks() // resets the the mining rules to the default - overwrites existing state
- window.setBlocks([]:BlockType) // sets the block state
- window.undoLastOperation // undo last operation
- window.clearBlocks() // clears blocks

## API UI

See src/lib/components/route-home.svelte

- window.redraw() // syncs the ui state with the model

## Notes

1. Default mining state - can only mine from two most recent blocks.
2. Cleaner separation between business and UI logic
3. TODO undo/redo feature.
