## Recording Deployment Info With Manifestly

Currently, devops attempts to call `manifestly upload` whenever a manifest is used so that they can record where the manifest was used with that action's `--message`, e.g.

```
$> manifestly upload --file=some.manifest --repo=openstax/deploy-manifests --repo_file=tutor --message="Deployed to production"
```

While fine to try this, this was not the intent of the `upload` action; `upload` is meant to upload a new manifest so that it can be shared with others.  Also, because of the way that manifestly uses git commits to store manifests, this method of storing messages breaks down when one tries to upload the same manifest multiple times in a row (git won't allow it because the file contents are identical).  In an bug-free world, one created manifest would be deployed to dev, qa, staging, and then production without changes, so the `upload` approach for remembering what is deployed when and where is not great.

The proposal in this note is to provide a new manifestly action for recording where manifests are deployed.

```
$> manifestly deployed --repo=openstax/deploy-manifests --repo_file=tutor --sha=923892b --to=production
```

Which will record this information in the manifests repo in one of the following four ways:

### Human Readable / Multi File Per Manifest Name

**https://github.com/openstax/deploy-manifests/tutor/deploys/all**
> `At 2016-02-17T21:43:00Z deployed 923892B29839283DAB023902 to production`

**https://github.com/openstax/deploy-manifests/tutor/deploys/production**
> `At 2016-02-17T21:43:00Z deployed 923892B29839283DAB023902`

### Human Readable / Single File Per Manifest Name

**https://github.com/openstax/deploy-manifests/tutor/deploys**
> `At 2016-02-17T21:43:00Z deployed 923892B29839283DAB023902 to production`

### Machine Readable / Single File Per Manifest File

(uses http://jsonlines.org/ formatting, each line is a single JSON value)

**https://github.com/openstax/deploy-manifests/tutor/deploys**
> `{sha: '923892B29839283DAB023902', to: 'production', at: '2016-02-17T21:43:00Z'}`

### Machine Readable / Single File for All

**https://github.com/openstax/deploy-manifests/deploys**
> `{file: 'tutor', sha: '923892B29839283DAB023902', to: 'production', at: '2016-02-17T21:43:00Z'}`

The `--to` option could be practically anything, especially in the machine-readable storage options.  Devops could decide the best way to describe where code is being deployed.

Regardless of how we store the data in git, manifestly would have an action for reading deployment information:

```
$> manifestly deployments --repo=openstax/deploy-manifests --repo_file=tutor --to=production
```

which would list all deployments to production in the console.  The `--to` would be optional, and would default to showing all deployments.

We could also add a `--format=human` or `--format==rev.txt` option to give output formatted for direct dump into what we now have for the `rev.txt` file, e.g.

```
$> manifestly deployments --repo=openstax/deploy-manifests --repo_file=tutor --to=production --format=human > rev.txt
```

## Misc

### --message on upload

With this proposal the `--message` option on `upload` would no longer be used to record deployments, but would instead just be a way to record some side information about why the manifest was created.  Alternatively, the message could record a RC number.

### --message on deployed?

Do we want to be able to add
