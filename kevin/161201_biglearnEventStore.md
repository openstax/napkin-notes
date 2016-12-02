## Overview

We want to produce a system where:
* adding new functionality does not break existing functionality
* existing functionality is easy to test (and therefore change)
* we can audit what happened (for internal or external reasons)
* scaling is easy
* development can be done in parallel
* deployment is low-risk and low-downtime

An event-driven, event-sourced architecture addresses all of these desires.
Producers send commands (requests) to be handled by business logic.
The business logic produces the appropriate events (facts)
based on the state of the system and the incoming command.
Consumers process the events and take appropriate action
(note that a producer can also be a consumer).

![simplified](https://github.com/openstax/napkin-notes/blob/master/kevin/simplified_overview.png)

The key piece of technology required to implement this design is an event store which provides:
* fast writing and reading of commands/events
* high scalability and reliability
* partitioning of commands/events into many small streams
* language-neutral APIs

![interations](https://github.com/openstax/napkin-notes/blob/master/kevin/event_store_interactions.png)

By focusing on events (instead of state),
components stay loosely-coupled 
and their boundaries more naturally align with business needs.
New components can be added,
and old ones removed,
with very well-defined risk 
based on the number of downstream consumers of output command/event types.
Each component can be tested
using feeding it input commands/events
and checking if its output commands/events are correct
(sidenote: it's possible to create stong negative tests by asserting that an output command/event is _not_ seen).
The event store also provides a permenant, ordered record of commands/events
on a per-aggregate basis that can be used for debugging and auditing.

The only coupling between components are the command/event schemas,
and those can be published in a standard format like `json-schema`.

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

## Code Flow

### Controller

```ruby
class RostersController < ApplicationController
  def enroll_student
    cmd = Command::EnrollStudent.new(command_params)
    execute(cmd)
    head :ok  ## NOTE: ansynchronous
  end
  
  def command_params
    ## extract info from params
  end
end
```

```ruby
module Command
  module Execute
    def execute(command, **args)
      command.validate!
      args = dependencies if args.empty?
      handler_for(command).new(**args).call(command)
    end

    private
    def handler_for(command)
      {
        Command::EnrollStudent      => CommandHandlers::EnrollStudent,
        Command::DropStudent        => CommandHandlers::DropStudent,
        Command::MoveStudent        => CommandHandlers::MoveStudent,
      }.fetch(command.class)
    end
  end
end
```

### Command Handler

```ruby
module Command
  class Handler
    def initialize(repository:, **_)
      @repository = repository
    end

    protected
    def with_aggregate(aggregate_id)
      aggregate = build(aggregate_id)
      yield aggregate
      repository.store(aggregate)
    end

    private
    attr_accessor :repository

    def build(aggregate_id)
      aggregate_class.new(aggregate_id).tap do |aggregate|
        repository.load(aggregate)
      end
    end
  end
end
```

```ruby
module CommandHandlers
  class EnrollStudent < Command::Handler
    def call(command)
      with_aggregate(command.aggregate_id) do |order|
        order.enroll_student(command.student_uuid, command.perioud_uuid)
      end
    end

    private
    def aggregate_class
      Domain::Roster
    end
  end
end
```

### Aggregate

```ruby
module Domain
  class Order
    include AggregateRoot::Base

    def initialize(uuid = generate_uuid)
      @uuid    = uuid
      @periods = {}
    end

    def enroll_student(student_uuid, period_uuid)
      if @periods[period_uuid].nil?
        apply Events::UnknownPeriodError.new(data: { roster_uuid: @uuid, period_uuid: period_uuid } )
      elsif @periods[period_uuid].contains(student_uuid)
        apply Events::AlreadyEnrolled.new(data: ...)
      else
        apply Events::StudentEnrolled.new(data: {roster_uuid: @uuid, student_uuid: student_uuid, period_uuid: period_uuid})
      end
    end

    def drop_student(...)
    end

    def move_student(...)
    end

    private

    def apply_events_student_enrolled(event)
      @periods[event.period_uuid].add_student(event.student_uuid)
    end

    def apply_events_student_dropped(event)
    end

    def apply_events_student_moved(event)
    end
  end
end
```
