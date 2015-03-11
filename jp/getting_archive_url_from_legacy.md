The content team currently writes their content on the legacy CNX system.  The Tutor dev team needs to pull new-style content from archive.cnx.org.  Here's how to get from a legacy URL to a CNX URL:

## One way

1. Say you're given the following legacy URL: `http://legacy.cnx.org/content/col11768/latest/`
2. Go to that URL and click the "Start >" link.
3. There will be a pink box at the top that says: "Note: You are viewing an old style version of this document. The new style version is available here."
4. Click the link at the end of that box.
5. In this example we are taken to `http://cnx.org/contents/7db9aa72-f815-4c3b-9cb6-d50cf5318b58@2.1:1/Updated_Tutor_HS_Physics_Conte`
6. To get JSON from this, change `cnx.org` to `archive.cnx.org`, and replace everything from the colon on with `.json`.
7. Tada!

## Another way

Just replace "legacy" with "archive" and you'll be redirected.
