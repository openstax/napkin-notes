## Installation

Clone the GH repo:

```
git clone https://github.com/openstax/sparfa-sandbox.git
```

Track down the name of the remote branch 
(which will probably be `remotes/origin/analysis_for_drew`):

```
cd sparfa-sandbox/klb_refactor
git branch -a | grep drew
```

Checkout the remote branch and give it a local name,
just in case you want to make changes:

```
git checkout -b <YOURBRANCH> remotes/origin/analysis_for_drew
```

Create a local python environment.  You'll need `python2.7.x`:

```
python --version

virtualenv env
source ./env/bin/activate

pip install -U pip
pip install -r requirements.txt
```

You should be ready to rock now.

## Running the Tools on Artificial Data

### Creating Artificial Data

Create a working directory alongside the `sampling3` directory:

```
mkdir <BASEDIR>
cd <BASEDIR>
```

Create some data:

```
python ../sampling3/create_data.py  --DATA_DIR data --NL 1024 --NQ 256 --NC 64
```

Sample the data to create a gradebook that is 80% sparse:

```
python ../sampling3/create_gradebook_from_data.py --DATA_DIR data/ --GRADEBOOK_DIR gradebook --GS 0.8
```

Process the gradebook:
* create partitioned samples (in this case each with 256 learners, 64 questions, 16 concepts, repeated 4 times)
* run SPARFA on the samples (in this case on 4 cores)
* assign weights to the SPARFA sample results
* aggregate the SPARFA sample results

All the intermediate data will be placed in the `run_01` directory.
```
python ../sampling3/process_gradebook.py --GRADEBOOK_DIR gradebook/ --OUTPUT_BASE_DIR run_01 --NLQC 256 64 16 --NCPU 4 --NTIMES 4
```

Analyze the results:

```
python ../sampling3/analyze_W_d.py --DATA_DIR data/ --GRADEBOOK_DIR gradebook/ --AGGREGATE_DIR run_01/aggregates/final
```

## Using Live Data

## Analyzing Results

