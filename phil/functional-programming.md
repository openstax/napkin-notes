# What is Functional Programming (FP)?

> **Functions** do not have side-effects; **procedures** do.

a.k.a. "Calling the same function with the same arguments multiple times yields the same output."

## Quiz

Which of these are functional (yes/no)?

```
def reverse(A)
    n = length(A)
    for i from 0 to (n-2)/2
        x = n − 1 − i
        tmp = A[i]
        A[i] = A[x]
        A[x] = tmp
    return A
```

<details>
<summary>Is the code above functional? (Click to show the answer)</summary>
No. because multiple calls result in different output. For example:

```
animals = [ 'sparky', 'cleo' ]
print(reverse(animals))     # [ 'cleo', 'sparky' ]
print(reverse(animals))     # [ 'sparky', 'cleo' ]     Whaaa????
```

</details>

---

```
def reverse(A)
    n = length(A)
    B = []
    for i from 0 to n - 1
        x = n - 1 - i
        B[x] = A[i]
    return B
```


<details>
<summary>Is the code above functional? (Click to show the answer)</summary>

Yes. because multiple calls result in the same reversed array.

```
animals = [ 'sparky', 'cleo' ]
print(reverse(animals))     # [ 'cleo', 'sparky' ]
print(reverse(animals))     # [ 'cleo', 'sparky' ]
```

</details>

---

```
def f(n)
    return random(n)
```

<details>
<summary>Is it functional? (Click to show the answer)</summary>
No. because multiple calls result in the same reversed array.
</details>


# Why Functional Programming?

Functional code is **much easier** to reason about.

As a programmer you never have to worry that something you call will cause changes somewhere else in your program.

# What are some things that come out of functional programming?

## Immutable Objects

Since functions do not change their arguments (or anything else like global variables) this means that Objects can be immutable (unchangable).

This makes it easier to reason about programs because as a programmer the decision to change state is explicit rather than implied in a procedure.

It also makes it possible to do things like:

- save snapshots to replay later or report bugs (see Redux for example)
- cache results of a difficult computation (see CNX Pipeline)
- not worry about thread safety

## First-class functions

This does not _strictly_ come out of FP but it is used a lot more.

This is part of DRY. For example, if you want to sort an array by first name you could write this:

```
def insertionSortFirstName(A)
    i = 1
    while i < length(A)
        j = i
        while j > 0 and A[j-1].firstName > A[j].firstName
            swap A[j] and A[j-1]
            j = j - 1
        end while
        i = i + 1
    end while
    return A
```

But now, if you need to sort by last name you would have to copy most of the code and change one line. Instead...


```
def insertionSort(A, C)
    i = 1
    while i < length(A)
        j = i
        while j > 0 and C(A[j-1], A[j])   # This line changed
            swap A[j] and A[j-1]
            j = j - 1
        end while
        i = i + 1
    end while
    return A

def firstName(x, y)
    return x.firstName > y.firstName

def lastName(x, y)
    return x.lastName > y.lastName

insertionSort(people, firstName)
insertionSort(people, lastName)
```

## Thread Safety

Maybe a topic for another time if there is interest. Many languages elide this problem by having a gigantic inefficient lock.
