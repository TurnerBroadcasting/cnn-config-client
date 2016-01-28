# CNN Server Configuration Client


**Contents**

- [Documentation](#documentation)
- [Local development](#local-development)
  - [Requirements](#requirements)
  - [Local install](#local-install)
  - [How to start it up](#how-to-start-it-up)
  - [Environment variables](#environment-variables)
- [Generate local docs](#generate-local-docs)
- [Contributing](#contributing)
- [Project Owner](#project-owner)
- [Current Project Team Members](#current-project-team-members)



## Documentation

- ESDoc documentation can be generated.  See below for details.


## Local development


### Requirements


##### [nvm][nvm] - a reasonably current version

`nvm` will be used to manage the node versions installed on your
localhost.


##### [node](https://nodejs.org) - The version specified by `.nvmrc` and `package.json`

You should install this with [nvm][nvm]. Make sure you are in the root of the
project directory and do the following.  There is a `.nvmrc` file that tells
`nvm` what version to install and use.  The first `nvm install` command is only
needed the first time you try to use a version that has not been installed on
your system yet.

```shell
$ nvm install

$ node --version
v5.5.0
```


### Local install

Clone this repository, install the above requirements, then:

```shell
$ cd cnn-config-client
$ nvm use
$ npm install
```


### How to test

Run the following. 

```shell
$ npm test
```

### Example

```
const client = require('../index.js'),
    data = {
        product: 'test',
        environment: 'dev',
        token: '9b796e238d750e4947e93366a7f3ef96ce115ac0'
    };

client.getConfig(data);
```

```
{"name": 1234}
```

## Generate Local Docs

```shell
$ npm run generate-docs
$ open docs/index.html
```


## Contributing

If you would like to contribute, just fork and submit a pull request.  Please
review the [contributing guidelines](./CONTRIBUTING.md) first.


## Project Owner

A.D. Slaton <ad.slaton@turner.com) (@adsdlaton) is the current Project Owner
of this repository.  The project owner is responsible for the implementation of
this project.


## Current Project Team Members

This is a list of people directly responsible for the implementation of this
project.  For more information about the governance of this project, see
[GOVERNANCE.md](./GOVERNANCE.md).

- A.D. Slaton <ad.slaton@turner.com) (@adsdlaton) - Applications Architect

Collaborators follow the [COLLABORATOR_GUIDE.md](./COLLABORATOR_GUIDE.md) in
maintaining this project.




[nvm]: https://github.com/creationix/nvm
