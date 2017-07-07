= Web Services API =

'''Warning:''' This document has not been tested for accuracy since several large milestones were released in late 2009 and early 2010.

== Document Actions ==
       
Connexions and other Rhaptos installations are easy to use in a web services manner. A great amount of our data is accessible through a variety of REST calls.

Connexions/Rhaptos sports a number of useful REST services that you can use to get content for your application. An XML-RPC option is also available. We will discuss a number of common cases here, but probably only present a few of the many possibilities. (This is because our REST interface is mostly "organic", a result of the system architecture.)

[[PageOutline(1-3,Table of Contents,pullout)]]

== Module Contents == 
When you have the URL to a module, it's very easy to get its contents. Say we have the module http://cnx.org/content/m11359/latest in mind.

Obviously we can get the rendered XHTML directly from that URL. It's a simple matter to remove the surrounding navigation if you just want the content: just grab the cnx_header and cnx_main nodes, which are the first two in the body of the document.

Modules may have associated resources, like images and other files (PDFs, audio/visual, raw data, etc) that you will also want to get. While you could parse the rendered XHTML for these references, that's a lot of work, and we have a better way: just get the URL with objectIds appended, like so: http://cnx.org/content/m1029/latest/objectIds

This RESTful behavior will give us a comma-separated list of the available resources:
{{{
['4.44.png', '4.45.png', '4.46.png', '4.47.png', '4.48.png', '4.49.png', '4.50.png', '4.51.png', '4.52.png', 'index.cnxml']
}}}

This is simple to parse in pretty much any language you might be using. You may then add any of these resources to the module URL to fetch it, like http://cnx.org/content/m1029/latest/4.51.png

Note that the CNXML source is listed as well. You may fetch that in the same manner: http://cnx.org/content/m1029/latest/index.cnxml

Other information is available as well:

 * keywords: http://cnx.org/content/m1029/latest/getKeywords
 * title: http://cnx.org/content/m1029/latest/Title
 * icon (relative path): http://cnx.org/content/m1029/latest/getIcon

More may be available in the future.

== Courses/Collections ==
List of all collections and some metadata about them

http://cnx.org/contexts.rdf which returns courses in the following XML format

{{{
<rdf:RDF> 
<rdf:Seq about="urn:context:history">
<rdf:li>
<rdf:Description>
<cnx:name>The "How Tos" of OER Commons</cnx:name>
<cnx:uri>http://cnx.org/content/col10468/latest/?format=rdf</cnx:uri>
<cnx:institution>ISKME</cnx:institution>
<cnx:instructor>ISKME</cnx:instructor>
<cnx:code>OER 101</cnx:code>
<cnx:description>
Become a participant in the OER movement! Learn about open content and open education, licensing of open content, and the benefits of making and using OER. Using real-life examples from OER Commons, you'll learn about adapting and remixing content to meet your needs. By the end of 
</cnx:description>
</rdf:Description>
</rdf:li>
}}}

with the list continuing for all collections 

Collections are a little different, in that they don't have contents, but rather contain either sub-collections or pointers to individual modules. We can get the list of subcollections and modules at any particular level with contentIds (like we did with objectIds above). If, for example, we have a course http://cnx.org/content/col10220/latest/ we can get it's first level contents with http://cnx.org/content/m11359/latest/contentIds

This is of the same format as in modules, and gives us:
{{{
['1', '2', '3']
}}}
The entries are either subordinate organizations or module references. In the case above we see only subcollections, and we refer to one like http://cnx.org/content/col10220/latest/1 but this has no useful output. We can continue asking subcollections about contentIds, so http://cnx.org/content/col10220/latest/1/contentIds gives us
{{{
['m10672', 'm10668']
}}}
We can tell these are modules my the name, but there is no current explicit way to ask if a resource is a module reference or a subcollection. One way to check currently is to use the getModuleId method:

 * http://cnx.org/content/col10220/latest/1/m10668/getModuleId returns a value
 * http://cnx.org/content/col10220/latest/1/getModuleId returns an error
In this way you can recursively traverse a course. There are other options:

