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

* [Data on the Outside versus Data on the Inside](http://cidrdb.org/cidr2005/papers/P12.pdf):
  This classic paper by Pat Helland (at MicroSoft at the time)
  discusses the far-reaching implications
  that dividing a system into multiple indpendent services
  has on data
  both *inside* and *outside*
  of the individual services.
  Of particular interest
  is the need for outside data
  to be *stable* over time.
  
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

## Software Design

* [Treaty of Orlando](https://www.researchgate.net/publication/2717911_A_Shared_View_of_Sharing_The_Treaty_of_Orlando):
  This paper explains the underlying principles of OOP
  in a language-agnostic manner.
 
## My Random Writeups

* [CNX Envrinoments, Servers, Databases, and All That](https://docs.google.com/document/d/1Rz8wSqlf31zcxkqE-z9b-TQKRKZUpNNGwwTKWndvtoQ/edit#heading=h.moi11qb96kq5)

* [How We Build Books](https://docs.google.com/document/d/11RVX535Gv1j09u0baT3yTUgHtTnBkssvEWCFsw8rPp4/edit?ts=5c001598#heading=h.vq6f0s8tqd8a)

* [Thoughts on CNX](https://docs.google.com/document/d/1BnS8Nq0VMpINlOaCZSswGHPt6Mti0vMnVyjhd1W8vA0/edit#heading=h.dapdzt39oa6n)

* [Kevin's CNX Guide](https://docs.google.com/document/d/1TJCae0LXebQ6AVnjvNN_gzmmFRFK1a2L10uDO1eiuH0/edit)

* [Thoughts on Meetings](https://docs.google.com/document/d/1gbkZDNpxLc7kq_KMSfdGQo76Z-VRC1hBl7-jHbcwi0I/edit#heading=h.m9e9egqhpgmp)

* [Thoughts on Types](https://docs.google.com/document/d/19uAwUUeWcUhwJ2g7iSe4cAUtBJMRP774b6RaSS5jQek/edit#heading=h.dbmxgio57kxr)

* [Thoughts on Duplication](https://docs.google.com/document/d/172UO06P9mUNasS5NF21U_IoOPsCTx27dWRmE4JLIx60/edit#heading=h.xcc7lzkdn96e)

* [Thoughts on Designs](https://docs.google.com/document/d/1SGhrUz5wW_v_pFUq-GanSIpOjO3Cv-TpwXWStVG_sG4/edit#heading=h.rahrip9ehsns)
