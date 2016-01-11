Common Textbook Experience - Rulesets
Spike CSS as appropriate language for implementing python-based content collation and numbering

Found 3 applicable libraries: tinycss, cssutils, cssselect (yes, 3 esses)

used example less(css) from https://github.com/philschatz/book-collation/blob/master/rulesets/template.less

Note that Phil`s thoughts in that repo include a variant markup language
that is not actually HTML. The custom tag names sound very much like CNXML
to me (PHIL: I did it for brevity :smile:). They do have the advantage of making the rules much clearer: i.e.

```less
Book {
    Chapter {
        Exercise.homework {
        move-to: rs-123;
        }
    }
}
```

Rather than:

```less
div[data-type="book"] div[data-type="chapter"] div[data-type="exercise"].homework {
  move-to: rs-123;
}
```

Steps involved:

convert via lessc to css

some sort of CSS macro expansion (Book -> div[data=type="book"] etc.)

(or vice versa, depends on details of macro exp. and parsing)

parse via tinycss

extract selector, parse w/ cssslect, convert to xpath for applicatio to DOM

Two types of rules:
    collation (moving/copying content)
    numbering

Collation must precede numbering, since in some cases, numbering happens in
sequence in the post-collated document (out of order for original source - i.e.
diff types of exercises all numbered sequentially at chapter end)

collation can be done in a single pass, provided that no copy/move can target
an earlier point in the document (no move _up_). Can validate the RuleSet doc
to be sure that every needed target is at least defined (need the doc to be
sure that pending() rule acutally matches anything, though)

Aside: Perhaps can use move-to: "delete" as way to delete content? (special target)
    
numbering will require two passes, to allow for forward references. Numbering is a sub-case
of link resolution, in general.

first pass: 
    count all the things (create counters for all object types RuleSet says to count)
    bake in the numbers (as a property indicating the computed sequential value -- will use CSS
         to style actual representation in final doc)
    find all reference links (internal)

second pass:
    fill all the references w/ appropriate value (may include baked-in numbering)
    Aside: might use second pass to pull content back out of "delete" state, such as figures or
        tables referenced in exercises when generating an exercise only or answer key PDF
