# Chapter Chopping Approaches

**Goal:** Run `chop-book {book_name} {chapter_number}` in between `assemble-book` and `bake-book`.

The script removes all chapters except the one provided. Also, the replacement is done in-place so if a dev wants to change chapters they will need to re-run `assemble-book`.

# Approaches:

We looked at 4 different approaches and wrote code for each. Here are our results:

- Recipe: shortest and used existing tools/libraries people are familiar with
- Python: longer and required knowing XPath & etree which are common in other CE work
- XSLT: 1 liner, requires knowing XPath, used in CNXML->HTML conversion & is the publishing industry de-facto default tool for converting books into different formats
- JavaScript: used JSDom and took too long to chop a book

## Recipe

```css
[data-type="chapter"]:not(:nth-of-type(12)) { move-to: trash }
```

`easybake recipe.css data/{book}/collection.assembled.xhtml`


## JavaScript 0

```js
const chaptersToDelete = window.document.querySelectorAll('[data-type="chapter"]:not(:nth-of-type(12))')

chaptersToDelete.forEach(c => c.remove())
// for (const c of chaptersToDelete) {
//     c.remove()
// }
```


## JavaScript JSDOM

```js
const fs = require('fs')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

chapterNum = process.argv[1]

const fileContents = fs.readFileSync('data/{book}/collection.assembled.xhtml', 'utf8')

const dom = new JSDOM(fileContents);

dom.window.document.querySelectorAll('[data-type="chapter"]:not(:nth-of-type(12))')

chaptersToDelete.forEach(c => c.remove())

fs.writeFileSync('data/{book}/collection.assembled.xhtml', dom.window.document.outerHTML) // Gotcha . mayb need to find https://developer.mozilla.org/en-US/docs/Web/API/XMLSerializer in JSDom
```

`node thisfile.js data/{book}/collection.assembled.xhtml`


## Broken: JavaScript XML parser

We gave up on this in our pair-programming session because it took too long to find a good XML parser and learn how to use it.

```js
const fs = require('fs')
const parse = require("xml-parser");

chapterNum = process.argv[1]

const fileContents = fs.readFileSync('data/{book}/collection.assembled.xhtml', 'utf8')

const xml = parse(fileContents);

// no good way to select the Chapters
```


## Python

```python
from lxml import etree
from io import StringIO

with open('data/{book}/......', 'r') as myfile:
    fileContents=myfile.read()
    xml = etree.fromstring(fileContents)

    # https://github.com/openstax/cnx-cssselect2
    # CSS:                   [ data-type="chapter"]
    chapters = xml.xpath('//*[@data-type="chapter"]')

    i = 0
    for c in chapters:
        if i != 12:
            c.getparent().remove(c)
        i += 1

    print(etree.tostring(xml))
```

```
python thisfile.py 12 > temp.xml
mv temp.xml data/{book}......
```


## XSLT

XSLT is an XML replacement library. You select an element via the <template match="..."> and replace it with what is in the body of the template.

Because of this, you can write "remove chapters other than 12" in single line instead of 20 or more in python.

```xml
<xsl:template match="*[@data-type='chapter'][position()!=12]">
  <!-- replace the chapter with nothing -->
</xsl:template>
```

and command:

```sh
xsltproc --param chapterNumber 12 chop.xsl ./data/chemistry-2e/collection.assembled.xhtml > output.xhtml

mv output.xhtml ./data/chemistry-2e/collection.assembled.xhtml
```

Also, I think of the COVID-19 stuff we did (converting exercises to Google Docs) as a special baking process. If you're interested in how it was done, here's the source PR and README .

It was done using XSLT because I did not want to write a bunch of boilerplate code (JS/python) and could not figure out how to write easybake CSS (& debug it) in time.