For a list of all modules referenced in the course, without organization, use containedModuleIds, which looks like http://cnx.org/content/col10220/latest/containedModuleIds and returns
{{{
['m10672', 'm10668', 'm11644', 'm11421', 'm11639', 'm11636', 'm11633', 'm12459']
}}}
(near future) For a hierarchical list, ask for containedModulesTree; for instance, the URL http://cnx.org/content/col10220/latest/containedModulesTree will give something like:
{{{
[
 {'isCollection': True, 'id': '1', 'title': 'Transposition',
  'elt': [
          {'isCollection': False, 'id': 'm10672', 'elt': '1/m10672/', 'title': 'Transposing Instruments'],
          {'isCollection': False, 'id': 'm10668', 'elt': '1/m10668/', 'title': 'Transposition: Changing Keys']
         ]
  },
 {'isCollection': True, 'id': '2', 'title': 'Rhythm',
  'elt': [
          {'isCollection': False, 'id': 'm11644', 'elt': '1/m11644/', 'title': 'Syncopation']
         ]
  },
 {'isCollection': True, 'id': '3', 'title': 'Non-Western Music',
  'elt': [
          {'isCollection': False, 'id': 'm11421', 'elt': '1/m11421/', 'title': 'What Kind of Music is That?'],
          {'isCollection': False, 'id': 'm11639', 'elt': '1/m11639/', 'title': 'Tuning Systems'],
          {'isCollection': False, 'id': 'm11636', 'elt': '1/m11636/', 'title': 'Scales that aren't Major or Minor'],
          {'isCollection': False, 'id': 'm11633', 'elt': '1/m11633/', 'title': 'Modes and Ragas: More Than just a Scale'],
          {'isCollection': False, 'id': 'm12459', 'elt': '1/m12459/', 'title': 'Indian Classical Music: Tuning and Ragas']
         ]
  },
]
}}}
This is a Python dictionary structure, a list of dictionaries, where each element is as follows:
{{{
{'id':id, 'title':title, 'elt':relative path or list of records, 'isCollection':boolean}
}}}
Note that the example above is reformatted for clarity, and in real life will be all on one line and the keys may be in any order.

You can also retrieve an XML description of a collection, like http://cnx.org/content/col10220/latest/source. The XML version also provides the contextual links as you might see in the sidebar when viewing normally.

To refer to a module within a course, you currently must set a cookie courseURL and visit the module directly. In the near future (the same future in which containedModulesTree will appear) you will be able to refer simply to the module as an extension of the URL of the course, like http://cnx.org/content/col10220/latest/1/m10668. If no organization is provided, like with the URL http://cnx.org/content/col10220/latest/m10668, the system will do a redirect to the proper URL.

== Attributes ==

Courses have a wide variety of information available through the RESTful interface, as these examples demonstrate (note that some have no value):
 * license: http://cnx.org/content/col10220/latest/getLicense
 * title: http://cnx.org/content/col10220/latest/getTitle or http://cnx.org/content/col10220/latest/Title
 * abstract: http://cnx.org/content/col10220/latest/getAbstract
 * keywords: http://cnx.org/content/col10220/latest/getKeywords
 * institution: http://cnx.org/content/col10220/latest/getInstitution
 * course code: http://cnx.org/content/col10220/latest/getCode
 * instructor: http://cnx.org/content/col10220/latest/getCode
 * homepage: http://cnx.org/content/col10220/latest/getHomepage
 * version: http://cnx.org/content/col10220/latest/getVersion
 * created time: http://cnx.org/content/col10220/latest/getCreated
 * revised time: http://cnx.org/content/col10220/latest/getRevised
 * authors: http://cnx.org/content/col10220/latest/getAuthors
 * maintainers: http://cnx.org/content/col10220/latest/getMaintainers
 * licensors: http://cnx.org/content/col10220/latest/getLicensors

For subcollections, you can ask for title: http://cnx.org/content/col10220/latest/1/Title

For module references, you can ask

 * (near future) title (possibly over-ridden): http://cnx.org/content/col10220/latest/1/m10668/getTitle
 * over-riding title (same as above, if provided): http://cnx.org/content/col10220/latest/1/m10668/getOptionalTitle
 * moduleId: http://cnx.org/content/col10220/latest/1/m10668/getModuleId
 * version: http://cnx.org/content/col10220/latest/1/m10668/getVersion
 * repository URL: http://cnx.org/content/col10220/latest/1/m10668/getRepositoryLocation
 * repository module's title: http://cnx.org/content/col10220/latest/1/m10668/getModuleTitle

== XML-RPC ==

All of the resources above are also available via XML-RPC. For example, in Python:

{{{
>>> import xmlrpclib
>>> server = xmlrpclib.ServerProxy("http://localhost:8080/plone")
>>> server.content.col10201.latest.contentIds()
['subcollection.2006-03-31.8002696433', 'm10001', 'subcollection.2006-05-22.1346460509', 'subcollection.2006-05-22.6041344594',
'subcollection.2006-05-22.8339670034', 'subcollection.2006-05-22.1211066389', 'sizeth-chapter']
>>> server.content.col10201.latest.getAuthors()
['alice']
}}}

Any Rhaptos installation should have this capability, but XML-RPC is currently impossible with cnx.org, due to proxying and load-balancing. Any of the cnx.org frontends referenced directly will work, but none of these are necessary of stable name/port or intended for outside access. If you're interested in this, please contact us.
Discovering Content and Formal Metadata
Rhaptos/Connexions implements the OAI search protocols and the A9 protocol. These form external searching APIs.

The Connexions implementation is documented on a [wiki:OpenArchivesHarvesting separate page including an extension to OAI] to allow searching. 

Here's the OAI protocol standard: http://www.openarchives.org/OAI/2.0/openarchivesprotocol.htm
