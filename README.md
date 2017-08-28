# Why do this?

Ok, [initializr.com](http://www.initializr.com/) is pretty awesome, but it's lacking an option to have a build process and use things like Sass and Auto-prefixer. So, this is my quick answer to that problem.

### Bower support
Sure, this isn't exactly how you use Bower, but if you want the sandbox, simply use Bower in any Dir to get the guts of this without all the Git history.

```
$ bower install html5-boilerplate-sass-gulp
```

### Gulp API

Default task is `$ gulp`, which will run all the following commands. Or, you can use them individually as needed.

```
$ gulp build:css // only processes Sass to CSS once

$ gulp sass:watch // run Sass watcher for updated files

$ gulp serve // starts browser-sync server

$ gulp build:dist // moves processed files from src/ to dist/
```

### browserSync support
It's there. Simply run `$ gulp` from the CLI and you will get all the things you need to get started. Server, watcher, browserSync. All the things!!!

##### The package I WISH we would get from initializr
