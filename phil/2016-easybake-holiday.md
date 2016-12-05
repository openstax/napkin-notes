# ⛄️ ❄️ 🏂  Advice on holiday work? 🏂 ❄️ ⛄️

Over the holidays I would like to work on adding some features to reduce the amount of explicit state that needs to be kept in one's head when developing recipes (and make it more stateless like CSS is).

Based on patterns I've seen while looking through the existing recipes, the following are features I'm proposing to write (in roughly increasing difficulty):

1. Custom console logging messages (the bare minimum needed for developing in any language)
1. Order-independent attribute modifiers (setting/removing `id/class/data-*` attributes)
1. Implicit pass numbers (using `::after-move` selector)
1. Nested `::outside` and numbered `::before(3)` selectors

But before I start digging in the code I was wondering if folks had thoughts/pointers on how to approach these features and whether they thought these would be useful (preferably with the harder ones because they require changes to cssselect2 :smile:).




## Custom console logging messages

```css
div {
  -log: "I am a" "message with" "id=" attr(id);
}
```

Input HTML:
```html
<body>
  <section data-type="chapter">
    <div class="foo" id="id123"/>
  </section>
</body>
```

Console Output:
```
section[data-type="chapter"]>div.foo#id123 : I am amessage withid=id123
```




## Order-independent attribute modifiers

Setting attributes is difficult to reason about when the order that rules are executed
depends on the order they are matched (which is why CSS created selectivity rankings).

This defines the attributes as being idempotent so the order does not matter
(& removes cognitive load).

The naming of these is heavily inspired by the existing `counter-reset:` and `string-set:` rules.

<details>
<summary>Click to show Example Input/Output HTML

```css
div {
  /* Inspired by the following declarations that also change state: */

  /* string-set: stringName "value", string2Name "hello " "world"; */
  /* counter-reset: c1 0, c2 0; */
  class-add: "foo", "converted-" attr(data-type);
  class-remove: "unwanted-class";
  attribute-set: "data-simple" "true";
  attribute-remove: "data-unwanted", "data-type", "href";
  id-ensure: true; /* generates a new id if one does not already exist */
}
div[href] {
  attribute-set: "data-href" attr(href), "data-complex" "true";
}
```

</summary>


Input HTML:
```html
<body>
  <div data-type="example" class="test unwanted-class"/>
  <div data-type="link" id="link999" href="http://cnx.org"/>
  <div data-type="example" data-unwanted="123"/>
</body>
```

Output HTML:
```html
<body>
  <div class="test foo converted-example" id="id123"   data-simple="true" />
  <div class="foo converted-link"         id="link999" data-complex="true" data-href="http://cnx.org" />
  <div class="foo converted-example"      id="id234"   data-simple="true" />
</body>
```

</details>




## Implicit pass numbers (using `::after-move` selector)

Use `::after-move` to denote rules that need to occur after a move instead of having to create an additional explicit pass (likely similar to how `::deferred` works).

<details>
<summary>Click to show Example Input/Output HTML

```css
body { counter-reset: c1 1; }

bar { counter-increment: c1 1; }

bar.needs-move { move-to: bucketName; }
bar.needs-move::after-move(bucketName) {
  content: counter(c1);
}

section { content: pending(bucketName); }
```
</summary>

Input HTML:
```html
<body>
  <bar/>
  <bar class="needs-move"/>
  <bar/>
  <bar class="needs-move"/>
  <section/>
</body>
```

Output HTML:
```html
<body>
  <bar/>
  <bar/>
  <section>
    <bar class="needs-move">3</bar>
    <bar class="needs-move">4</bar>
  </section>
</body>
```
</details>







## Nested `::outside` and numbered `::before(3)` selectors

I use "X" to denote that they behave differently
than the existing outside/before selectors.

<details>

<summary>Click to show Example Input/Output HTML

```css
p::outsideX {
  class-add: out1;
}
p::outsideX::outsideX {
  class-add: out2;
}
p::outsideX::outsideX::beforeX(1) {
  class-add: out2-before1;
}
p::outsideX::outsideX::beforeX(2) {
  class-add: out2-before2;
}
```

</summary>

Input HTML:
```html
<body>
  <p/>
</body>
```

Output HTML:
```html
<body>
  <div class="out2">
    <div class="out2-before2"/>
    <div class="out2-before1"/>
    <div class="out1">
      <p/>
    </div>
  </div>
</body>
```

</details>
