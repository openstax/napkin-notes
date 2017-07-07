= OERPub SWORD V2 Interface = 
[[PageOutline]]
This document covers the Connexions implementation of the OERPub profile of the SWORD V2 specification. OERPub can be used to deposit anything that Connexions normally accepts and if needed, convert it to Connexions format and then place it into a Connexions author's or editor's content areas (personal workspace or shared work group). Authors can also update their modules via the API, checkout a new version, derive a copy, or publish existing content. Authors and contributors will always need to come to Connexions to check the license before initial publish. 

 * [wiki:TechnicalDocumentation/Code/SwordV1 Instructions for the OJS/METSDSpaceSIP SWORD documentation]: If you are looking for the OJS support, it still works with the new version and this page has the complete documentation.

== Service Discovery ==
[[Image(OERPub-Service-Flow.png)]]
 * Service discovery is done by retrieving a service document that lists all of the content areas that an author can deposit to. It is always authenticated.

=== Authenticated Service Discovery ===
Reference: See [https://docs.google.com/document/d/1hMvUA3oevZhUG2vo3IEiHCr-yMNCFXDambzalOM-XKU/edit?hl=en_US#heading=h.csy56woxqr2s Section 6.l in the OERPub Specification] 

The Service Discovery XML is accessed by performing a GET on the URL http://legacy.cnx.org/sword/servicedocument.  An Authenticated request requires that a User-Agent header along with a Basic Authorization header be sent with the Service request.  An example of the request is 
{{{
GET http://legacy.cnx.org/sword/servicedocument
User-Agent: userid
Authorization: Basic wQf4FoEW5Ms?
}}}

An Authenticated request returns XML that specifies locations where content may be deposited based on the User Id sent in the header.  The locations are the user's Workspace and any Workgroups the user is a member of.  

Example Authenticated Response XML:
{{{
<?xml version="1.0" encoding="UTF-8"?>
<service xmlns="http://www.w3.org/2007/app" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:sword="http://purl.org/net/sword/terms/" xmlns:dcterms="http://purl.org/dc/terms/">
    <sword:version>2.0</sword:version>
    <sword:maxuploadsize>10485760</sword:maxuploadsize>
    <workspace>
        <atom:title>Connexions</atom:title> 
            <collection href="http://legacy.cnx.org/Members/cnxorg/sword">
                <atom:title>Personal Workspace</atom:title>
                <accept>*/*</accept>
                <accept alternate="multipart/related"/>
                <sword:acceptPackaging>http://purl.org/net/sword/package/SimpleZip</sword:acceptPackaging>
                <sword:mediation>false</sword:mediation>
                <sword:treatment>Upload a word processing document, LaTeX document, or Connexions XML to create a module.</sword:treatment>                
                <dcterms:abstract>Home page area that contains the items created and collected by cnxorg</dcterms:abstract>
            </collection>
            <collection href="http://legacy.cnx.org/GroupWorkspaces/wg1564/sword">
                <atom:title>Tests</atom:title>
                <accept>*/*</accept>
                <accept alternate="multipart/related"/>
                <sword:acceptPackaging>http://purl.org/net/sword/package/SimpleZip</sword:acceptPackaging>
                <sword:mediation>false</sword:mediation>
                <sword:treatment>Upload a word processing document, LaTeX document, or Connexions XML to create a module.</sword:treatment>
                <sword:collectionPolicy>The following Connexions members can create and edit modules in this workgroup: cnxorg, kef</sword:collectionPolicy>
                <dcterms:abstract/>
            </collection>
            <collection href="http://legacy.cnx.org/GroupWorkspaces/wg2096/sword">
                <atom:title>Applied Finite Mathematics</atom:title>
                <accept>*/*</accept>
                <accept alternate="multipart/related"/>
                <sword:acceptPackaging>http://purl.org/net/sword/package/SimpleZip</sword:acceptPackaging>
                <sword:mediation>false</sword:mediation>
                <sword:treatment>Upload a word processing document, LaTeX document, or Connexions XML to create a module.</sword:treatment>
                <sword:collectionPolicy>The following Connexions members can create and edit modules in this workgroup: Awill271, UniqU, cnxorg, dcwill, dcwillman, jaredadler, sanura</sword:collectionPolicy>
                  <dcterms:abstract>This workgroup contains the Applied Finite Mathematics textbook. </dcterms:abstract>
            </collection>
    </workspace>
</service>
}}}
 * XML Element Details
||'''Element'''||'''Description'''||
||collection|| URL used to access an atom/sword collection, which is the deposit location. For Connexions, these are a user's workspaces and workgroups||
||accept|| lists the mime-type accepted by the service||
||acceptPackaging || lists the package types accepted by the service : SimpleZip ||
||mediation || whether or not a user can login on behalf of actions of another : false for Connexions ||
||treatment || description of the actions that the deposit will undergo||
||abstract || description of the particular collection (work area). For shared work groups collaborators can describe their workgroup ||
||collectionPolicy || who can deposit to this work area ||
||maxuploadsize || The maximum size of a deposit. ||

The Authorized Service Discovery Workflow is:
   * GET request is received   
   * User is authenticated using Basic Auth.
   * If User is authenticated
      * Response XML with user's content entry \URLs is returned
   * If user is not authenticated
      * HTTP error code is returned.

== OERPub over HTTPS ==

The examples included show basic HTTP, but as of the Milestone 4 release, all OERPub actions can use HTTPS and thus protect the user's id and password. 

== Module creation ==
[[Image(OERPub-ModuleCreation-Flow.png)]]

Reference: See [https://docs.google.com/document/d/1hMvUA3oevZhUG2vo3IEiHCr-yMNCFXDambzalOM-XKU/edit?hl=en_US#heading=h.39zbkrc7n76l Section 6.3 "Creating a Resource/Module" in the OERPub Specification]

Module creation is initiated by performing a POST to one of the work area URL's (collections) returned by Service Discovery. New modules can either be created empty using just an atom entry (and later filled) or can be created with an atom multipart with both metadata in the atom entry and content in the media part. Details about the metadata and content allowed are given in tables, below, but first an example showing module creation with an atom multipart.

=== Module creation workflow ===

The '''"In-progress: true"''' header should always be specified for module creation to prevent the service from attempting to publish the module. The module will fail to publish because authors must use the Connexions user interface to agree to license their work on Connexions before it is published. (Subsequent versions will not require reauthorization).

An Example request:
{{{
POST http://legacy.cnx.org/GroupWorkspaces/g400/sword HTTP/1.1
Host: legacy.cnx.org
Authorization: Basic ZGFmZnk6c2VjZXJldA==
Content-Length: [content length]
Content-Type: multipart/related;
            boundary="===============1605871705==";
            type="application/atom+xml"
In-Progress: true
MIME-Version: 1.0

Media Post
--===============1605871705==
Content-Type: application/atom+xml; charset="utf-8"
Content-Disposition: attachment; name="atom"
MIME-Version: 1.0

<?xml version="1.0"?>
<entry xmlns="http://www.w3.org/2005/Atom"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:dcterms="http://purl.org/dc/terms/"
       xmlns:oerdc="http://legacy.cnx.org/aboutus/technology/schemas/oerdc">

    <!-- The atom title, author, and summary are informational and will not be used to populate the module. They can be left out. -->
    <title>Basic Math</title>
    <author><name>Keith Frielander</name></author>
    <summary type="text">The latest and greatest.</summary>

    <!-- The metadata below is used to initialize the module -->
    <dcterms:title>Basic Math</dcterms:title>
    <dcterms:abstract>The latest and greatest.</dcterms:abstract>
    <dcterms:creator oerdc:id="kfried"></dcterms:creator> <!-- Note that you don’t have to give anything but the contributor’s userid -->
    <oerdc:maintainer oerdc:id="kfried" /> <!-- CNX Clients should always give the depositor permission to publish by default -->
    <dcterms:rightsHolder oerdc:id="kfried" /> <!-- CNX Clients should always specify rightsHolder also -->
    <dcterms:creator oerdc:id="kef" /> <!-- Author can add their friend as a co-author also. -->
    <oerdc:maintainer oerdc:id="kef" /><!-- and allow her to publish -->
    <dcterms:rightsHolder oerdc:id="kef" /><!-- And make sure she gets copyright also-->

    <oerdc:oer-subject>Mathematics and Statistics</oerdc:oer-subject>  <!-- Vocabulary-controlled Connexions specific subject categorization --> 
    <dcterms:subject>addition</dcterms:subject> <!-- Unconstrained author-supplied keywords <md:keyword> -->
    <dcterms:subject>subtraction</dcterms:subject> 
    <dcterms:language xsi:type="ISO639-1">en</dcterms:language>   
    <oerdc:analyticsCode>UA-4688042-1</oerdc:analyticsCode> 
</entry>
--===============1605871705==
Content-Type: application/zip
Content-Disposition: attachment; name=payload; filename=[filename]
Packaging: http://purl.org/net/sword/package/SimpleZip
Content-MD5: [md5-digest]
MIME-Version: 1.0

[...binary package data...]
--===============1605871705==--

}}}

Module creation Workflow:
   * Authenticate user
   * User will be authenticated using Basic Auth
   * Create a new module in the location specified by the URL.
   * Add the specified metadata to the module.
   * If no authorship metadata is received, the depositor will be given author, licensor, and maintainer roles.
   * Attempt to import the specified content document into the new module
   * Return HTTP Success code and SWORD Deposit Receipt
   * If there is an error, return SWORD Error report along with the appropriate HTTP code.

Example Module creation response XML:
{{{
HTTP/1.1 201 Created
Date: Mon, 18 August 2008 14:27:11 GMT
Content-Length: nnn
Content-Type: application/atom+xml; charset="utf-8"
Location: http://legacy.cnx.org/GroupWorkspaces/g400/module.2006-04-07.3344418727

[Deposit Receipt]

}}}

=== Metadata that can be set in the atom entry ===
For reference, the complete metadata specification is at [https://docs.google.com/document/d/1hMvUA3oevZhUG2vo3IEiHCr-yMNCFXDambzalOM-XKU/edit?hl=en_US#heading=h.8pat6j1s0m8g Section 4 of the OERPub implementation document]

||'''Element'''|| '''Encoding''' || '''Description''' ||
|| Title || <dcterm:title> || The module title ||
|| Summary || <dcterms:abstract> || A short summary of the module purpose and contents for educators and learners ||
|| Language || <dcterms:language> || The language that the module is written in ||
|| Keywords || <dcterms:subject> || Keywords that help describe the module. Keywords can be multiword. Each keyword should be enclosed  in its own tag. ||
|| Subject Area || <oerdc:oer-subject> || One of the OER Commons main subject areas:  Arts • Business • Humanities • Mathematics & Statistics • Science & Technology • Social Sciences ||
|| Author || <dcterms:creator oerdc:id="{cnx-userid}"> || An author of the module. The Connexions userid must be included. There must be at least one to publish ||
|| Maintainer || <oerdc:maintainer oerdc:id="{cnx-userid}"> || An uncredited role that is allowed to edit and publish the module. Must be at least one. The Connexions userid of the author must be included.||
|| Licensor || <dcterms:rightsHolder oerdc:id="{cnx-userid}"> || The copyright owner of the module. The Connexions userid of the rightsholder must be included.Must be at least one.||
|| Editor || <oerdc:editor oerdc:id="{cnx-userid}"> || An editor of the module. Optional. The Connexions userid of the editor must be included.||
|| Translator || <oerdc:translator oerdc:id="{cnx-userid}"> || A translator of the module. Optional. The Connexions userid of the translator must be included. ||
|| Description of Changes  || <oerdc:descriptionOfChanges> || Not required for new modules but useful for new versions and new derived copies of existing modules.||
|| Analytics Code || <oerdc:analyticsCode> || Only Google Analytics is supported at this time. If a GA code is provided, then the module will be instrumented so that Google Analytics counts views and downloads. ||

=== Metadata defaults ===

The following defaults will be used for metadata when no metadata for that item is provided in the deposit.
  * title: “(Untitled)" : Note that the module will not successfully publish with this title.
  * abstract/summary: leave empty
  * language: ‘en’
  * keyword: none
  * subject area: none
  * contributor roles : Note: contributor role defaults only apply if NO contributors are specified in an atom entry.  For instance, although the author default is the credentialed user making the deposit, if the deposit has any contributors specified (even an editor/translator), then the defaults will not apply. This is necessary to make it possible to exactly specify the roles through the API.
     * author : credentialed user making the deposit
     * maintainer/copy-editor: credentialed user making the deposit
     * licensor : credentialed user making the deposit
     * translator: none
     * editor: none
  * descriptionOfChanges : “Created Module" for never-published modules and blank for all other cases.
  * analyticsCode : none

=== Setting Featured Links in the CNXML ===
As of the milestone 4 release, featured links can be added and updated by including them in the CNXML <featured-links> section.

The featured links section goes between the <metadata> section and the <content> section, so it is important to make sure that links to other modules in the repository are specified as a complete URL.

'''NOTE''': The API accepts '''only fully qualified URL's''' in the links import.

Example Featured Links Section:
{{{
<featured-links>
  <!-- WARNING! The 'featured-links' section is read only. Do not edit below.
       Changes to the links section in the source will not be saved. -->
    <link-group type="supplemental">
      <link url="http://cnx.rice.edu/content/m11060/latest/"
            strength="2">Physics and Music</link>
    </link-group>
    <link-group type="prerequisite">
      <link url="http://cnx.rice.edu/content/m10856/latest/"
            strength="3">Minor Keys</link>
      <link url="http://cnx.rice.edu/content/m10851/latest/"
            strength="3">Major Keys</link>
      <link url="http://cnx.rice.edu/content/m10867/latest/"
            strength="3">Interval</link>
      <link url="http://legacy.cnx.org/content/m10881/latest/"
            strength="3">Key Signature</link>
    </link-group>
  <!-- WARNING! The 'featured-links' section is read only. Do not edit above.
       Changes to the links section in the source will not be saved. -->
</featured-links>
}}}

=== Accepted Content in the Simple Zip ===

The zip can contain one of the following:
 * .doc, .docx, .ods, .sxw : A single word processing file, as well as resources that the document links to. The word processing file will be transformed to Connexions XML format.
 * LaTeX file and resources, zipped in the way that the LaTeX importer expects them.
 * index.cnxml - a valid CNXML file and any media resources associated with it. '''Note''': Featured Links will be imported, but all metadata inside CNXML will be ignored.
 * media files alone which will be added as resources and can be found under the Files tab in the Module Editor

=== Creating a New Version or Derived Copy ===
 
==== New Version ====

To create a new version of published content, the client issues a POST to a work area with an Atom Entry that contains “isVersionOf" with the URL of published content that this should be a new version of. The user requesting the new version must have some authorized role on the module already. 

Connexions will create a new version of the specified module in the editing area specified. The module will start out with the contents of the latest version. 

Example: Creating a new version of module m9000.
{{{
POST http://legacy.cnx.org/Members/kef/sword/ HTTP/1.1
Host: legacy.cnx.org
Authorization: Basic ZGFmZnk6c2VjZXJldA==
Content-Type: application/atom+xml;type=entry
In-Progress: true
<?xml version="1.0"?>
<entry xmlns="http://www.w3.org/2005/Atom" 
       xmlns:dcterms="http://purl.org/dc/terms/"    xmlns:oerdc="http://legacy.cnx.org/aboutus/technology/schemas/oerdc">
  
     <dcterms:isVersionOf>http://legacy.cnx.org/content/m9000</dcterms:isVersionOf>
</entry>  
}}}

Server Response:
{{{
201 Created
Location: http://legacy.cnx.org/Members/kef/m9000/sword
[Deposit Receipt]
}}}

==== Derived Copy ====

To create a derived copy of published content, the client issues a POST to a Connexions editing work area with an Atom Entry that contains “dc:source" with the URL of published content that this should be derived from. A derived copy is an independent adaptation that is either not by any of the original contributors, or where the original authors are involved, but this is not a version, but rather an alternate adaptation (translation etc.) Connexions will populate the derived copy with the contents of the parent source to begin the adaptation.

In the Deposit Receipt, the sword:treatment element will specify that a derived copy of the parent content was created. 

Example: Creating a derived copy of module m9000
{{{
POST /Members/kef/sword/ HTTP/1.1
Host: legacy.cnx.org
Authorization: Basic ZGFmZnk6c2VjZXJldA==
Content-Type: application/atom+xml;type=entry
In-Progress: true
<?xml version="1.0"?>
<entry xmlns="http://www.w3.org/2005/Atom" 
        xmlns:dcterms="http://purl.org/dc/terms/"    xmlns:oerdc="http://legacy.cnx.org/aboutus/technology/schemas/oerdc">
          <dcterms:source>http://legacy.cnx.org/content/m9000</dcterms:source>
</entry>  
}}}

Server Response: Notice that the location changes and gives the derived copy a new temporary ID, rather than using m9000, the parent id. 

{{{
201 Created
Location: http://legacy.cnx.org/Members/kef/module.2011-10-22.6778035223/sword
[Deposit Receipt]
}}}

== Collections : Creating a new version or adaptation (derived copy) ==

Because Connexions doesn't currently have a way to import the collection structure (CollXML), the API only supports creating new versions or derived copies of existing collections. All collection editing must still take place using the Connexions user interface. 

=== Creating a New Version or Derived Copy of a Collection ===
 
==== New Version ====

To create a new version of published content, the client issues a POST to a work area with an Atom Entry that contains “isVersionOf" with the URL of published content that this should be a new version of. The user requesting the new version must have some authorized role on the collection already. 

Connexions will create a new version of the specified collection in the editing area specified. The collection will start out with the contents of the latest version. 

Example: Creating a new version of collection col10001.
{{{
POST http://legacy.cnx.org/Members/kef/sword/ HTTP/1.1
Host: legacy.cnx.org
Authorization: Basic ZGFmZnk6c2VjZXJldA==
Content-Type: application/atom+xml;type=entry
In-Progress: true
<?xml version="1.0"?>
<entry xmlns="http://www.w3.org/2005/Atom" 
       xmlns:dcterms="http://purl.org/dc/terms/"    xmlns:oerdc="http://legacy.cnx.org/aboutus/technology/schemas/oerdc">
  
     <dcterms:isVersionOf>http://legacy.cnx.org/content/col10001</dcterms:isVersionOf>
</entry>  
}}}

Server Response:
{{{
201 Created
Location: http://legacy.cnx.org/Members/kef/col10001/sword
[Deposit Receipt]
}}}

==== Derived Copy ====

To create a derived copy of published content, the client issues a POST to a Connexions editing work area with an Atom Entry that contains “dc:source" with the URL of published content that this should be derived from. A derived copy is an independent adaptation that is either not by any of the original contributors, or where the original authors are involved, but this is not a version, but rather an alternate adaptation (translation etc.) Connexions will populate the derived copy with the contents of the parent source to begin the adaptation.

In the Deposit Receipt, the sword:treatment element will specify that a derived copy of the parent content was created. 

Example: Creating a derived copy of collection col10001
{{{
POST /Members/kef/sword/ HTTP/1.1
Host: legacy.cnx.org
Authorization: Basic ZGFmZnk6c2VjZXJldA==
Content-Type: application/atom+xml;type=entry
In-Progress: true
<?xml version="1.0"?>
<entry xmlns="http://www.w3.org/2005/Atom" 
        xmlns:dcterms="http://purl.org/dc/terms/"    xmlns:oerdc="http://legacy.cnx.org/aboutus/technology/schemas/oerdc">
          <dcterms:source>http://legacy.cnx.org/content/col10001</dcterms:source>
</entry>  
}}}

Server Response: Notice that the location changes and gives the derived copy a new temporary ID, rather than using col10001, the parent id. 

{{{
201 Created
Location: http://legacy.cnx.org/Members/kef/collection.2011-10-22.6778035223/sword
[Deposit Receipt]
}}}


== The Deposit Receipt ==
Reference: [https://docs.google.com/document/d/1hMvUA3oevZhUG2vo3IEiHCr-yMNCFXDambzalOM-XKU/edit?hl=en_US#bookmark=id.da8g17ca161r Section 10: Deposit Receipt of OERPub Specification]

The publishing service returns a Deposit Receipt when new content is created. The deposit receipt contains useful links for further editing and for publishing the created modules, the SE-IRI (for updating metadata or metadata+content) and the EM-IRI (for updating content only). It contains a reflection of the module's metadata, including system generated metadata. It also contains a human readable <sword:treatment> section that provides information about any steps that the author will need to take before the module can be published, including links to relevant pages on Connexion for agreeing to license the work CC-BY.

=== The Generator Version ===

In order for clients to know what formats to expect in the deposit receipt, especially for things like the '''sword treatment''' element, the OERPUB API service in Connexions returns a version in the generator element as follows:

{{{<generator uri="rhaptos.swordservice.plone" version="1.1" /> }}}

=== Examples ===
Example Receipt:
{{{
<entry xmlns="http://www.w3.org/2005/Atom"
        xmlns:sword="http://purl.org/net/sword/"
        xmlns:dcterms="http://purl.org/dc/terms/"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:oerdc="http://legacy.cnx.org/aboutus/technology/schemas/oerdc">
    
    <title>Biology for Math Majors</title>
    <id>m10000</id>
    <updated>2011-06-22T14:27:08Z</updated>
    <summary type="text">This module explains biology to math majors by using as many equations as possible and as few pictures of veins and blood as possible.</summary>
    <generator uri="rhaptos.swordservice.plone" version="1.0"/>

    <!-- the item's metadata →
    <dcterms:identifier xsi:type="dcterms:URI">http://legacy.cnx.org/content/m10000/1.1/</dcterms:identifier>             <dcterms:identifier xsi:type="oerdc:Version">1.1</dcterms:identifier> 
    <dcterms:identifier xsi:type="oerdc:ContentId">m10000</dcterms:identifier> 
    <dcterms:title>Biology for Math Majors</dcterms:title>
    <dcterms:created>2010/08/10 11:41:00.383 GMT-5</dcterms:created> 
    <dcterms:modified>>2011-06-22T14:27:08Z</dcterms:modified> 
    <dcterms:creator oerdc:id="mrdwab" oerdc:email="ananda@mahto.info">Ananda Mahto</dcterms:creator>
    <dcterms:creator oerdc:id="kef" oerdc:pending="true"  oerdc:email="kef@somewhere.com">Keith Frielander</dcterms:creator> 
    <oerdc:maintainer oerdc:id="mrdwab" oerdc:email="ananda@mahto.info">Ananda Mahto</oerdc:maintainer>   <dcterms:rightsHolder oerdc:id="mrdwab" oerdc:email="ananda@mahto.info">Ananda Mahto</dcterms:rightsHolder> 
    <oerdc:translator oerdc:id="mrdwab" oerdc:email="ananda@mahto.info">Ananda Mahto</oerdc:translator>  <oerdc:editor oerdc:id="mrdwab" oerdc:email="ananda@mahto.info">Ananda Mahto</oerdc:editor> 

    <oerdc:oer-subject>Mathematics and Statistics</oerdc:oer-subject>
    <dcterms:subject xsi:type="oerdc:Subject">Mathematics and Statistics</dcterms:subject>   
    <dcterms:subject>box</dcterms:subject>       <!-- keywords -->
    <dcterms:subject>median</dcterms:subject> 
    <dcterms:subject>quartiles</dcterms:subject>
    <dcterms:source  xsi:type="dcterms:URI">http://legacy.cnx.org/content/m16296/1.8/</dcterms:source> <!-- derived from this parent -->
    <dcterms:abstract>This module explains biology to math majors by using as many equations as possible and as few pictures of veins and blood as possible.</dcterms:abstract>
    <dcterms:language xsi:type="ISO639-1">en</dcterms:language> 
    <dcterms:license xsi:type="dcterms:URI">http://creativecommons.org/licenses/by/3.0/</dcterms:license>

    <sword:treatment> Module “Biology for Math Majors" was converted from an original Word document using Connexions’ word processing conversion tools. The conversion tools attempt to preserve your content, but formatting may change and some image formats and complex tables and formulas may not import correctly.   
         * You can <a href="http://legacy.cnx.org/GroupWorkspaces/wg474/module.2011-08-08.7630455302/module_view" preview your module here</a> to see what it will look like once it is published.
     Publication Requirements
         1. You (Anando Mahto, account mrdwab) will need to <a href="http://legacy.cnx.org/GroupWorkspaces/wg474/module.2011-08-08.7630455302/cc_license">sign the license here</a>.
         2.  Contributor, Keith Frielander (account kfried), must <a href="http://legacy.cnx.org/GroupWorkspaces/wg474/module.2011-08-08.7630455302/collaborations?user=kfried">agree to pending role requests.</a>
    </sword:treatment>

    <link rel="alternate" href="http://legacy.cnx.org/Members/kef/m10000/module_view?format=html"/>   <!-- Connexions preview -->
    <content type="application/zip" src="http://legacy.cnx.org/Members/kef/m10000/sword/editmedia"/>  <!-- Cont-IRI -->
    <link rel="edit-media" href="http://legacy.cnx.org/Members/kef/m10000/sword/editmedia"/>          <!-- EM-IRI -->

    <link rel="edit" href="http://legacy.cnx.org/Members/kef/m10000/sword" />                         <!-- Edit-IRI -->
    <link rel="http://purl.org/net/sword/terms/add" href="http://legacy.cnx.org/Members/kef/m10000/sword"/> <!-- SE-IRI -->
    <link rel="http://purl.org/net/sword/terms/statement" type="application/atom+xml;type=feed" 
            href="http://legacy.cnx.org/Members/kef/m10000/sword/statement.atom"/>                    <!-- State-IRI -->
    <sword:packaging>http://purl.org/net/sword/package/SimpleZip</sword:packaging>
    <link rel="http://purl.org/net/sword/terms/derivedResource" 
            href="http://legacy.cnx.org/Members/kef/m10000/module_view?format=html"/>                 <!-- Online Preview -->    
    <link rel="http://purl.org/net/sword/terms/derivedResource" 
            href="http://legacy.cnx.org/Members/kef/m10000/"/>                                        <!-- URL to edit on Connexions -->
    <link rel="http://purl.org/net/sword/terms/derivedResource" 
            type="application/pdf" 
            href="http://legacy.cnx.org/Members/kef/m10000/module_view?format=pdf"/>                  <!-- PDF Preview -->
    <link rel="http://purl.org/net/sword/terms/derivedResource" 
            type="application/zip" href="http://legacy.cnx.org/Members/kef/m10000/module_export?format=zip"/> <!-- Zip Download -->
    <link rel="http://purl.org/net/sword/terms/derivedResource" 
            type="application/xml" href="http://legacy.cnx.org/Members/kef/m10000/module_export?format=plain"/> <!-- XML Download -->
</entry>
}}}

=== Retrieving the deposit receipt on published modules ===

The deposit receipt can be retrieved for a published module using one of the following URL patterns
  * legacy.cnx.org/content/<module-id>/<version>/sword (due to a bug, credentials are required, but any legitimate connexions account credentials may be used) 
  * legacy.cnx.org/content/<module-id>/<version>/rhaptos-deposit-receipt (no credentials required)

The current format of the deposit receipt does not take into account that the module has been published. Some URL's within the deposit receipt work as long as credentials are provided. The URL's with "module_view" in them do not work unless that piece is removed. This should be rectified in the next bug fixing round.

Current example deposit receipt.

{{{
<entry><!-- SWORD deposit receipt -->
<title>The Basic CNXML</title><id>2.36</id><updated>2009/04/10 14:04:42 GMT-5</updated>
<summary type="text">This is a basic introduction to the CNXML language.  It includes a description on how to begin a CNXML module and also examples of the basic tags needed to start writing in CNXML.</summary>
<generator uri="rhaptos.swordservice.plone" version="1.1"/><!-- The metadata begins -->
<dcterms:identifier xsi:type="dcterms:URI">http://legacy.cnx.org/content/m9000/2.36</dcterms:identifier>
<dcterms:identifier xsi:type="oerdc:Version">2.36</dcterms:identifier>
<dcterms:identifier xsi:type="oerdc:ContentId">2.36</dcterms:identifier>
<dcterms:title>The Basic CNXML</dcterms:title>
<dcterms:created>2001/02/07</dcterms:created>
<dcterms:modified>2009/04/10 14:04:42 GMT-5</dcterms:modified>
<dcterms:creator oerdc:id="rars" oerdc:email="ricky@alumni.rice.edu" oerdc:pending="False">Ricardo Radaelli-Sanchez</dcterms:creator>
<dcterms:creator oerdc:id="brentmh" oerdc:email="brentmh@rice.edu" oerdc:pending="False">Brent Hendricks</dcterms:creator>
<dcterms:creator oerdc:id="cnxorg" oerdc:email="cnx@cnx.org" oerdc:pending="False">Connexions</dcterms:creator>
<oerdc:maintainer oerdc:id="brentmh" oerdc:email="brentmh@rice.edu" oerdc:pending="False">Brent Hendricks</oerdc:maintainer>
<oerdc:maintainer oerdc:id="cnxorg" oerdc:email="cnx@cnx.org" oerdc:pending="False">Connexions</oerdc:maintainer>
<oerdc:maintainer oerdc:id="selc" oerdc:email="coppin@alumni.rice.edu" oerdc:pending="False">Sarah Coppin</oerdc:maintainer>
<oerdc:maintainer oerdc:id="mizar" oerdc:email="mizar@alumni.rice.edu" oerdc:pending="False">Christine Donica</oerdc:maintainer>
<oerdc:maintainer oerdc:id="charlet" oerdc:email="charletr@gmail.com" oerdc:pending="False">Charlet Reedstrom</oerdc:maintainer>
<dcterms:rightsHolder oerdc:id="rars" oerdc:email="ricky@alumni.rice.edu" oerdc:pending="False">Ricardo Radaelli-Sanchez</dcterms:rightsHolder><!-- CNX-Supported but not in MDML -->
<oerdc:descriptionOfChanges>
        Removed link to CNXML 0.5 Spec.
    </oerdc:descriptionOfChanges>
<oerdc:oer-subject>Science and Technology</oerdc:oer-subject>
<dcterms:subject xsi:type="oerdc:Subject">Science and Technology</dcterms:subject>
<dcterms:subject>CNXML</dcterms:subject><dcterms:subject>Connexions</dcterms:subject>
<dcterms:subject>content</dcterms:subject>
<dcterms:subject>document</dcterms:subject>
<dcterms:subject>markup</dcterms:subject>
<dcterms:subject>namespace</dcterms:subject>
<dcterms:subject>tag</dcterms:subject>
<dcterms:subject>XML</dcterms:subject>
<dcterms:abstract>This is a basic introduction to the CNXML language.  It includes a description on how to begin a CNXML module and also examples of the basic tags needed to start writing in CNXML.</dcterms:abstract><dcterms:language xsi:type="ISO639-1">en</dcterms:language>
<dcterms:license xsi:type="dcterms:URI">http://creativecommons.org/licenses/by/1.0</dcterms:license>
<sword:treatment>
        Module 'The Basic CNXML' was imported.
        You can <a href="http://legacy.cnx.org/content/m9000/2.36/module_view">preview your module here</a> to see what it will look like once it is published.
    
        The current description of the changes you have made for this version of the module: Removed link to CNXML 0.5 Spec.
        
    </sword:treatment>
<!-- For all UNPUBLISHED modules -->
<link rel="alternate" href="http://legacy.cnx.org/content/m9000/2.36/module_view?format=html"/>
<content type="application/zip" src="http://legacy.cnx.org/content/m9000/2.36/sword/editmedia"/>
<link rel="edit-media" href="http://legacy.cnx.org/content/m9000/2.36/sword/editmedia"/>
<link rel="edit" href="http://legacy.cnx.org/content/m9000/2.36/sword"/><link rel="http://purl.org/net/sword/terms/add" href="http://legacy.cnx.org/content/m9000/2.36/sword"/>
<link rel="http://purl.org/net/sword/terms/statement" type="application/atom+xml;type=feed" href="http://legacy.cnx.org/content/m9000/2.36/sword/statement.atom"/>
<sword:packaging>http://purl.org/net/sword/package/SimpleZip</sword:packaging>
<link rel="http://purl.org/net/sword/terms/derivedResource" 
href="http://legacy.cnx.org/content/m9000/2.36/module_view?format=html"/>
<link rel="http://purl.org/net/sword/terms/derivedResource" 
href="http://legacy.cnx.org/content/m9000/2.36/"/>
<link rel="http://purl.org/net/sword/terms/derivedResource" type="application/pdf" 
href="http://legacy.cnx.org/content/m9000/2.36/module_view?format=pdf"/>
<link rel="http://purl.org/net/sword/terms/derivedResource" type="application/zip" 
href="http://legacy.cnx.org/content/m9000/2.36/module_export?format=zip"/>
<link rel="http://purl.org/net/sword/terms/derivedResource" type="application/xml" 
href="http://legacy.cnx.org/content/m9000/2.36/module_export?format=plain"/>
<!-- END for all UNPUBLISHED modules --></entry>
}}}

== Listing the contents of a work area (SWORD collection) ==

To list the existing modules in a Connexions work area and obtain the SWORD URL's for updating them and publishing them, use a GET on the relevant collection URL returned in the Service Document.

Example request:
{{{
GET http://legacy.cnx.org/GroupWorkspaces/g400/sword HTTP/1.1
Host: legacy.cnx.org
Authorization: [Basic auth credentials]
}}}

Service returns:
{{{
Returns:
200 OK
<?xml-version="1.0" encoding=’utf-8’>
<feed xmlns="http://www.w3.org/2005/Atom"
        xmlns:sword="http://purl.org/net/sword/terms/">
     <entry>
	<title>Geometry - Grade 10</title>
<link rel="edit" href="http://legacy.cnx.org/GroupWorkspaces/g400/module.2006-04-07.3344418727/sword" />  	
<link rel="edit-media" href="http://legacy.cnx.org/GroupWorkspaces/g400/module.2006-04-07.3344418727/sword/editmedia"/>         
    </entry>
    <entry>
    	<title>Physical and Chemical Changes of Substances</title>
                <link rel="edit" href="http://legacy.cnx.org/GroupWorkspaces/g400/m12345/sword" />
 	<link rel="edit-media" href="http://legacy.cnx.org/GroupWorkspaces/g400/m12345/sword/editmedia"/>
     </entry>
</feed>
}}}

== Retrieving the Content of a Module from a Work Area ==
Reference: Section 6.4 of the OERPub Specification

Clients can retrieve a zip of the contents of a module by issuing a GET to the edit-media URL (EM-IRI). The edit-media URL is available from a Deposit Receipt or from the work area listing.

{{{
GET http://legacy.cnx.org/GroupWorkspaces/g400/m12345/sword/editmedia
User-Agent: userid
Authorization: Basic wQf4FoEW5Ms?
Content-Type: application/zip
}}}

The returned Zip will contain
  * index.cnxml : This is the main Connexions module XML file for editing.
  * index.cnxml.pre-[version-specifier] : These can be ignored. They are backups produced if the original module was written in an older version of the xml language.
  * images and any other included media or downloadable files that the module references. Images will be reference in the index.cnxml file in image <media> tags, these included files will be referenced within the index.cnxml in <link> tags.

== Updating a Module in a Work Area ==
Reference: Sections 6.5 and 6.7 in the [https://docs.google.com/document/d/1hMvUA3oevZhUG2vo3IEiHCr-yMNCFXDambzalOM-XKU/edit?hl=en_US OERPub Spec].

Using the edit (SE-IRI) and edit-media (EM-IRI) URL's for a module, the metadata and contents of the module can be updated in various ways, outlined below.  

If both metadata and contents are changing, both can be done simultaneously by using an atom multipart construction and POSTing or PUTing to the edit URL. Examples of these combinations can be found in the full specification. 

=== Adding Metadata ===
Issue a POST to the Edit URL (SE-IRI) with an atom entry containing new metadata to be added to the module. Any metadata that would replace existing metadata will be ignored.

Metadata Addition Semantics: Because of the requirement that new metadata be additive, we list the Connexions supported setable metadata and what happens in each case.

  * title (dcterms:title) : If the module is titled “(Untitled)", add the new title, discard otherwise
  * abstract/summary (dcterms:abstract) : Add if empty, discard otherwise
  * language (dcterms:language) : Discard (language is always set and you cannot have multiple)
  * keyword (dcterms:subject) : Add
  * subject (dcterms:subject xsi:type="oerdc:Subjects") : Add
  * contributor roles : Add
  * descriptionOfChanges : Add if empty, discard otherwise
  * analyticsCode : Add if empty, discard otherwise

=== Replacing Metadata ===
Issue a PUT to the Edit URL (SE-IRI) with an atom entry containing metadata that will replace all the existing module metadata. Any metadata values left unspecified will take on system defaults (see above).

Example:
{{{
PUT http://legacy.cnx.org/GroupWorkspaces/wg441/sword/m9000 HTTP/1.1
Host: legacy.cnx.org
Content-Type: application/atom+xml
Authorization: Basic ZGFmZnk6c2VjZXJldA==
Content-Length: [content length]

<?xml version="1.0"?>
<entry xmlns="http://www.w3.org/2005/Atom"
       xmlns:dcterms="http://purl.org/dc/terms/"
       xmlns:oerdc="http://legacy.cnx.org/aboutus/technology/schemas/oerdc">

  <!-- the new metadata -->
  <dcterms:title>Basic Math</dcterms:title>
  <!-- No summary/abstract is shown, so the default of an “empty" abstract will replace any existing summary/abstract. -->
  <dcterms:creator oerdc:id="kfried"></dcterms:creator>
  <oerdc:maintainer oerdc:id="kfried"></oerdc:maintainer> 
  <dcterms:rightsHolder oerdc:id="kfried"></dcterms:rightsHolder> 
  <!-- Not that original author ‘kef’ has been removed by not being included here. kef will be notified and need to approve. -->

  <oerdc:oer-subject>Mathematics and Statistics</oerdc:oer-subject>
  <dcterms:subject>addition</dcterms:subject> <!-- <md:keyword> -->
  <dcterms:subject>subtraction</dcterms:subject>
  <dcterms:language xsi:type="ISO639-1">en</dcterms:language> 
  <oerdc:descriptionOfChanges>Removed author, kef, and deleted boiler plate abstract until we can come up with a better one.</descriptionOfChanges>  
  <oerdc:analyticsCode>UA-4688042-1</oerdc:analyticsCode>
</entry>
}}}

=== Merging Metadata ===
Issue a PUT to the Edit URL (SE-IRI) with an additional header, '''Update-Semantics: http://purl.org/oerpub/semantics/Merge''' with an atom entry containing metadata that will be used to update the module metadata.

The following behavior will occur:
  * Case 1: If a metadata element is not present in the Atom entry, it will retain its current value.
  * Case 2: If a metadata element is present then singletons will replace the current value, and elements that can have multiple value will add the new value as follows:
    * Module title (dcterms:title) : Replace with specified title
    * Module abstract/summary (dcterms:abstract) : Replace
    * Module language (dcterms:language) : Replace
    * Keywords (dcterms:subject) : Add to the current set
    * Subject area (dcterms:subject xsi:type="oerdc:Subjects") : Add
    * Contributor roles : Add
    * descriptionOfChanges : Replace
    * analyticsCode : Replace

=== Adding media resources ===
Issue a POST to the edit-media URL (EM-IRI) containing a zip file of the resources to be added. If any of the resources would replace an existing resource, an OverwriteNotPermitted ERROR will be returned.

=== Replacing the module contents ===
Issue a PUT to the edit-media URL with a zip of new contents for the module. If the zip contains a transformable word processing document it will be used to create the new module contents.

=== Merging in new contents ===
Issue a PUT to the Edit URL (SE-IRI) with an additional header, '''Update-Semantics: http://purl.org/oerpub/semantics/Merge''' and a zip of contents to be merged in with the module contents. 

If the Update-Semantics header is set to Merge the following cases apply.
  * '''Index.cnxml''': If the ZIP file contains a file called index.cnxml, then the module contents are regenerated from the new index.cnxml file. (The system processes the imported index.cnxml and then saves that.)
  * '''Matching files''': If the ZIP file contains files with the same name as previously attached files, then those files are replaced with the new versions. 
  * '''New files''': If the ZIP file contains files which are not already attached to the module, then those files are added. 

== Publishing a Module ==
Reference: [https://docs.google.com/document/d/1hMvUA3oevZhUG2vo3IEiHCr-yMNCFXDambzalOM-XKU/edit?hl=en_US#heading=h.vd1aoe7c6ucn Section 6.11 "Triggering a publish" from the OERPub specification]

Once a module is ready to be published, trigger a publish by asserting that the module is ready to be published (In-Progress: false) and completing a POST to the SE-IRI with a blank message body. 

The module must have all preconditions for publish met, like valid format, a signed license, and all contributors agreeing to be listed on the module. 

Example:
{{{
POST http://legacy.cnx.org/Members/kef/module.2011-07-27.33881877/sword HTTP/1.1
Host: legacy.cnx.org
Authorization: Basic ZGFmZnk6c2VjZXJldA==
Content-Length: 0
User-Agent: MySWORDClient/0.1
In-Progress: false
}}}

Once the server has processed the request it returns a Deposit Receipt.

{{{
200 OK
Location: http://legacy.cnx.org/Members/kef/m8200/sword 

[Deposit Receipt] 
}}}

== Error Handling ==

Reference: See [https://docs.google.com/document/d/1hMvUA3oevZhUG2vo3IEiHCr-yMNCFXDambzalOM-XKU/edit?hl=en_US#bookmark=id.3hg11y3l3co1 Section 12 in the OERPub Specification]

 * If there is an Error, return SWORD Error report along with the appropriate HTTP code.

Example SWORD standard Error XML
{{{
HTTP 1.1  400 Bad Request
<?xml version="1.0" encoding="utf-8"?>
<sword:error xmlns="http://www.w3.org/2005/Atom"
       xmlns:sword="http://purl.org/net/sword/"
       xmlns:arxiv="http://arxiv.org/schemas/atom"
       href="http://purl.org/net/sword/error/ErrorContent">
    <author>
        <name>Connexions</name>
    </author>
    <title>ERROR Content - Package not supported</title>
    <updated>2008-02-19T09:34:27Z</updated>
    <generator uri="rhaptos.swordservice.plone" version="1.0"/>
    <summary>Only the simple zip package type is supported.</summary>
    <sword:treatment>processing failed</sword:treatment>
    <sword:verboseDescription>
        Exception at [ ... ]
    </sword:verboseDescription>
    <link rel="alternate" href="https://trac.rhaptos.org/trac/rhaptos/wiki/API/OERPub/help" type="text/html"/>
</sword:error> 
}}}

Example OERPub Error XML
{{{
<?xml version="1.0" encoding="utf-8"?>
<sword:error xmlns="http://www.w3.org/2005/Atom"
       xmlns:sword="http://purl.org/net/sword/"
       xmlns:arxiv="http://arxiv.org/schemas/atom"
       href="http://purl.org/oerpub/error/OverwriteNotPermitted">
    <author>
        <name>Connexions</name>
    </author>
    <title>ERROR OverwriteNotPermitted - Cannot overwrite existing files</title>
    <updated>2008-02-19T09:34:27Z</updated>

    <generator uri="rhaptos.swordservice.plone" version="1.0"/>
    <summary>Files may not be overwritten with a POST</summary>
    <sword:treatment>File “myfile.typ” matched an existing file. The existing file cannot be overridden with a POST.</sword:treatment>
      <link rel="alternate" href="https://trac.rhaptos.org/trac/rhaptos/wiki/API/OERPub/help" type="text/html"/>
</sword:error>
}}}

Example Unauthorized Error XML
{{{
<?xml version="1.0" encoding='utf-8'?>
<sword:error xmlns="http://www.w3.org/2005/Atom"
             xmlns:sword="http://purl.org/net/sword/"
             href="http://purl.org/oerpub/error/CheckoutUnauthorized">

    <title>ERROR Checkout unauthorized</title>
    <summary> Authenticated user is not authorized to check out the specified module.
    </summary>
    <sword:treatment>You do not have permission to checkout m10377</sword:treatment>
    <sword:verboseDescription>You are not a maintainer of the requested item or you do not have sufficient permissions for this workspace</sword:verboseDescription>
</sword:error>
}}}


 * '''NOTE:''' The href attribute of the <sword:error> element should point to a description of the error.
 * HTTP Error Codes

|| '''SWORD/OERPub Code''' ||'''HTTP Codes'''|| '''Description'''||
|| || 100 OK || Used when the service is not able to respond yet, but will respond ||
|| || 200 OK || Used in response to successful GET operations and to Media Resource Creation operations where X-No-Op is set to true and the server supports this header.||
|| ||201 Created, 202 Accepted ||One of these MUST be used to indicate that a deposit was successful. 202 Accepted is used when processing of the data is not yet complete.||
|| || 202 No Content || Used in response to successful PUT and DELETE requests ||
|| !ErrorBadRequest ||400 Bad Request || used to indicate that there is some problem with the request where there is no more appropriate 4xx code.||
|| Credential Failures ||401 Unauthorized || In addition to the usage described in HTTP, servers that support mediated deposit SHOULD use this status code when the server does not understand the value given in the X-Behalf-Of header. In this case a human-readable explanation MUST be provided.||
|| !PublishUnauthorized ||401 Unauthorized || The user does not have the maintainer role on the module and so cannot publish. ||
|| !Unpublishable ||412 Precondition Failed || The module cannot be published for one of several reasons (license not signed, contributors haven't agreed, content invalid) ||
|| !CheckoutUnauthorized ||401 Unauthorized || The module cannot be checked out because the author does not have permission on this module. Derive a copy instead. ||
|| || 403 Forbidden || indicates that there was a problem making the deposit -- likely because the operation is not allowed on the specified object. ||
|| !OverwriteNotPermitted|| 403 Forbidden || When POSTing new resources, if the resource would overwrite an existing resource, this error will be returned||
|| !ErrorChecksumMismatch ||412 Precondition failed || MUST be returned by server implementations if a calculated checksum does not match a value provided by the client in the Content-MD5 header.||
|| !MediationNotAllowed || 412 Precondition Failed || Connexions does not support mediation. If the on-behalf-of header is present, this error will be returned. ||
|| !ErrorContent ||415 Unsupported Media Type || MUST be used to indicate that the format supplied in either a Content-Type header or in an X-Packaging header or the combination of the two is not accepted by the server.||
|| !TransformFailed ||415 Unsupported Media Type || The deposit appears valid but the repository converters fail to convert the given files to the repository format. ||
|| !DepositFailed ||415 Unsupported Media Type || The packaging is supported, but fails validation. ||
|| !MaxUploadSizeExceeded || 413 Request Entity Too Large || The deposit exceeds the repository's size limit. ||


== Command Line Usage ==

It's now possible to create modules for docs(for example, word docs) from the command line. The zip file may be named anything at all. The document may be named anything at all. The first file in the doc not named mets.xml will be imported. The url to POST to is the workgroup you wish to create the module in, with '/sword' appended.

 {{{
 $ zip sword.zip mydoc.doc
 $ python makemultipart.py atom-entry.xml sword.zip sword-multipart 
 $ BOUNDARY=`grep -m 1 boundary  input/multipart-test | sed -e 's/^.*"\([^"]*\)".*$/\1/'`
 $ curl  --request POST --user userid:password --header 'Content-Type: multipart/related;boundary="$BOUNDARY";type=application/atom+xml" --header "In-Progress: true" --upload-file sword-multipart http://legacy.cnx.org/Members/kef/sword
 }}}


== Related Reference Links ==
 * [https://docs.google.com/document/d/1hMvUA3oevZhUG2vo3IEiHCr-yMNCFXDambzalOM-XKU/edit?hl=en_US OERPub specification with Connexions implementation details] (extends SWORD V2)
 * [http://swordapp.org/sword-v2/sword-v2-specifications/ SWORD V2 Profile documentation] (extends atom pub)
 * [http://bitworking.org/projects/atom/rfc5023.html Atom Pub Protocol]

== Service Installation and Configuration ==

=== Installation ===

The CNX buildout for the latest OERPUB devset is here:
https://software.cnx.rice.edu/svn/devsets/oerpub-milestone4/cnx-buildout/

This should successfully install on Ubuntu Lucid and Natty as well as Debian Lenny. It has been tested with virtualenv expected.

This [https://software.cnx.rice.edu/svn/devsets/rhaptos-sword-service/README.ubuntu.txt README.txt] has all the steps we followed for Ubuntu.

The README should say this somewhere {{{virtualenv --python=/usr/bin/python2.4 --no-site-packages .}}} (may or may not have been fixed.)

On Debian Lenny you should be able to follow the same steps except for installing python2.4 which can easily be installed without adding extra sources, and use postgresql-8.3.

=== Configuration ===

The SWORD tool management page is at "/sword_tool/manage_configure

 * '''Service on/off''': You can turn the service on and off using the "Accepting Sword requests" checkbox.
 * '''Deposit limit''': You can set the maximum upload size (in bytes). 

=== !RhaptosSword Code ===

==== Updates to configuration instructions ====

The products that were modified for milestone 4 were: 
   * !CNXMLTransforms
   * !RhaptosCollection
   * !RhaptosSword
   * rhaptos.atompub.plone
   * rhaptos.swordservice.plone


==== Pre Milestone 4 ====

The products that were modified for the SWORD V2 publication API are: 
   * !CNXMLTransforms
   * !RhaptosModuleEditor
   * !RhaptosModuleStorage
   * !RhaptosSword

New packages that were pulled in are: 
   * rhaptos.atompub.plone
   * rhaptos.swordservice.plone 

From the V1 implementation
   * skins
      * json.cpy
         * Converts cnxml to json
      * service_discovery.pt
         * used to create XML returned on Service Discovery request
      * sword_anonymous_post.pt
         * template for error response
      * sword_import_error.pt
         * template for error response
      * sword_import_success.pt
         * Template for success response
      * sword.cpy
         * handles incoming requests
         * On GET, calls Service Discovery code
         * On POST, calls Entry request code
   * xsl
      * ojs-to-mdml.xsl
         * converts met.xml from OJS to MDML
   * zpt
      * manage_configure_sword_tool.zpt
         * Allows sword tool to be turned on and off
      * manage_overview_sword_tool.zpt
         * Description of Sword tool
   * configure.zcml
      * Generic Setup config file
   * !SwordTool.py
      * Main class for !SwordTool
