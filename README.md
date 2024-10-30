# README

## Forked from:
* [GitHub](https://github.com/Inori/vscode-InsertNumbers/)

## Insert Numbers for Visual Studio Code
An extension to insert increasing numbers.

![default behavior](images/default.gif)

## Usage
* Command: `Insert Numbers`
* Keybindings: `ctrl+alt+n` on Windows and Linux or `cmd+alt+n` on OSX

## Control format
The format of the inserted numbers is controlled by a C-Style format string using in a sprintf function.

There are two ways to change the default format string.
* You can change your `settings.json` file to modify the default value:
    ![settings](images/settings.png)

* The format string can be a single string like :
  `%d`: inserts the number only (default)
  `%02d` or `%08d` etc.

### Note
* Do not input more than one type specifier in a format string. If you want to input more than one number, you can do it another time.
* Do not input `:` in format string.
* If filling in a format string, the format string should include a `%`.

## Thanks
* [sprintf.js](https://github.com/alexei/sprintf.js)

*Enjoy!*
