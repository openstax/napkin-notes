This is a list of resources
(books, papers, articles, videos, etc.)
that I have found particularly useful.

## Distributed Systems

* [Designing Data-Intensive Applications](https://dataintensive.net/):
  This book is an up-to-date encyclopedia 
  of distributed systems concepts and technologies
  and I cannot recommend it enough.
  It covers replication, partitioning, transactions, consensus, availability, consistency, etc.,
  and the connections between them.
  The end-of-chapter references
  point to many of the individual papers I've been reading
  (including recent work by my main man Peter Bailis!)
  but the book provides a supremely useful cross-cutting perspective on them.
  Worth its weight in gold.

## Kafka

* [Designing Event-Driven Systems](https://www.confluent.io/designing-event-driven-systems):
  By the makers of Kafka, 
  this book clearly explains
  the case for event streams.
  It also shows how to use new Kafka features
  (e.g., transactions, CDC, and KSQL)
  to build scalable, extensible streaming systems.
  It does a reasonable job
  at pointing out limitations and sticking points, too.
  
* [Exactly-once Semantics are Possible: Here’s How Kafka Does it](https://www.confluent.io/blog/exactly-once-semantics-are-possible-heres-how-apache-kafka-does-it/):
  This covers the core concepts and failure modes that need to be addressed.

* [Exactly-once Support in Apache Kafka](https://medium.com/@jaykreps/exactly-once-support-in-apache-kafka-55e1fdd0a35f):
  This is Jay Kreps' response to those who didn't think the above article was possible.
  (It also made me aware of
  [Kleppmann's book](https://dataintensive.net/)
  which I mentioned above.)

* [Transactions in Apache Kafka](https://www.confluent.io/blog/transactions-apache-kafka/):
  This article is a follow-up to the first article,
  and explains more of the inner workings of the Kafka brokers and clients.
  
