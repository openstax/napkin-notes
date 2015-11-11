```less

// in styles/components/task/...
#ireading... { .book-content(reading); }

// in styles/components/reference-book/...
#refbook... { .book-content(reference-book); }


// inside styles/book-content (or just index.less)
.book-content(@context) {
  .book-content-skeleton(physics-book; @context);
  .book-content-skeleton(biology-book; @context);
}

// inside styles/book-content/physics/skeleton (or just index.less)
.book-content-skeleton(physics-book; @context) {
  .note.engineering { .book-content-note(engineering; @context); }
  .exercise         { .book-content-exercise(practice-problems; @context)}
}

// inside styles/book-content/ap-bio/skeleton (or just index.less)
.book-content-skeleton(biology-book; @context) {
  .note.ap-connections { .book-content-note(ap-connections; @context); }
}


// inside styles/book-content/ap-bio/ap-connections
.book-content-note(ap-connections; @any) {
  padding: 1px;
}

.book-content-note(ap-connections; reading) {
  background-color: red;
}

.book-content-note(ap-connections; reference-book) {
  background-color: blue;
}
```
