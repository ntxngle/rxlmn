# RXLMN
RXLMN is a professional contact relationship manager designed specifically to be over-the-top fast, flexible, and most importantly, reliable.

It derives its speed from using an indexed database, which can return hundreds of results in miliseconds. Additionally, its search operation builder allows users to create complex queries with ease.

True flexiblity can only be achived if the user can modify data structures to their will and not forced to a specific template. Naturally, RXLMN implements this by allowing users to edit the ENTIRE schema of their data.

Critically, the app can function in any enviroment; online, offline, or slow connection. This means regardless of connection, RXLMN continues to function exactly like normal, and will upload your changes as soon as it goes back online.

## Running
Download the latest release from the [releases](https://github.com/ntxngle/rxlmn/releases) page.

Now you have 2 options in order of ease:

### Pre built binaries
Extract the zip file and go to the `bin` folder. Double click CLICKME.bat and a terminal should start. Now navigate to "localhost:3000" in a browser.

### Nodejs
Install nodejs from [here](https://nodejs.org/dist/v18.12.0/node-v18.12.0-x64.msi). Make sure (when prompted in the installer) to install NPM as well. Follow instructions and install. Now extract the zip file and go to the server folder. Double click STARTSERVER.bat and wait for it to finish. Now navigate to "localhost:3000" in a browser.


## At a glance
- Nearly 2K lines of code
- 100% offline functionality
- 100% online functionality
- Cross-platform
- Open source

## Dependencies
- [AceBase](https://github.com/appy-one/acebase)

## Building
Node 18 is tested, all other versions are not.

```bash
npx pkg ./
```
It will generate executables for linux, win64, and macos.

