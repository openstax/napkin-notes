# PostgreSQL Transaction Isolation Testing

This doc will cover only Repeatable Read (the default) and Serializable.

Transaction isolation error means `ERROR:  could not serialize access due to concurrent update`.
This causes the transaction to be retried in Rails (with the transaction_retry gem).

Both Record.where(something).lock.first or Record.first.lock! will cause a `SELECT FOR UPDATE`.
However, the second form causes a reload (extra query).

## Repeatable Read (default)

Different transactions are allowed to `SELECT` and then `UPDATE`
the same row without causing an error (usually a bad thing).

## Serializable

An `UPDATE` will cause a transaction isolation error in other transactions
that also `UPDATE` the same row, making them retry.

However, serializable isolation incurs some extra overhead.
Perhaps it's better to use explicit locks? (See below)

## Either Isolation

`SELECT FOR UPDATE` blocks other `SELECT FOR UPDATE` in the same row
in other transactions IF the row exists to begin with.

`UPDATE`ing the row selected with `SELECT FOR UPDATE` in one transaction
will cause a transaction isolation error in the other transaction
as soon as the `SELECT FOR UPDATE` returns (despite the blocking read).

`INSERT` blocks other `INSERT` (not `SELECT`), however the error returned by PostgreSQL is
`ERROR:  duplicate key value violates unique constraint "name"`
which causes a 500 error even with the `transaction_retry` gem (no retry).

If many concurrent `INSERT`s are needed (for example, concurrent `find_or_create_by`),
one way to do it is to patch `transaction_retry` to also retry `ActiveRecord::RecordNotUnique`,
as done in https://github.com/openstax/exchange/blob/master/lib/transaction_retry_patch.rb.

If there is too much contention on transactions that use `find_or_create_by`,
an advisory lock can be used to prevent the maximum number of
transaction retries from being exceeded.
