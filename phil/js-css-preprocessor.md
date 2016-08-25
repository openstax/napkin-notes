# Proposal: Use JavaScript as a CSS Preprocessor instead of LESS/SASS

This proposal is conceptually equivalent to JSX: have JS generate HTML instead of defining a JS-like syntax inside HTML (ie Handlebars) to handle conditionals, loops, and function-definition/calls.

# Background

LESS and SASS both make creating CSS easier.
They offer things like syntax highlighting, linting, and compile errors.
But it is a bit annoying to compose pieces together (ie `@include mixinName()`), internationalizing strings, and it is yet-another syntax to learn.


## LESS/SASS Shortcomings

- They require learning a "crippled" syntax for things like conditionals (`if ... then ... else ...`) and loops (` for .. in ...`) and introduce new syntax for primitives and data types (lists, maps, null).
- They also do not seem to support passing functions around which is useful for composing pieces together.
- no easy support for internationalizing strings (ie using http://l20n.org/)

Also, ask me about "Handlebars vs JSX" as an example of the same debate in generating HTML.

## This proposal's shortcomings

- There is no syntax highlighting of the CSS parts of the files (yet!)
- The compile errors do not point to the line in the JS source code where the error occurred; Instead, they point to the line in the CSS file
- **But**, both the JS _and_ the generated CSS can be linted


# Introduction

First off, some simple examples (which are used later in the doc) that introduces folks to the proposed syntax which uses some new ES6 features like shorter function declarations (`() => {...}` instead of `function() {...}`) and string interpolation (using backticks and `${...}`).

Also, this isn't terribly exciting because LESS & SASS do these things also.

```js
// This "mixin" generates a blue rule
doBlue = () => {
  return `
    color: blue;
  `
}

// This "mixin" generates a blue button
doButton = () => {
  return `
    .btn {
      ${doBlue()}
    }
  `
}

// This "mixin" takes in a selector and makes the 1st instance of it blue
doFirstBlue = (selector) => {
  return `
    ${selector}:first() {
      color: blue;
    }
  `
}
```


# Nested selectors Discussion

One feature JS is not able to handle by itself is nested selectors. Here are 2 examples which indicate the need for the JS output to still be fed into LESS/SASS (the syntax for nested selectors is the same so it could be fed to either).

This option generates simple CSS (does not require LESS/SASS) but cannot be nested:

```js
doModal1 = () => {
  return `
    .modal ${doButton()}
    .modal ${doFirstBlue('a.info')}
    .modal h1 { color: black; }
  `
}
```

This option requires LESS/SASS to process the output because of nesting:
```js
doModal2 = () => {
  return `
    .modal {
      ${doButton()}
      ${doFirstBlue('a.info')}
      h1 { color: black; }
    }
  `
}
```

Generated Output:

```css
.modal .btn { color: blue; }
.modal a:first() { color: blue; }
.modal h1 { color: black; }
```


# Converting from LESS/SASS to JS

An example LESS file and the corresponding JS equivalent

The LESS example (for comparison):

```less
// From https://github.com/twbs/bootstrap/issues/1958
.clearfix() {
  *zoom: 1;
  &:before,
  &:after {
    display: table;
    content: "";
  }
  &:after {
    clear: both;
  }
}
```

And the JS version:

```js
clearfix = () => {
  return `
    *zoom: 1;
    &:before,
    &:after {
      display: table;
      content: "";
    }
    &:after {
      clear: both;
    }
  `
}
```

**Note:** This JS version still relies on LESS/SASS to fix up the nested selectors.


# New Feature (not available in SASS or LESS)

Passing in functions as arguments.
Sometimes you need to reuse part of the code but not all of it.
In that case, you can pass a function in as an argument.

```js
doButton2 = (colorFn) => {
  return `
    .btn {
      ${colorFn()}
    }
  `
}
//and then this is called with something like:
doButton2(doBlue);
```

Generated Output:

```css
.btn { color: blue; }
```


# Conditionals and Loops

SASS has "crippled" support for loops and conditionals (and you have to learn their syntax) while you can do anything in JS without having to learn a new syntax.

## Conditionals Example

```js
doFigure = (hasClearfix) {
  str = ''
  if (hasClearfix) {
    str = clearFix()
  }
  return `
    figure {
      color: green;
      ${str}
    }
  `
}
doFigure(false)
```

And the generated output:

```css
figure { color: green; }
```


## Loops Example

Here's an example of looping using a number:

```js
doWidthBreakPoints = (total) {
  str = [];
  for (i=1; i <= total; i++) {
    str.push(`
      col:nth-of-type(${i}) {
        width: ${Math.round(1/total * 100)}%;
      }
    `)
  }
}
doWidthBreakPoints(3)
```

And the generated output:

```css
col:nth-of-type(1) { width: 33%; }
col:nth-of-type(2) { width: 33%; }
col:nth-of-type(3) { width: 33%; }
```

Here's an example of looping over a list of objects:

```js
COLOR_BADGES = [
  {name: 'info', color: 'blue'},
  {name: 'danger', color: 'red'},
  {name: 'warning', color: 'yellow'}
}

doBadges(badges) {
  return `
    .badge {
      ${badges.map(doBadge).join('')}
    }
  `
}

doBadge({name, color) {
  return `
    &.${name} { color: ${color}; }
  `
}
// Example of calling this mixin:
doBadges(COLOR_BADGES);
```

And generated output:

```css
.badge.info    { background-color: blue; }
.badge.danger  { background-color: red; }
.badge.warning { background-color: yellow; }
```


Here's a more complicated example of looping over objects:

```js
// This would be defined in another file
CHAPTER_SELECTOR = '.chapter'

doCollations(thingsToCollate) {
  return thingsToCollate.map(doSingleCollation).join('')
}
// This generates the CSS code to collate elements to the end of a chapter/book
// and adds a title for that collated area
doSingleCollation({title, selector, isCollatedToChapter}, index) {
  bucketName = `bucket-${index}`
  dumpSite = isCollatedToChapter ? CHAPTER_SELECTOR : 'body';
  return `
    // Move the element into a bucket
    ${selector} { move-to: ${bucketName}; }

    // generate a new element with the proper title, and dump the bucket
    ${dumpSite}::after(${index}) {
      &::before { content: "${title}"; }
      content: pending(${bucketName});
    }
  `
}
// Example of calling this mixin:
doCollations([
  {title: 'Homework', selector: 'exercise.homework', isCollatedToChapter: true},
  {title: 'Answers', selector: 'solution', isCollatedToChapter: false}
]);
```

And generated output:

```css
exercise.homework { move-to: bucket-0; }
.chapter::after(0)::before { content: 'Homework'; }
.chapter::after(0)         { content: pending(bucket-0); }
solution { move-to: bucket-1; }
.chapter::after(1)::before { content: 'Answers'; }
.chapter::after(1)         { content: pending(bucket-1); }
```
