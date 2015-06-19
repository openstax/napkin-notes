Seems to be 2 options:

# getting all periods in 1 call

Pros:

- 1 request, 1 store

Cons:

- lots of (unused) bits to retrieve
- URL has different JSON format for student and teacher
- cache invalidation is more complicated and occurs more frequently


# separate calls for each period data

Pros:

- JSON has same format
- Only retrieve the period when clicked

Cons:

- need to retrieve list of periods first (serial retrieval, not parallel)
- unclear what happens on URL endpoints when `./periods/1` is removed
- More complicated store
- May need to remember period in the URL (esp for Learning Guide)
