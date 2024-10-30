# VSCode - Insert Numbers
<p align="center">
  <img src="images/icon.png" />
</p>

## 🔀 Fork:
Forked from [Inori/vscode-InsertNumbers](https://github.com/Inori/vscode-InsertNumbers/)

See ([Changelog](./CHANGELOG.md)) for all changes since fork.

## ℹ️ Description
An extension to insert increasing numbers.

# ⚙️ Usage
* Command: `Insert Numbers`

* Keybindings: `ctrl+alt+n` on Windows and Linux or `cmd+alt+n` on OSX
    
* Usage of the `InputBox` when you toggle insert:
  - `<start number>` (using default setting for step amount and string format)
  - `<start number>:<step amount>` (using default setting for string format)
  - `<start number>:<step amount>:<string format>`
  - `<string format (with %)>:<start number>:<step amount>` (Limited to format with % sign, the integer format (prefix) is not allowed in this input)

# 🔧 Settings

You can change your `settings.json` file to modify the default value:

![settings](images/settings.png)

## Control string format
The format of the inserted numbers is controlled by a C-Style format string using in a sprintf function.


### There are two ways to change the default format string.
  * The format string can be a single string like :
    `%d`: inserts the number only (default)
    `%02d` or `%08d` etc.
  * The format string can be filled in as a integer like like `8` which will transform it to `%08d`for easy prefixing


# 📋 Note
* Do not input more than one type specifier in a format string. If you want to input more than one number, you can do it another time.
* Do not input `:` in format string.
* If filling in a format string, the format string should include a `%`.


# 🤝 Contribute
Continuous improvement is encouraged and your contributions are valuable!

If you identify areas for improvement, have suggestions or encounter issues, please create a GitHub issue and/or a Github pull request.


# 🙏 Special thanks
* [sprintf.js](https://github.com/alexei/sprintf.js)
