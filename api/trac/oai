= OAI and !OpenSearch - Getting Connexions metadata =


Metadata for Connexions content (modules and courses) is currently available via two interfaces: OAI-PMH and !OpenSearch. OAI-PMH is a harvester protocol, focused on metadata. !OpenSearch is more of a search interface aggregator, whose output is an RSS feed. There is also a Connexions extension of Dublin Core that adds more metadata(cnx_dc).

== OAI-PMH ==

OAI Verbs and arguments from http://www.openarchives.org/OAI/2.0/openarchivesprotocol.htm

=== Examples of use ===

  * http://legacy.cnx.org/content/OAI?verb=Identify
    * We support !DublinCore, Connexions extended DC, and IMS metadata formats:

  * http://legacy.cnx.org/content/OAI?verb=ListMetadataFormats

  * http://legacy.cnx.org/content/OAI?verb=ListIdentifiers&metadataPrefix=oai_dc&from=2015-09-25T00:00:00Z

  * http://legacy.cnx.org/content/OAI?verb=GetRecord&metadataPrefix=oai_dc&identifier=oai:cnx.org:m12391

  * http://legacy.cnx.org/content/OAI?verb=GetRecord&metadataPrefix=cnx_dc&identifier=oai:cnx.org:m12391

  * http://legacy.cnx.org/content/OAI?verb=GetRecord&metadataPrefix=ims1_2_1&identifier=oai:cnx.org:m12391

''NOTE:'' For performance reasons, we currently cache the results of unconstrained !ListRecords and !ListIdentifiers requests for an extended period (currently up to 7 days) Be sure to use the returned !ResponseDate as the basis for further incremental updates

== cnx_dc ==

cnx_dc is a Connexions extension of the Dublin Core format. It provides additional Connexions metadata such as

    * Translator
    * Sponsor
    * Funder
    * Connexions Subject

=== Examples of use: ===

  * http://legacy.cnx.org/content/OAI?verb=GetRecord&metadataPrefix=cnx_dc&identifier=oai:cnx.org:m12391

== OAI-PMH Extension: !SearchRecords verb ==

 * http://legacy.cnx.org/content/OAI?verb=SearchRecords&metadataPrefix=oai_dc&query:list=digital&b_start:int=10&b_size=10
   * Required Arguments:
     * metadataPrefix
        * one of 'oai_dc', 'cnx_dc' or 'ims1_2_1'
   * query:list ( or multiples)
      * query:list=digital
      * query=digital&query=signal i.e. once for each search term
      * query:list=digital%20signal i.e. equivalent to "digital signal"

   * Optional Arguments:
     * b_start:int
         * offset into records (0 based)
     * b_size:int
         * number records returned (default 10) Magic value: -1 means whole resultset
     * sorton
         * field to sort on (defaults to weight)
         * valid values: 'weight', 'popularity', 'views', 'language', 'revised', 'title', 'portal_type'
     * weights.<fieldname>:int:record
       * weighting of fields to search
       * example: weights.author:int:record=10
       * (limits search to author field only)
       * weights.abstract:int:record=1&weights.title:int:record=10
       * (limits search to abstract and title, w/ a title match worth 10 times an abstract match)
         * valid field names: fulltext, abstract, subject, keyword, author, translator, editor, maintainer, licensor, institution, exact_title, title, language, containedIn, parentAuthor, containedAuthor, objectid 

== !OpenSearch ==

Info found at: http://opensearch.a9.com/
=== Examples of use: ==

  * http://legacy.cnx.org/content/opensearchdescription/
  * http://legacy.cnx.org/content/opensearch?words=spectrum%20analyzer

Since !OpenSearch subsumes RSS, a bookmark of an opensearch search against the Connexions repository amounts to an RSS feed of results for that search, returned in rank order.
