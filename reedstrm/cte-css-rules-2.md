###  CSS3 Syntax for Collation and Numbering - OpenStax Easybake ###

## Moving and copying:

Implement parts of the CSS-generated-content spec. Two declarations and
a content function:

  move-to: _idstring_
  copy-to: _idstring_
  pending(_idstring_)

move-to and copy-to  will "mark" the  matching node (and all of it's
descendants) for moving or copying to the place identifed by the idstring.

pending() is a CSS function that is valid as the value of a content:
declaration, esp. inside a pseudo-element (::after or ::before). When this node
is reached when walking the HTML tree in recusive descent, the pending moves
and copies land here.

As an extension, since we are targetting output of HTML, rather than another
rendering tree (page or screen display), we will create an actual wrapper node
for each pseudo-element area. In support of this, we are adding additional
declarations:

  class: myclassname
  display: block|inline

The class declaration will set the value of the class attribute on the generated
wrapper node. The "display" declaration will make the wrapper node a 'div' or 'span', respectively. There may be need for block:h1, block:section, or perhaps wrapper-node: h1|section|div|span|strong instead.

Note that move-to: and copy-to: may be used on pseudo-element rules as well.
This would allow generation of, for example, a title string, in the context of
one node, using local values of counters, but moving that generated node inside
a different node elsewhere. The value of this over string-set is that it
generates a _wrapped_ element, rather than only a string.

Note that copy-to will need to modify any 'id' values in the nodes it copies.

