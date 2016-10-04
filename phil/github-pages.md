# Options for generating a Styleguide using GitHub Pages

These are sorted by easiest to hardest.


# Option 1: HTML Directly

Host HTML, CSS, & JavaScript files

1. create a branch named `gh-pages` in a repository and put your files in there
2. go to `https://{USERNAME}.github.io/{REPOSITORY_NAME}`

**Example:** http://philschatz.com/css-polyfills.js/ and source: https://github.com/philschatz/css-polyfills.js/blob/gh-pages/index.html


### Benefits

- Super-simple (if you know how to use git to make any changes)

### Drawbacks

- need to use git to make any changes
- seeing what changed is difficult because you have to parse HTML in your head
- does not allow for things like a common navbar


# Option 2: Templates and Markdown

Auto-generate the HTML files from Markdown and ruby-ish Templates using Jekyll

GitHub can automatically generate HTML files using templates by adding some special files to the `gh-pages` branch (using http://jekyllrb.com). With this, you can edit the files without knowing git (you can upload screenshots by just dragging the files & dropping into github.com in the browser).

### Benefits

- You can edit these pages using the GitHub website and don't need to know about Git directly.
- Common things like the navbar are 
- Can drop screenshots directly into GitHub by dragging
- You can start jekyll up locally to see changes before you submit them

### Drawbacks

- You need to learn MarkDown
- A Programmer will need to create the initial navigation code (ie the sidebar)
- You are limited to Jekyll's templating which might not be robust enough for our uses


## Option 2a: Markdown

Example: Anatomy & Physiology Book

[Example Page in book](http://philschatz.com/anatomy-book/contents/m45989.html) and [Source]( https://github.com/philschatz/anatomy-book/blob/gh-pages/contents/m45989.md)

Why use Markdown instead of HTML? You can more-easily see the changes:

- [Example A&P change](https://github.com/philschatz/anatomy-book/commit/554458993b319bf1191a35725cf0d5e7e6140800)
- [A rich diff of the changes](https://github.com/philschatz/anatomy-book/commit/554458993b319bf1191a35725cf0d5e7e6140800?short_path=84520b1#diff-84520b12cc96634b77ad9b7ea179c860)


## Option 2b: Templates

http://philschatz.com

- The special file that starts up Jekyll: [/_config.yml](https://github.com/philschatz/philschatz.github.io/blob/master/_config.yml)
- The sidebar for all pages: [/includes/sidebar.html](https://github.com/philschatz/philschatz.github.io/blob/master/_includes/sidebar.html)
- The layout for blog posts: [/_layouts/page.html](https://github.com/philschatz/philschatz.github.io/blob/master/_layouts/page.html) (which uses the [/_layouts/default.html](https://github.com/philschatz/philschatz.github.io/blob/master/_layouts/default.html) in the 1st line)
  - It's not magic, see the `layout: post` at the top of [/_posts/2014-07-07-tiny-book-reader.md](https://github.com/philschatz/philschatz.github.io/blob/master/_posts/2014-07-07-tiny-book-reader.md)


# Option 3: custom build script

Sites like bootstrap have a custom build script because they generate the docs from specially-formatted comments in the source code.

### Benefits

- You can generate documentation from the source code so it stays in-sync

### Drawbacks

- You have to use git locally
- You have to run a script locally to regenerate the documentation
- Seeing changes are a bit more difficult since the HTML is disconnected from the source
