# express-mongo-bootstrap

How to use express-mongo-bootstrap with WebStorm

1. Preferences -> Languages & Frameworks -> Node.js and NPM -> Enable Node.js Core Library
2. Run -> Edit Configuration -> Defaults -> Mocha
    1. Environment variable: NODE_ENV=test
    2. Mocha package: [project_directory]/mode_modules/mocha
    3. User Interface: bdd
    4. Test file patterns -> File patters: *.test.js
    5. Before launch: npm script -> Run npm script 'seeddb'
