# Themes

- mixins for everything; no root-level selectors.
  - how to name mixins so they do not collide?

# File Org

- LESS file path matches the browser URL
  - can include subfiles

# classes in the right place

- root react tag (Shell Component) sets a classname that is specific to the screen
  - so we can change margins and stretch elements (like learning guide)
  - means <body> tag needs to remove margins and things
  - maybe need to move the top bar into each Shell Component so the main class is in the right place

# shared components

- common Components used inside many screens
  - ArbitraryHTML
  - icons
  - dialog (close button)


# Example structure for Student HW
- Shell
  - top bar
  - main area
    - contains panels (builder, learning guide, calendar) or multiple cards (dashboard)
    - Task
      - Step
        - Question
  - footer


# snap elements

How to handle them? They may need to be elsewhere in the DOM (like the "Continue" button in a HW)
