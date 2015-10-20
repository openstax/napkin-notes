


```
HomeworkTask ------------------ Task ----------------- ReadingTask
      | 1        *          1     | 1    1        *         | 1
      |                           |                         |
      | 1..*                      | 1..*                    | 1..*
HomeworkTaskStep ------------- TaskStep ------------ ReadingTaskStep
      | 1        *          1            1        *         | 1
      |                                                     |
      | 1                                                   | 1
{HomeworkExercise,                                   {ReadingExercise,
 HomeworkPlaceholder}                                 ReadingExternalUrl,
                                                      ReadingInteractive,
                                                      ReadingReading,
                                                      ReadingVideo,
                                                      ReadingPlaceholder}
```
