## Terminology

### Value

Values are immutable data.
Value equality is determined via structural equality (field/attribute comparison - like structs).

### Entity

Entities have identity.
Entity equality is determined via identifier equality (uuid comparison).
Entities can have values as attributes.

### Aggregate

Aggregates are units of consistency.
Aggregates consist of one or more entities,
one of which is the aggregate root.

### Aggregate Root

All operations on an aggregate must be done through the aggregate root,
which is the entity responsible for maintaining business invariants.

### Stream

Streams are ordered, append-only data structures.
They hold events or commands.

### Command

A command is an immutable request to do something.
Commands are named in the imperative tense: `ChangeStudentName`.
Each command targets exactly one aggregate via the aggregate's uuid.

### Event

An event is an immutable record of something that happened.
Events are named in the past tense: `StudentNameChanged`.
Events are emitted by aggregates when they process commands.

### Event Sourcing

Instead of storing an aggregate's current state in a database,
its emitted events are stored in a per-aggregate event stream.
These events contain a complete record of all state changes,
so the state of the aggregate at any point in the past
can be derived from them via a "left fold".
(The only way an aggregate's state is modified
is by having it apply an event,
so we know for sure that this will work.)

```ruby
some_aggregate = SomeAggregate.new.load("aggregate_event_stream") ## old events are applied to aggregate
some_aggregate.process(command)                                   ## new events are generated and applied
some_aggregate.store                                              ## new events are stored
```

### 
