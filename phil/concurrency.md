# Overview

- Cover tasks/processes/threads, threads vs events, locks & transactions, cascading failures, event loops.
- Give a toy example (fetch and count chars in a set of zip files) with implementations in different languages
- Describe motivation/terms

# Terminology

Goals of concurrency are:

- Reduce latency: A unit of work is executed in shorter time by subdivision into parts that can be
executed concurrently.
- Hide latency: Multiple long-running tasks are executed together by the underlying system. It
is particularly effective when the tasks are blocked because of external resources they must
wait upon, such as disk or network I/O operations.
- Increase throughput: By executing multiple tasks concurrently, the general system throughput
can be increased. It is important to notice that this also speeds up independent sequential
tasks that have not been specifically designed for concurrency yet.



## Concurrency vs. Parallelism

Concurrency is a conceptual property of a program, while parallelism is a runtime state. 

Concurrency of a program depends on the programming language and the way it is coded, while parallelism depends on the actual runtime environment.

Only executing two different tasks simultaneously yields true parallelism.


## Locks vs Channels vs Callbacks

Most of the gotcha's in concurrency arise from side-effects when changing data. After all, if computation happens but no one sees the results then it's like it didn't happen. There are several concepts (found in all languages) that help people reason about these gotchas:

### Locks

Locks are a way to protect data. Since they are written in code it is easy to think of them as protecting code but that is not true.

To "simplify" the language, the ones we are discussing have a great big lock (ie "GIL") anytime IO happens, think of it as "lock everything in memory".

Pros: can guarantee mutually-exclusive access to small bits of memory
Cons: have to make sure you acquire all the correct locks (ie editing a tree object), need to guarantee no deadlock/livelock (Dining table dillema)


### Channels/Events

The channel abstraction allows 2 processes to communicate via a shared "channel". That way there is no shared data (memory) and no need for locks. 

Pros: do not need to worry about locks
Cons: the code is forced to constantly copy data back and forth (cannot share state)


### Callbacks & Promises

Callbacks are a way to say "do this other thing when you are done". This means that the code in the callback will be executed after the IO/network/async operation completes.

A Promise is a way to encapsulate a piece of work without getting into "callback-hell" (or pyramid something-or-other)


# Contrived Example

In this section we'll show how to download a set of zip files (IO-bound), unzip the files (CPU-bound), and then report the total number of characters (synchronization)

Consider the following pseudo-code. It is intended to be extra-verbose to show each "statement" and possible interleavings:

```
fetchAndUnzip = (url) ->
  zippedContents = fetch(url);
  contents = unzip(zippedContents);
  return contents;

files = [];
files.append(fetchAndUnzip('http://cnx.org/book0.zip'));
files.append(fetchAndUnzip('http://cnx.org/book1.zip'));
...

# countAllTheChars
chars = 0;
for (file in files):
  chars = chars + len(file);

print(chars);
```

You can be fairly certain that `book0` will be in `files[0]` because ruby/python fetches `book0` and waits before executing the next line (thanks to the GIL).

But that is inefficient. Sending data over the network is horribly slow; your program could have run in 1/2 of the time by fetching all 2 files at once while doing something else.

Ruby/Python/JS have a global lock (GIL) which makes it pretty easy to reason about. But that comes at a cost. Nothing else can run between each statement (`;` in the pseudocode). It guarantees the following execution order:

1. `fetchAndUnzip(book0.zip)`
1. `fetchAndUnzip(book1.zip)`
1. `countAllTheChars`

But the order we would like to describe is:

1. `fetchAndUnzip(book0.zip)` and `fetchAndUnzip(book1.zip)`
1. `countAllTheChars`


## Ruby 

(from http://merbist.com/2011/02/22/concurrency-in-ruby-explained/ has more links @ bottom)

### About the GIL

### Fibers

### Reactor



## Python

(from https://www.toptal.com/python/beginners-guide-to-concurrency-and-parallelism-in-python )

### About the GIL

### threading

### multiprocessing

### RQ (parallel CPUs) (pickle+redis)



## JavaScript

### About the EventLoop

### Promise

### async/await

### ServiceWorkers


# Misc

hadoop, Friendly-APIs (eTag, longpoll), Garbage Collection
