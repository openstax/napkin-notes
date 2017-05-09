## Server Names

We can connect directly to the `-dev` servers
without any authentication,
but we need to use `https`
to avoid getting a `301: Permanently Moved` redirect.

```python
## NOTE: These names might change in the near future.
bl_api_base       = 'https://biglearn-dev.openstax.org'
bl_scheduler_base = 'https://biglearnworker-dev.openstax.org'
```

## Routes

Note that all of these use `POST`
(it keeps the packaging of data consistent
and models calls as processes, not resources).

`BL API` server 
[routes](https://github.com/openstax/biglearn-api/blob/master/config/routes.rb#L3-L4).

`BL Scheduler` server
[routes](https://github.com/openstax/biglearn-scheduler/blob/master/config/routes.rb).

## Endpoint Schemas

The API document endpoints
aren't ready yet,
so we need to look at the code.

From the routes files,
you can tell which controller/method
handles which API endpoints.
In this case,
we're interested in
[`EcosystemsController#fetch_events`](https://github.com/openstax/biglearn-api/blob/master/app/controllers/ecosystems_controller.rb#L30-L40).

Each endpoint is wrapped by 
[`with_json_apis`](https://github.com/openstax/biglearn-api/blob/master/app/controllers/ecosystems_controller.rb#L31-L32),
which enforces schemas
and can lead you to the 
[request](https://github.com/openstax/biglearn-api/blob/master/app/controllers/ecosystems_controller.rb#L186)
and
[response](https://github.com/openstax/biglearn-api/blob/master/app/controllers/ecosystems_controller.rb#L227)
schemas.
The endpoints then 
[delegate to services](https://github.com/openstax/biglearn-api/blob/master/app/controllers/ecosystems_controller.rb#L35-L36) 
to get the bulk of their work done and
[package up the results](https://github.com/openstax/biglearn-api/blob/master/app/controllers/ecosystems_controller.rb#L38)
but digging into that should not be necessary.

Some schemas make use of
[`#standard_definitions`](https://github.com/openstax/biglearn-api/blob/master/app/controllers/json_api_controller.rb#L112-L227)
which is defined in the
[`JsonApiController`](https://github.com/openstax/biglearn-api/blob/master/app/controllers/json_api_controller.rb#L3)
base class.

Sometimes parts of the schema
are defined elsewhere in the code
(e.g., [here](https://github.com/openstax/biglearn-api/blob/master/app/controllers/json_api_controller.rb#L172)),
in which case
you'll need to look in the
[model](https://github.com/openstax/biglearn-api/blob/master/app/models/course_event.rb#L6-L16)
for the details.

Some 
[parts](https://github.com/openstax/biglearn-api/blob/master/app/controllers/ecosystems_controller.rb#L209)
of the schema
(mostly on the fetch side)
are currently just
[blobs](https://github.com/openstax/biglearn-api/blob/master/app/controllers/json_api_controller.rb#L174-L177),
but you can usually look at the
[corresponding create schema](https://github.com/openstax/biglearn-api/blob/master/app/controllers/ecosystems_controller.rb#L44-L140)
to get a pretty good idea of the layout.

## Sample Code

This worked fine for me.
Note that `ecosystems` are _big_,
but we only need to fetch them once
because they are immutable.

```python
import json
import requests
import uuid

## NOTE: These names might change in the near future.
bl_api_base       = 'https://biglearn-dev.openstax.org'
bl_scheduler_base = 'https://biglearnworker-dev.openstax.org'

def fetch_ecosystem_metadata():
    metadata_response = requests.post(
        bl_api_base + '/fetch_ecosystem_metadatas',
        headers = {'Content-Type': 'application/json'},
        data    = json.dumps({}),
    )

    if not metadata_response.status_code == 200:
        raise StandardError('problem fetching ecosystem metadata: {}'.format(
            metadata_response.status_code
        ))

    # import pdb; pdb.set_trace()

    def chunkify(lst, size):
        for ii in xrange(0, len(lst), size):
            yield lst[ii:ii+size]

    chunks = chunkify(
        lst  = metadata_response.json()['ecosystem_responses'],
        size = 3
    )

    for metadata_response_chunk in chunks
        ecosystem_uuids = map(lambda xx: xx['uuid'], metadata_response_chunk)

        data = {
            'ecosystem_event_requests': [],
        }

        for ecosystem_uuid in ecosystem_uuids:
            event_request = {
                'request_uuid':           str(uuid.uuid4()),
                'event_types':            ['create_ecosystem'],
                'ecosystem_uuid':         ecosystem_uuid,
                'sequence_number_offset': 0,
                'max_num_events':         10,
            }

            data['ecosystem_event_requests'].append(event_request)

        import pdb; pdb.set_trace()

        chunk_response = requests.post(
            bl_api_base + '/fetch_ecosystem_events',
            headers = {'Content-Type': 'application/json'},
            data    = json.dumps(data),
        )

        import pdb; pdb.set_trace()
        print(chunk_response)


if __name__ == '__main__':
    fetch_ecosystem_metadata()
```

