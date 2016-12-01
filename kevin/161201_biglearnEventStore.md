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

```ruby
{
  command_type: "ChangeStudentName",
  command_uuid: "d5d8aa00-1805-43b0-823c-9ce262fb4cde",
  target_aggregate_type: "StudentProfile",
  target_aggregate_uuid: "5526ba99-047d-49a1-8a14-3247ca1e8727",
  data: {
    first: "joe",
    middle: :none,
    last:  "schmoe",
    ## ... data for time, user/role, etc.
  },
}
```

### Event

An event is an immutable record of something that happened.
Events are named in the past tense: `StudentNameChanged`.
Events are emitted by aggregates when they process commands.

```ruby
{
  event_type: "StudentNameChanged",
  event_uuid: "ed55f063-9600-4ea4-afdc-44ab290c9fc9",
  caused_by: {
    command_type: "ChangeStudentName",
    command_uuid: "d5d8aa00-1805-43b0-823c-9ce262fb4cde",
  },
  data: {
    first: "Joe",
    middle: :none,
    last:  "Schmoe",
    ## ... data for time, etc.
  },
}
```
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
some_aggregate_root = SomeAggregateRoot.new.load("aggregate_event_stream") ## old events are applied to aggregate
some_aggregate_root.process(command)                                       ## new events are generated and applied
some_aggregate_root.store                                                  ## new events are stored
```

```ruby
def load(stream_name, event_store: default_event_store)
    @loaded_from_stream_name = stream_name
    events = event_store.read_stream_events_forward(stream_name)
    events.each do |event|                                        ## NOTE: applying events to an aggregate
      apply(event)                                                ## only updates its state; side-effects only
    end                                                           ## occur when new events are published
    @unpublished_events = nil
    self
  end
```

### Command Sourcing

One could also replay commands,
but this would result in side effects being replayed as well,
so we probably won't do that.

However, commands will (likely) be archived for analysis.

### Projections

Aggregates implement the business logic needed to turn commands into events,
but they are (likely) not the best way to represent the state of the system.

Projections consume events (often from multiple aggregates)
and compile them for some business purpose (displays, tallies, etc.).
By keeping results updated in near-real-time,
the latest results can be used without the need for complex queries and calculations.

Because aggregates know nothing about them,
projections can be added, removed, restarted, etc.,
without risky changes to the aggregates.

Also note that if a new projection is added mid-semester,
it can display results as if it'd been around
for as long as the events it processes have been recorded.

### Eventual Consistency

Eventual consistency means that,
if no new inputs to the system occur,
all parts of the system will eventually reach consistent states.

The amount of time needed to reach eventual consistency depends on 
how many layers of events/commands are created,
the command/event passing latency,
and the time it takes aggregates and projections to process commands/events.

### Idempotence

It is provably impossible to achieve exactly-once delivery of messages in an asynchronous distributed system,
but we have at-least-once delivery with de-duping as a workable fallback.
In order to achieve the de-duping, however, 
each command/event must be immutable and have a uuid.

