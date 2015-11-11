# Tasks

* [https://github.com/openstax/tutor-server/blob/master/lib/tasks/demo/demo_base.rb#L337-L346](https://github.com/openstax/tutor-server/blob/master/lib/tasks/demo/demo_base.rb#L337-L346)
  * It appears even though the assistant should know what sort of `type` the task/task_plan ought to be, the developer is still required to repeat this information to the `tasks_task_plan_type:` argument

* `DistributeTasks` has a lot of law of demeter violation happening, and often going in several directions.
  * sometimes the code sends messages to `entity_task`
  * other times it talks to `entity_task.task`, or `entity_task.task.tasked` or `entity_task.task.task_steps`

* [https://github.com/openstax/tutor-server/blob/master/app/routines/distribute_tasks.rb#L41](https://github.com/openstax/tutor-server/blob/master/app/routines/distribute_tasks.rb#L41)
  * The assistant is associated with the task plan, yet the task plan has to be passed into the assistant's `#build_tasks` method.

# Testing

* I am of the personal opinion that it seems the team rushes to `let` and `let!` variables and other setup that isn't always necessary to write a test. Oftentimes I am able to refactor these tests to be much more succinct in their setup, and to reduce mental overhead of understanding the setup.

# In general

* Private methods need not require named arguments. In my view, named arguments make sense for a method you're calling that you can't see the definition of in the same file. If you can see the method's signature a few lines down, then it should be all good.

* Have noticed comments that explain code that isn't hard to understand, and a lack of comments on code that is.
  * in `DistributeTasks` a use of `#lock!` is explained as preventing concurrent updates. Programmers ought to know what `#lock` does
  * however, further down the file, some odd code is written on `tasked` and `task_step` to alleviate an issue with rails, and it is not explained a comment
  * Another note about comments is that often you could just create a private method named after what you'd write as a comment
  * In [https://github.com/openstax/tutor-server/blob/master/lib/html_tree_operations.rb](https://github.com/openstax/tutor-server/blob/master/lib/html_tree_operations.rb) -- this is heavily over commented. I can completely understand most if not all of the code as it is.
