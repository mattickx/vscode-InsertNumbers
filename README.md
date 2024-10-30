# README

## Forked from:
* [GitHub](https://github.com/Inori/vscode-InsertNumbers/)

I've added the functionallity that the string format is optional as input
I've added the functionallity that the order of string format can be optional, or as last paramater
See ([Usage](#usage)).-

## Insert Numbers for Visual Studio Code
An extension to insert increasing numbers.

## Usage
* Command: `Insert Numbers`

* Keybindings: `ctrl+alt+n` on Windows and Linux or `cmd+alt+n` on OSX
    
* Usage of the `InputBox` when you toggle insert:
  - `<start number>` (using default setting for step amount and string format)
  - `<start number>:<step amount>` (using default setting for string format)
  - `<start number>:<step amount>:<string format>`
  - `<string format (with %)>:<start number>:<step amount>` (Limited to format with % sign, the integer format (prefix) is not allowed in this input)

## Control string format
The format of the inserted numbers is controlled by a C-Style format string using in a sprintf function.

There are two ways to change the default format string.
* You can change your `settings.json` file to modify the default value:
    ![settings](images/settings.png)

* The format string can be a single string like :
  `%d`: inserts the number only (default)
  `%02d` or `%08d` etc.
* The format string can be filled in as a integer like like `8` which will transform it to `%08d`for easy prefixing

### Note
* Do not input more than one type specifier in a format string. If you want to input more than one number, you can do it another time.
* Do not input `:` in format string.
* If filling in a format string, the format string should include a `%`.


## Thanks
* [sprintf.js](https://github.com/alexei/sprintf.js)

*Enjoy!*
