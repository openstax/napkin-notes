= Rendered Pages of Content, Statistics, Member Profiles, Lenses, etc =
 * See also [wiki:RSSFeeds RSS and Atom Feeds]

== Content ==
Modules [[BR]]

 * HTML : !http://cnx.org/content/[moduleid] e.g. The Basic CNXML http://cnx.org/content/m9000 [[BR]]
 * HTML of module body only (no css) : !http://cnx.org/content/[moduleid]/[latest | version]/body e.g. The Basic CNXML http://cnx.org/content/m9000/latest/body [[BR]]
 * MDML of the metadata for a module : !http://cnx.org/content/[moduleid]/[latest | version]/metadata e.g. The Basic CNXML http://cnx.org/content/m9000/latest/metadata [[BR]]
    * Note that this metadata is not exactly the same as the MDML that comes with the module. I think it is a superset, but no guarantees. For instance, derived-from is only available through /metadata and not in the module itself.
 * PDF :  !http://cnx.org/content/[moduleid]?format=pdf
 * EPUB : !http://cnx.org/content/[moduleid]?format=epub
 * XML (CNXML) Source :  !http://cnx.org/content/[moduleid]/[version]/source e.g. The Basic CNXML http://cnx.org/content/m9000/latest/source [[BR]]
 * Statistics : !http://cnx.org/content/content_statistics?objectId=[moduleId] eg. http://cnx.org/content/content_statistics?objectId=m9000
 * Clean Metadata in MDML format : !http://cnx.org/content/<moduleid>/<latest|version>/metadata eg. http://cnx.org/content/m12292/latest/metadata
     * Currently, some of the source files have missing metadata, but this /metadata method should deliver clean, complete metadata
 * Metadata, attribution info, and version history : !http://cnx.org/content/[moduleId]/[version]/content_info eg. http://cnx.org/content/m9000/latest/content_info
 * Module Export Zip : !http://cnx.org/content/[moduleid]/[version]/module_export?format=zip
   * Contains the cnxml (index.cnxml) and images and media files.
   * Contains a version of the cnxml upgraded to the latest cnxml version called "index_auto_generated.cnxml". This is useful for offline services so that you don't have to support multiple versions of the xml language even though the repository contains content authored in earlier versions.
 * Offline HTML Zip : !http://cnx.org/content/[moduleid]/[version]/module_export?format=offline
   * Contains the cnxml (index.cnxml), images and media files along with an HTML version of the module content.
 * Docbook
   * Inside the Offline HTML Zip, find the docbook inside /content/index.dbk
 * Show a module inside a particular collection : !http://cnx.org/content/[moduleId]/[version or latest]/?collection=[collectionId] eg. http://cnx.org/content/m32709/latest/?collection=col11136
   * You can't fool it into showing a module in some collection that doesn't contain it, though.
 * JSON metadata: !http://cnx.org/content/[moduleid]/[version]/json.metadata or for a JSON version of the cnxml: !http://cnx.org/content/[moduleid]/[version]/json eg. http://cnx.org/content/m9003/latest/json.metadata
 * Sword/!AtomPub import: http://cnx.org/sword, !http://cnx.org/Members/[memberId], !http://cnx.org/GroupWorkspaces/[workgroupId]/sword

Collections [[BR]]

 * HTML: !http://cnx.org/content/[collectionid] e.g. Baraniuk's Signals and Systems http://cnx.org/content/col10064
 * MDML of the metadata for a collection : !http://cnx.org/content/[collectionid]/[latest | version]/metadata e.g. Collaborative Statistics http://cnx.org/content/col10522/latest/metadata [[BR]]
 * PDF :  !http://cnx.org/content/[collectionid]/[latest|versionid]/pdf ex. cnx.org/content/col10522/latest/pdf
   * or !http://cnx.org/content/[collectionid]?format=pdf ex. cnx.org/content/col10522?format=pdf
 * EPUB : !http://cnx.org/content/[collectionid]/[latest|versionid]/epub ex cnx.org/content/col10522/latest/epub
   * or !http://cnx.org/content/[collectionid]?format=epub
 * XML (CollXML file) : !http://cnx.org/content/[collectionid]/[latest|version]/source
 * Clean Metadata in MDML format : !http://cnx.org/content/<collectionid>/<latest|version>/metadata eg. http://cnx.org/content/col10522/latest/metadata 
 * XML (CollXML file(s) zipped) : !http://cnx.org/content/[collectionid]/[version]/@@collxml
   * this is currently just a zip with the collxml file in it but a version history and ancillary file are defined for the future.
   * Currently /latest/collxml does not work, because of a url redirect so you have to use the @@ form.
 * Complete Export Zip : !http://cnx.org/content/[collectionid]/[latest|version]/complete
   * This has the collection XML, plus zip exports of all the contained modules
 * Offline HTML Zip : !http://cnx.org/content/[collectionid]/[latest|version]/offline
   * Same as complete export zip, but includes an HTML version of the collection contents
 * Docbook : Obtain the offline zip and look for "collection.dbk" inside the "content" folder
 * RDF (in XML) :  !http://cnx.org/content/[collectionid]/[latest|version]/RDF
 * Statistics : !http://cnx.org/content/content_statistics?objectId=[collectionId] eg. http://cnx.org/content/content_statistics?objectId=col10522
 * Metadata, attribution info, and version history : !http://cnx.org/content/[collectionid]/[latest|version]/content_info e.g. http://cnx.org/content/col10064/1.11/content_info
 * LaTeX : !http://cnx.org/content/[collectionid]/[latest|version]/latex

== Statistics ==
 * Basic site statistics -- http://cnx.org/stats
 * Content statistics
   * Statistics over 1 week and all time [[BR]]
   * !http://cnx.org/content/content_statistics?objectId=[objectId] eg. http://cnx.org/content/content_statistics?objectId=col10449
 * Author Statistics
   * From all these views you can download a spreadsheet of the statistics
   * Statistics on usage of this author's work
     * eg. http://cnx.org/content/expanded_browse_authors?author=cnxorg&subset=by&view_mode=statistics
   * Materials derived from this author's work
     * eg. http://cnx.org/content/expanded_browse_authors?author=cnxorg&subset=derivedfrom&view_mode=statistics
   * Collections using materials by this author
     * eg. http://cnx.org/content/expanded_browse_authors?author=cnxorg&subset=containers&view_mode=statistics
 * Lens Content Statistics
   * !http://cnx.org/lenses/[lensowner]/[lensname]?&view_mode=statistics  eg. http://cnx.org/lenses/cnxorg/featured?&view_mode=statistics
     * From this view you can download a spreadsheet of the statistics.

== Member profiles ==
!http://cnx.org/member_profile/[account_id] -- e.g. http://cnx.org/member_profile/niorg

== Lenses ==
http://cnx.org/lenses [[BR]] http://cnx.org/lenses/endorsements [[BR]] http://cnx.org/lenses/affiliations [[BR]] http://cnx.org/lenses/memberlists [[BR]] http://cnx.org/lenses/[account_id] e.g. National Instrument's lens:  http://cnx.org/lenses/niorg

Lenses and lens contents are also available as RSS feeds -- [wiki:RSSFeeds#Lenses]

== Random Content ==
Random Course[[BR]] http://cnx.org/content/randomContent?portal_type=Collection

Random Module[[BR]] http://cnx.org/content/randomContent?portal_type=Module
