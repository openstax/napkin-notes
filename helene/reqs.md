# Global Requirements
This document's aim is to identify needs and requirements from all the Openstax products that are using a common html file and common CSS styling

### General needs

As a **student/instructor** I want the different formats (webview, epub, pdf, tutor) to be similar enough to do my homework and reading assignments easily.

As **Openstax** I want the styling to be similar so there is brand identity and a consistent "look and feel" within the constraints of the various digital formats.

As a **developer** I want the code to be easily approachable and efficiently accessed/modified by all teams so I can make changes faster.

# Product Specific

## PDF styles/framework

### Maintenance

As a **developer** I want the code to scale to multiple books so adding a new book is simple.

As a **developer** I want to easily refactor the code so it can evolve over time (need refactor usecases).

As a **developer** I want code consistency by other developers so the code is easier to understand.

As a **developer** I want future development (new features, refactor, new designs) to be easy to maintain.

As a **developer** I want changes in data structure to be relatively easy so that we can add formats or features easily.

As a **developer** I want the code to be well documented and organized so bug fixing is easier.

As *OpenStax* I want to make sure people cannot create infinite loops
  - _(CSS by itself is NOT turing complete)_
  - _(something about running untrusted code and whatnot)_


### Ease of use

As a **developer** I want a clear file structure and logic pathways to reduce time wasted figuring out what does what and what is where.
```less
// /mixins/** contains files that do not output anything when imported
// /templates/** contains files that will output selectors when imported.
//            If these files use variables, then the variable definitions must be imported beforehand
//            (TODO: is this a good policy?)
//            These files usually define the numbering & collation schemes for an entire book.


// Example file structure for a book:
// File bookname.less
@import '~/mixins/all';    // mixins should not use globals (aka "pure" functions)
@import '~/variables/all'; // do this after to ensure the mixins do not depend on variables being defined

// define variables for this book
@PRACTICE_PROBLEM: 'practice-problem';

// if using a "simple" template then import it here
@import '~/templates/simple-book';

// call any mixins that are necessary to customize this book (like numbering/collation)
.book-collate(@where: chapter; @className: @PRACTICE_PROBLEM);
```

As a **developer** I want easy access to PDF-specific needs (pagination/folio) so testing is quicker.

As a **tester** I want minimal regression-testing so code-changes do not impact more books than necessary.

### Fast creation

As a **developer** I want code to not be duplicated so there is less code to support.

As a **developer** I want code to be reusable/modular so creating/updating templates is easier.

As a **developer** I want to add new features easily because that is where the majority of my time is spent.


# General philosophy/concepts

## For cleaner/better code
  - never override an CSS declaration
  - keep our mixins simple, you shouldn't need a map and two days to find where that mixin was created
  - from general to specific, keeping it as generic as possible

## For an ideal slots/skeleton framework
  - we add, we never remove (avoid regression testing)
  - the framework is versioned, as with an API
  - developers should never have to look at the skeleton

---

# Phil's Stories

# CSS Stories

As a **new Developer** I want to...

1. know how to make my first contribution so I can contribute quickly


As a **Developer** I want to...

1. change files and run tests easily so I am confident I didn't break anything with my change
  - _(naive styling test: pixel-compare each PDF (just needs to verify nothing changed) )_
  - _(naive collation test: generate the HTML & diff)_
1. take an existing book and quickly add a new "feature"
```less
// File oldbook.less

// File newbook.less
@import './oldbook';
.book-chapter-collation(@where: chapter; @className: 'review-problems'; @resetNumbering: true);
```
1. take an existing book and change some collation to make a new book
1. quickly make a new book from scratch
```less
// File philosopy.less
@import '~/numbering/2-level-by-type.less'; // generates `Figure 4.1`, `Table 4.1`, `Figure 4.2`
@import '~/collate/end-of-book-solutions.less';
@import '~/collate/exercises-with-collate-attribute.less'; // cnxml has an attribute on exercises that defines collation
```
1. generate HTML from parts of books or entire books (with caching a-la-makefile) easily from the commandline
```sh
# Install all dependencies (from http://githubengineering.com/scripts-to-rule-them-all/ and http://githubengineering.com/runnable-documentation/)
./scripts/bootstrap

# Generate a book
# Output is a single-file or a bunch of HTML files depending on additional commandline arg.
# This could call `wget -m` to automagically download all the necessary source files.
./scripts/generate https://archive.cnx.org/{UUID}

# Generate a local book or a page
./scripts/generate --style-file ./path/to/file.css ./path/to/file.html
# use stdin instead of a file
cat ./path/to/file.html | ./scripts/generate --style-file ./path/to/file.css -
```
1. have "unit tests" for the CSS files so I don't have to generate the whole book
  - _(also acts as "runnable documentation")_
