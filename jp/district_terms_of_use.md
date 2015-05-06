# District-specific Terms of Use

## Current Implementation

Currently, OpenStax Tutor has terms of use and privacy policy "contracts" that are global for all users.

## The Need

We are negotiating agreements with school districts that are intended to replace user-level agreements to terms of use and privacy policies.  So when a student from a course within one of these districts (or schools) uses OpenStax Tutor, we should not ask them to sign the generic, global terms of use and privacy policy; instead, they are covered by a set of terms negotiated by OpenStax and the district / school.  Similarly, we don't want these students to be asked to sign terms at OpenStax Accounts.

## Proposed Changes

Modify Tutor to optionally associate certain contracts with courses, or the schools that contain them, or the districts that contain courses.  Setting these associations would be an admin-only function. (this of course also implies that we have to add `School` and `District` models and admin interfaces; `District` may be called `SchoolSystem` to apply to K12 and higher ed).

When a user signs in to Tutor, we want to get their signature on contracts according to the following scheme:

1. If the user is a member of no courses or only courses without specific contracts, get them to sign the generic terms.
2. If the user is only a member courses with specific terms, get them to sign those specific terms.
3. If the user is a member of courses without specific terms and a member of courses with specific terms, get them to sign the standard terms and the specific terms.

Modify FinePrint to take a proc in its config for finding the set of terms for a particular user based on the above rules, e.g.

```ruby
config.get_contracts_proc = -> (user) {
  # apply the rules from above
}
```

For a course without specified terms, a certain page (or endpoint) on Tutor may require signatures for a generic terms of use and a generic privacy policy, e.g.:

```ruby
fine_print_require :terms_of_use, :privacy_policy
```

However, that same page (endpoint) for a course with specific terms may just require a signature on one combined terms/privacy policy contract.  For this we'd theoretically want something like:

```ruby
fine_print_require :some_other_label_for_that_specific_contract
```

Since we can't have both of these (and since the second situation doesn't even make sense because we need it to be course-specific), we won't generally be able to enumerate the labels for contracts in this way.  At the same time, we may have different kinds of contracts that we want to require in different parts of the site, e.g. we could have the normal-teacher-and-student-user contracts for most of the site and an api-developer set of contracts for registering API applications.  This might imply a need to tag contracts and then to `fine_print_require` based on that tag.  Then, the `:terms_of_use`, `:privacy_policy`, and `:some_other_label_for_that_specific_contract` can all have the same tag and

```ruby
fine_print_require :that_tag
```

could target them.

Modify FinePrint to allow blanket agreements by a third-party as identified by an administrator.  E.g. if we have a physical agreement with school district X, we'd create a FinePrint contract to contain the text of that document and associate that contract with the district within Tutor.  We'd then record a blanket signature for that contract, so that when Tutor checks to see if the contract has been signed, it will have been and the students and teachers won't be prompted to sign.  When recording this blanket signature, we'd need a text field to record who signed it, e.g. "XISD General Counsel" or "Sally Armstrong, XISD General Counsel".

This approach of course-/school-/district-specific contracts requires teachers to make accounts for their students and to add those accounts as students of the appropriate classes.  If student's try to log in themselves before this, we'll have no way to know to show them course-specific contracts.

We also need to make it so that Accounts doesn't prompt users to sign agreements when they have only course-specific terms in Tutor.  The only way I can see to accomplish this is to have Tutor request that Accounts not require any users it sends to Accounts to sign terms on Accounts (in effect this is Tutor saying "hey Accounts, don't worry about terms for this user, I've got it covered").  Tutor would then need to have language in its terms to cover OX Accounts.
Dante can weigh in here.  This might mean adding a boolean field to `ApplicationUser` like `skip_fine_print_signatures` or something.  When a user signs in to Accounts, if they only have `ApplicationUser`s with this field set to true, Accounts won't prompt them to sign contracts.  If they don't have any `ApplicationUser`s or they have `ApplicationUser`s where this field is false, they'll sign the normal Accounts contracts.

Make Tutor's footer "Terms" link show the generic terms.  Ditto for Accounts.


