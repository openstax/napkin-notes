# Overview

As the number of exercises in our system grows, the tags also continue
to explode.  The initial set of tags that are presented to biglearn
are used by biglearn to assume(learn) the similarities between
questions.  In the absence of enough data to correct any
irregularities in those initial assumptions, those initial
associations become hard truths.

To get better recommendations from biglearn, it is vital that we
exclude the tags that are irrelevant for biglearn.  So, adding types
to tags in exercises(or in tutor) and exposing them to biglearn is
very important.

It also important to note that many of the tag types discussed in this
document are already well defined.  However, the definition exists out
of the system.  This document aims to bring that definition and
structure into the system to make effective use of the tags.


# What do we currently have

This section takes the tags for exercise 321 as an example and attempts
to describe and categorize the tags based on their purpose.  We need to
do this for all the tags that we use and plan to use.


- display-free-response

  Used by tutor and other exercise rendering applications to decide if
  a free response is required for this question.  This has no
  significance when it comes to understanding relationships between
  exercises.  This is a "ui-helper" tag.

- display-rec-sensitive

  Not sure what this means. (TBD: Needs explanation).  This is a
  "ui-helper" tag.

- time-medium

  Not sure what this means. (TBD: Needs explanation).  This could be a
  "high-level-concept" tag.

- ost-chapter-review

  This indicates that this should be presented during a chapter
  review.  This has no significance when it comes to understanding
  relationships between exercises.  This is a "assignment-helper" type
  tag.

- critical-thinking

  This indicates that this question involves the critical thinking
  faculty of the students.  This could potentially be useful for
  biglearn if and when we start training students based on these
  faculties.  This could be categorized as a "cognitive-faculty"
  tag.

- dok4

  This gives the depth of knowledge.  This is currently not used in
  selecting questions, but is and will be useful when figuring out the
  question difficulty.  This is a "depth-of-knowledge" tag.

- blooms-5

  Not sure what this means.  (TBD: Needs explanation).  This probably
  needs its own category - "bloom".

- tutor-only

  This indicates that this should be presented only by tutor and not
  used by other platforms.  This has no significance when it comes to
  understanding relationships between exercises.  This is a
  "assignment-helper" tag.

- k12phys-ch04-s01-lo02

  This is the learning objective tag.  This is the one biglearn is
  most interested in.  This is a "concept" tag.

- k12phys-ch04-ot016

  This is the exercise number tag.  This should be categorized as
  "exercise-number".

- k12phys, k12phys-ch04, k12phys-ch04-s01

  These tags are used to group the questions in a book, chapter and
  section respectively.  While these may be taken advantage of by
  future algorithms, currently they are used by other platforms to
  filter the question pool that biglearn utilizes.  These are
  "grouping" tags.


# What does having tag types give us?

1.  It helps biglearn understand the relationship between questions
    more effectively by clearly categorizing the tags that actually
    signify conceptual categories for the questions.

2.  Having a detailed nomenclature(taxonomy, tagsonomy?) helps us
    clearly define the tags and open up the possibilities for
    developing advanced algorithms that make use of this knowledge.

3.  It helps in making user interfaces for exercise creation and
    maintenance.  The well structured tagging scheme will let us
    define proper affordances that help the content creators tag
    exercises in a consistent manner.

4.  Certain tags like "grouping" tags for example, will allow for
    precomputing optimizations armed with the knowledge that those
    will exclusively be used in queries.

# Questions to ponder

1.  Should that tags have only one type?

    Probably not.  A standout example is the "concept" tag or "LO"
    tag that could also be used as a "grouping" tag.

2.  What happens when we open up exercises and other others do not
    follow our nomenclature?

    The user interfaces that we have for creating and maintaining
    exercises should help in maintaining consistency.  Along with some
    curation, this should help us maintain the integrity of our
    taxonomy.  We should allow for "other" tags so that external
    authors can have additional tags to satisfy their needs.  These
    "other" tags will not be used by our ecosystem for any purpose.

3.  Do we know all the categories of tags that we may need in the
    future?

    Taxonomy grows with discovery.  Our systems should account for
    addition of new tag types.
