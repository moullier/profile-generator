# Developer Profile Generator

## Description

This is a command line application that generates a PDF file profile for the user.  It prompts the user for their GitHub username, and the color that they prefer from a list of color schemes.  The application outputs a PDF that displays the user's picture, name, location and some basic GitHub information.

## Technology Used

The program is a Node.js application.  I used Inquirer.js 7.0.3 to manage command line input from the user.

To access the GitHub data, I made two API calls to the GitHub API.  Axios let me handle these asynchronous GET requests in my application in a similar way to how I used JQuery in previous web applications.

Then I built an HTML page using the CSS that was provided and the data from GitHub, and used electron-html-to to convert that HTML to a PDF.  This required me to install electron in order to use the converter.

## Resources

https://www.sitepoint.com/understanding-module-exports-exports-node-js/ - Information about exporting variables and functions from one javascript file to another.

https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback - Documentation on using fs.writeFile to write a file.

https://fontawesome.com/how-to-use/on-the-web/referencing-icons/basic-use - Documentation on how to use Font Awesome to include icons on the page/PDF file.

https://www.npmjs.com/package/electron-html-to - Documentation about how to use electron-html-to to convert HTML files to PDFs.

https://github.com/bjrmatos/electron-html-to/issues/459 - Issue page for a bug I encountered using electron-html-to, which includes a workaround that worked for me (downgrading my version of electron).

## License

[MIT](https://choosealicense.com/licenses/mit/)