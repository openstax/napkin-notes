# Preparation

1. Install https://atom.io
1. Get the cnxml RNG Schema files
  - Run `git clone https://github.com/Connexions/cnxml /path/to/some/place/you/will/not/forget`
  - It should have a path and file named `cnxml/schema/rng/0.7/cnxml-jing.rng`
  - **Note:** Remember the path to this file because you will need to provide it in the `~/.atom/config.cson`

# Install

1. Start up atom
1. Install the `linter-autocomplete-jing` package
  1. Type <kbd>⌘</kbd>+<kbd>,</kbd> (for Mac) to open Settings (or click **Atom**, **Preferences**... in the menu bar)
  1. Click **Install** in the left-hand-side
  1. Enter `linter-autocomplete-jing` and click **Install**
1. Edit `~/.atom/config.cson` and add the following lines to the file
  - **Note:** You need to change the path to the RNG file in the example below
1. Restart Atom
1. Open an unzipped complete-zip. (I do `atom ~/Downloads/col1234_complete`)
1. Verify by opening an `index.cnxml` and typing in `<figure>` somewhere in the file. If it is a valid location then it should auto-add `id=""` for you


Changes to `~/.atom/config.cson`:

```cson

"*":
  core:
    customFileTypes:

      # Add this to the bottom of the customFileTypes area
      "text.xml": [
        "index.cnxml"
      ]


  # And then this to the bottom of the file
  # 1. Make sure "linter-autocomplete-jing" only occurs once in this file!
  # 1. make sure it is indented by 2 spaces just like it is in this example.

  "linter-autocomplete-jing":
    displaySchemaWarnings: true
    rules: [
      {
        priority: 1
        test:
          pathRegex: ".cnxml$"
        outcome:
          schemaProps: [
            {
              lang: "rng"
              path: "/Users/phil/Downloads/xml-catalog/cnxml/schema/rng/0.7/cnxml-jing.rng"
            }
          ]
      }
    ]
```
