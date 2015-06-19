# Overview

This document details the changes that are needed in the
tutor-biglearn ecosystem if we were to have structured tag types.

# A taxonomy reference

We need a centralized place that has definitions of tag types, what
types are required and what are optional, the expected format of the
tag belonging to the type etc.  It is probably best for the
"exercises" application to host this eventually.  For now, we can have
this in some document.

# Exercise import

Since we use spreadsheets to do the import, we need a column for each
tag type that we define in our taxonomy.

# Exercise editor

When we develop the exercise editor, we need to make sure that the
user interface understands and supports the required and optional tag
categorization and tagging.

# Exercises DB

There needs to be provisions for :

- Storing the taxonomy definitions
- Ability to update the taxonomy definitions
- Associating tag types to tags

# Exercises API

1. Every API result must include a "tag_types" or "taxonomy" entity at
   the top level that provides the type(s) of every tag included in
   the result set.

2. A separate end point for fetching list of tag types must be
   provided.

3. An endpoint for getting the tag types for one or more tags must be
   provided.

# Biglearn

1. Biglearn's fact store needs to support tag type definitions
2. Biglearn's `facts/questions` end point needs to support importing
   tag types along with question tags
3. Biglearn needs a separate endpoint `facts/tags` that allows
   individual update of tag types.
4. Biglearn needs to use only the tags that belong to "concept" tag
   type (maybe a couple of others based on our taxonomy) when calling
   out to SPARFA, TeSR and CLUE algorithms.

# Tutor (TBD)

1. Tutor needs to understand the tag types (probably needs changes to DB)
2. Tutor needs to provide biglearn with tag types when importing question
   tags.
