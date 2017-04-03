# Biglearn Scheduler Extraction

## Background

We want to avoid duplicating
the complicated logic associated with
exercise exclusions,
assignment open/due dates,
practice widget cheating,
scheduling of spaced practice,
etc.,
in each variant
of machine learning algorithms.

To this end,
we plan to extract a new BL Scheduler instance
from the Local Query Client
and share it across algorithms.

## Scheduler Responsibilities

The scheduler will:
* manage exercise exclusions (admin-, teacher-, and assignment-induced) for CLUE and PE/SPE exercise pools
* manage which ecosystems are in use
* manage when CLUEs/PEs/SPEs are updated
* manage when SPARFA matrices are updated
* provide ML algorithms with filtered learner/exercise pools

## Scheduler APIs

All of these APIs will be "bulk array" style, even if not indicated directly here.

### GET: Update Ecosystem Matrices

Allows an algorithm to figure out which ecosystem matrices it should update.

#### Inputs
* algorithm uuid

#### Outputs
* list of ecosystems uuids for that algorithm to update
* calculation uuid

### POST: Ecosystem Matrices Updated

Allows algorithms to tell BL Scheduler that matrices were updated.

#### Inputs
* algorithm uuid
* calculation uuid

#### Outputs
* success or failure

### GET: Calculate CLUEs

Allows an algorithm to figure out which CLUEs needs to be updated.

#### Inputs
* algorithm uuid

#### Outputs
* calculation uuid
* set of exercise uuids (filtered by exclusions, assignments, etc.)
* set of learner uuids
* ecosystem uuid

### POST: Records CLUEs

#### Inputs
* algorithm uuid
* calculation uuid
* CLUE data structure

#### Outputs
* success or failure

### GET: Calulcate PEs/SPEs

Allows an algorithm to figure out which PEs/SPEs to update.

#### Inputs
* algorithm uuid

#### Outputs
* calculation uuid
* set of exercise uuids (filtered by exclusions, assignments, etc.)
* set of learner uuids
* ecosystem uuid

### POST: Update PEs/SPEs

#### Inputs
* algorithm uuid
* calculation uuid
* sets of exercise uuids, ordered from most- to least-recommended


## Algorithm Responsibilities

### Compute `W`, `U`, and `d` (SPARFA-based only)

#### Required Data and Their Sources

Data | Source
-----|-------
list of concepts | ecosystem (from BL API)
list of hints | ecosystem (from BL API)
gradebook (1st responses) | responses (from BL API)
ecosystem uuid to process | BL Scheduler

### Compute CLUEs

#### Required Data and Their Sources

Data | Source
-----|-------
list of exercises | responses (from BL Scheduler)
list of learners | responses (from BL Scheduler)
ecosystem uuid | BL Scheduler

### Provide PEs and SPEs

#### Required Data and Their Sources

Data | Source
-----|-------
list of exercises | responses (from BL Scheduler)
list of learners | responses (from BL Scheduler)
ecosystem uuid | BL Scheduler

## Algorithm APIs

None.  Algorithms call on BL API and BL Scheduler server APIs.
