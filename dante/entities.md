# Entities
Entities control the Domain layer of the app.
Entities expose methods that perform business operations.
(for example, methods to call Domain routines)
You can navigate from one Entity to a related Entity class,
but AR (repository) models are not exposed.

# Proposed implementation
Entities expose the `find` method by default.
Entities have a "main" AR class, which they use to derive their ID's from.
Usually for an Entity named "X", this will be the "XProfile" class,
or, if the entity represents a tree structure, the root of said tree.

Only top-level objects, which should be accessible from Controllers, should be entities.
(for example, there will be a Task entity, but not a TaskStep entity)
Controllers can only talk to Entity classes, never to AR models directly.
AccessPolicies should also refer to Entity classes, not to AR models directly.
Multiple entities can wrap the same AR model.
(for example, Reading and Homework entities can both wrap the Task AR model)

# CRUD entities
Helper methods in Entity can be used to expose one or more of the usual AR methods,
such as `create`, `update`, `save` and/or `destroy`.
Designed for simple resources that are supposed to have simple CRUD API's.
These entities can then be compatible with `standard_read` etc methods from `openstax_api`.

# Possible points of discussion
- 1 Entity per subsystem?
- Do entities call access policies? Do access policies bypass entities? 
- Should all domain routines be changed to work only with entities?