```sh
# tests/{FOO}/in.css, matching tests/{FOO}/in.html and matching tests/{FOO}/out.html and tests/{FOO}/*.html
# where `*` could be page UUIDs for testing things like collation.
./scripts/test {OPTIONAL_DIRECTORIES_TO_RUN}
```
1. have a validation structure that I can rely on to prevent me from producing/committing unusable code
 - _(ruleset validation against cnx-epub  publishing)_
1. maintain as little documentation as possible because keeping documentation in sync is error-prone
  - _(including scripts to generate the HTML, installing dependencies, etc. (ie [Runnable Documentation](http://githubengineering.com/runnable-documentation/)) )_
```sh
# See above code examples for generating HTML, installing dependencies, etc)
# See links at the end of this file for some (not all) CSS Documentation-generation tools
```
1. associate the CSS files for books with the code somewhere in GitHub and keep them in sync
  - _(:cake: commit hooks which republish?)_
1. an option to add debugging information to the output to see where things came from
  - _(:cake: including sourcemap into the CSS file maybe :smile:)_
```sh
# File in.css:
.book-collation(@where: book; @className: 'review-problem');

# File in.html:
<body>
  <section data-type='chapter'>
    <div id='id123' class='review-problem'>Hello</div>
  </section>
</body>

# Command to run:
./scripts/generate --debug --style-file in.css in.html

# Expected Output:
<body>
  <section data-type='chapter'>
    <!-- moved '#id123.review-problem' from here because of in.css line 23 -->
  </section>
  <!-- autogenerated collation element because of in.css line 25 -->
  <div class='-autogenerated-review-problem'>
    <!-- moved to here because of in.css line 23 -->
    <div id='id123' class='review-problem'>Hello</div>
  </div>
</body>
```
1. have the passes to be abstracted away because most of those will not change frequently
1. write simple CSS as long as I know what the mixins are and create few (if any) of my own mixins.
  - (:thought_balloon: The analysis done by kerwin+derek(?) should contain all the mixins)
```less
// File mixins/collation.less:
.book-collation(chapter; @className; @resetNumbering) {
  // TODO: do something in here
}

// File books/physics.less
@import '../mixins/collation';
.book-collation(@where: chapter; @className: 'review-problem'; @resetNumbering: true);
.book-collation(@where: chapter; @className: 'homework-problem'; @resetNumbering: true);
```

As an **External user** I want to...

1. easily tweak the default numbering/collation for my book because I may want to refer to things differently
```less
// Maybe have 3 numbering options to choose from:
// - `~/numbering/2-level-by-type.less` - Example: Figure 4.1, Table 4.1, Figure 4.2 (most books)
// - `~/numbering/2-level-by-chapter.less` - Example: Figure 4.1, Table 4.2, Figure 4.3
// - `~/numbering/3-level-by-chapter.less` - Example: Figure 4.1.1, Table 4.1.2, Figure 4.1.3 (numbering contains the chapter, section, and then unique-number)
```

As a **Translator** I want to...

1. easily change strings and numbering because languages have different conventions
```less
// All strings should be defined in a strings.less/scss file
import '~/strings/all';
@FIGURE_NAME_EN: 'Figure';
// Selectors that add labels should always have the language defined on them
[xml:lang='en'] figure::before { content: @FIGURE_NAME_EN ' ' counter(chapter) '.' counter(figure); }
[xml:lang='pl'] figure::before { content: @FIGURE_NAME_PL ' ' counter(chapter) ',' counter(figure); }

// TODO: It seems like we need more thought on how to organize this so books do not have duplicated CSS selectors that are unused.
```
1. easily change LTR to RTL


As **openstax** I want to...

1. have strings & numbering to work in multiple languages because a lot of the content is not in english
```less
// File physics.less
@LANGUAGES: en, pl;  // define the languages supported


// file doStuff.less . TODO: Spike out an example of how this would work
.doStuff(@LANGUAGES) {
  // Loop over each language (stored in the LANG variable)
  [xml:lang=@{LANG] {
    @import '~/strings/@{LANG}';  // global strings like "Figure" or "Table" or the NUMBER_SEPARATOR (like `.` or `,`)
    @import './strings/@{LANG}'; // allow book-specific strings so they can be translated
    @import '~/all-the-other-files'; // This way the selectors in those files are scoped to a specific language
    // Note: This could impact the design of other files if they need to be automatically scoped inside the lang attribute
  }
}
```
1. have a default numbering/collation for non-openstax books
  - _(maybe also affects the cnxml2html conversion for things like exercises (they'll need to not lose some metadata))_
```less
// Maybe have 3 numbering options to choose from:
// - `numbering/2-level-by-type.less` - Example: Figure 4.1, Table 4.1, Figure 4.2 (most books)
// - `numbering/2-level-by-chapter.less` - Example: Figure 4.1, Table 4.2, Figure 4.3
// - `numbering/3-level-by-chapter.less` - Example: Figure 4.1.1, Table 4.1.2, Figure 4.1.3 (numbering contains the chapter, section, and then unique-number)
// All strategies provide a mixin named .numbering(@before; @after; @counterName);
//     TODO: see how that works with subfigures, end-of-chapter/book items

// Default collation just moves all exercises to end of chapter
[data-type='exercise] { move-to: end-of-chapter; }
.chapter::after {
  &::before { content: 'Exercises' }
  pending: end-of-chapter;
  // Apply numbering to the exercises that were moved somehow (I don't know what the current syntax is)
  // TODO: figure out i18n for stuff like this
  [data-type='exercise']::before {
    .numbering(@before: @EXERCISE_NAME; @counterName: end-of-chapter-exercise);
    // which makes: content: @EXERCISE_NAME ' ' counter(chapter) @NUMBER_SEPARATOR counter(end-of-chapter-exercise);
  }
}
```

# HTML Stories

- As an **External user** I want the cooked HTML format to "look reasonable" without having CSS because my LMS may not support custom CSS
- As **openstax** I want to have an editable raw format that does not contain human-repeated text or non-structural elements because keeping them in-sync is difficult


# Documentation-generation Links

1. http://list.ly/list/IkE-auto-generate-css-reference-documentation suggestions for generating documentation
1. http://primercss.io/ and https://github.com/primer/primer
 1. Actual example: http://primercss.io/buttons/ and https://github.com/primer/buttons (not suggesting separate repos but am suggesting some doc-generation)
1. https://github.com/primer/stylelint-config-primer
1. http://warpspire.com/kss/styleguides/ "Living" documentation
1. https://github.com/ericponto/jekyll-dss
1. http://sassdoc.com/
1. https://inch-ci.org/github/sass/sass (CI for documentation)


#Technical considerations
As a **developer**
 - I need a css tool that can be used for complex templates, including packaging and organizing my rules.

## Less vs Sass
###Overriding mixins
**LESS*** (scoping is weird)
  ```less
  //LIBRARY
  #lib {
    //Overridable function
    .doThings(@color) {
      //set variable to code block based on variables
      @doThings: {
        color: @color;
      };
    }

    .doStuff() {
      //Call any mixin that's listening
      .doStuffListener();
      //Strangely the listener MUST be before the actual mixin call to do anything?
      .doThings(blue);
      //Call the variable set to the code block that the mixins created
      @doThings();
    }
    //Empty listener here causes everything to be blue?
  }

  //BOOK
  p {
    #lib.doStuff();
    //Make a listener
    .doStuffListener {
      //Override a mixin
      #lib.doThings(red);
    }
  }
  div {
    #lib.doStuff();

    //Make an empty listener for a default call, will crash if not created?
    .doStuffListener() {}
  }
  ```
  **CSS Output:**
  ```css
  p {
    color: red;
  }
  p {
    color: blue;
  }
  ```
**SASS**
  ```scss
  @mixin mixin() {
    @include called();
  }
  @mixin called() {
    color: blue;
  }

  p {
    @include mixin();
  }

  @mixin called() {
    color: red;
  }

  p {
    @include mixin();
  }

  @mixin called() {
    color: green;
  }
 p {
    @include mixin();
  }
  ```
  **CSS Output:** 
  ```css
  p {
    color: blue; }
  
  p {
    color: red; }
  
  p {
    color: green; }
  ```
###Control Structures
**Less** (Recursive loops and mixin, namespace guards)
  ```less
  .title(@bucket, @content...) when (@option = 1) {
    @contentLength: length(@content);
    @i: 1;
    .assignContent(@i);
  }

  .title(@bucket, @container, @containerClass, @content...) when (@option = 2) {
    @contentLength: length(@content);
    @i: 1;
    .assignContent(@i);
    &::before {
      container: @container;
      class: @containerClass;
      content: pending(@bucket);
    }
  }

  .title(@bucket, @container, @containerClass, @containerDestination, @content...) when (@option = 3) {
    @contentLength: length(@content);
    @i: 1;
    .assignContent(@i);
    &::before {
      container: @container;
      class: @containerClass;
      content: pending(@bucket);
      move-to: @containerDestination;
    }
  }

  .assignContent(@i) when (@i <= @contentLength) {
    &::before {
      container: span;
      class: extract(extract(@content, @i), 1);
      content: extract(extract(@content, @i), 2);
      move-to: @bucket;
    }
    .assignContent(@i + 1);
  }
  .assignContent(@i) when (@i > @contentLength) {}
  ```
**SASS** (Nested if, for, each statements)
  ```scss
  @mixin title($content, $bucket, $container: null, $containerClass: null, $containerDestination: null) {
    @each $itemContent, $itemClass in $content {
      &::before {
        container: span;
        content: $itemContent;
        class: "title-#{$itemClass}";
        move-to: $bucket;
      }
    }
    @if ($container != null and $containerType != null) {
      &::before {
        container: $container;
        class: $containerClass;
        content: pending($bucket);
        @if ($destination != null) {
          move-to: $containerDestination;
        }
      }
    }
  }
  ```
- Namespaces
  - Less has #-prefixed namespaces, Example:
  ```less
  //Call
  #namespace.mixin();
  //Namespace
  #namespace {
    @var: 5px;
    .mixin(){}
  }
  ```
  - Sass doesn't have the same functionality, but the same effect can be achieved through simply dash separating mixin names, Example:
  ```scss
  //Call
  @include namespace-mixin();
  //Namespace
  $namespace-var: 5px;
  @mixin namespace-mixin() {}
  ```
- Variable interpolation
  - Less can interpolate a variable name as well as property/attribute names
  ```less
  @border-basic: 1px solid black;
  @border-thick: 3px solid black;
  @border-dashed: 1px dashed black;
  @border-fancy: 2px dashed red;
  
  .border-type(@type) {
    @var: "border-@{type}";
    border: @@var;
  }
  ```
  - Sass cannot interpolate variable names, but can interpolate property/atrribute names
  - Neither Sass nor Less can use variable interpolation to dynamically name and declare a variable
- Pattern matching
  - Less mixins support pattern matching
  ```less
  .mixin(@var, something, otherthing);
  //Calls
  .mixin(@var, something, otherthing) {}
  ```
  - Sass can use nested if controls to achieve the same effect
  ```scss
  @include .mixin($var, $var2, $var3);
  //Calls
  @mixin mixin($var, $var2, $var3) {
    @if ($var2 == something and $var3 == otherthing) {}
  }
  ```
- Functions
  - Less can execute embedded javascript
  ```less
  @color: `function() {
    return("red");
  }()` ;
  p {
    color: @color; //color: "red";
  }
  ```
  - Functions with returns can be created within Sass
  ```scss
  @function color() {
    @return red;
  }
  p {
    color: color(); //color: red;
  }
  ```
- Data Structures
  - Less has a list data structure, which has length(@list), extract(@list) etc.
  - Sass has a list data structure, with similar functions, but more can be written because of sass's @function feature
  - Both can simulate maps with key, value associations, but sass comes with map functions built in
