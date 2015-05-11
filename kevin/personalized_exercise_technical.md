## Applicability

Personalized exercises appear only to Homework assignments.

## Workflow

A homework assignment is created by the teacher and distributed to students.

The homework will consist of:
* a `core` exercise group, 
* optionally followed by a `spaced practice` exercise group, 
* optionally followed by `personalized` exercise group

Initially, the `personalized` exercise group will consist of `placeholder`s instead of actual `exercise`s.  Trying to complete a `placeholder` exercise will result in some message like 
"hey, this isn't available until you do more exercises".

Once all of the `core` `exercise`s are completed, the `personalized` `placeholder`s will be replaced with actual `exercise`s.

## Placeholders

The schema for `placeholder`s looks like this:

```ruby
{:type=>:object,
 :required=>[:id, :task_id, :type, :is_completed, :related_content],
 :properties=>
  {:id              =>{:type=>"string"},
   :task_id         =>{:type=>"string",  :description=>"The id of the Task"},
   :type            =>{:type=>"string",  :description=>"The type of this TaskStep (exercise, reading, video, placeholder, etc.)"},
   :group           =>{:type=>"string",  :description=>"Which group this TaskStep belongs to (default,core,spaced practice,personalized)"},
   :is_completed    =>{:type=>"boolean", :description=>"Whether or not this step is complete"},
   :related_content =>{:type=>"array",   :description=>"Misc information related to this step"},
   :placeholder_for =>{:type=>"string",  :description=>"Which TaskStep type this Placeholder is standing in for"}},
 :additionalProperties=>false}
 ```

For instance:

```ruby
{
  :id => '456',
  :task_id => '123',
  :group => 'personalized',
  :type => 'placeholder',
  :placeholder_for => 'exercise',
  :is_completed => false,
  :related_content => [ ... ]
}
```

## Completion of Core Task Steps

Upon completion of the final `core` task step, all `personalized` `placeholder`s will be replaced with normal `exercise`s.
The step `id` will remain unchanged.
