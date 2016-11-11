# Preparation

1. Install https://atom.io
1. Get the cnxml RNG Schema files
  - **From a terminal:** Run `git clone https://github.com/Connexions/cnxml ~/cnxml-for-jing`
  - It should have a path and file named `cnxml/xml/cnxml/schema/rng/0.7/cnxml-jing.rng`

# Install

1. Start up atom
1. Install the `linter-autocomplete-jing` package
  1. Type <kbd>⌘</kbd>+<kbd>,</kbd> (for Mac) to open Settings (or click **Atom**, **Preferences...** in the menu bar)
  1. Click **Install** in the left-hand-side
  1. Enter `linter-autocomplete-jing` and click **Install**
1. Edit `~/.atom/config.cson` by clicking **Atom**, **Config** in the menu bar and add the following lines (at the bottom of this document)
1. Restart Atom
1. Open an unzipped complete-zip. (I run `atom ~/Downloads/col1234_complete` **From a terminal**)
1. Verify by opening an `index.cnxml` file and typing in `<figure>` somewhere in the file. If it is a valid location then it should auto-add `id=""` for you


Changes to `~/.atom/config.cson`:

```cson

"*":
  core:
    customFileTypes:

      # Add this to the bottom of the customFileTypes area.
      # Note: Indentation is important!
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
              path: "~/cnxml-for-jing/cnxml/xml/cnxml/schema/rng/0.7/cnxml-jing.rng"
            }
          ]
      }
    ]
```
