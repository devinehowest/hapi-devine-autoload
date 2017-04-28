# hapi-devine-autoload

## Description

🔧  This Hapi loads plugins from a folder and/or a given array and configures them

**files or folders starting with a _ are ignored**

## Install hapi-devine-autoload

```bash
yarn add hapi-devine-autoload
```

## Usage

register this module as a plugin in Hapi

```js

server.register({

  register: require(`hapi-devine-autoload`),

  options: {

    path: path.join(__dirname, `plugins`) // plugins directory

    plugins: [
      require(`inert`)
    ] // array with 3rd party plugins to be loaded

    log: true, // provide logs (optional, default: true)

    pluginOptions: {
      inert: {
        // inert options
      }
    }

  }

}, pluginHandler);

```

hapi-devine-autoload loads all plugins in the given folder and/or array and loads the options from pluginOptions

in this example module1 (index.js) and module2 are loaded

```bash

/module1
  /index.js
module2.js
_module3.js

```

## License

MIT
