# CSS discussion topics
  
  
## Which LESS features?

- mixins
- namespaces
- arithmetic
- variable interpolation `@@var-name`
- classname construction `&-foo`


## Organization

- where are vars defined
- scoping (screen, card/panel-level?)
- when to create a LESS file


## Whitespace Formatting

- multiple selectors
- multiple rules
- mixin calls
- only one rule


## Style Reuse

- when mixins vs additional classes (ie `clearfix`)?
- should mixins be namespaced
  - how? (namespace or convention)
  - LESS aggregates mixins, no such thing as file-local mixins


## Coverage

- should allow CSS cascading? (opens up !important)
- run on all tests?

## Naming/organization methods ideas

- [BEM and SMACSS](http://www.sitepoint.com/bem-smacss-advice-from-developers/)
- [BEM](https://en.bem.info/method/definitions/)
- [SUIT naming conventions](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md)
