= MDML (used in CNXML and CollXML) =
 * http://cnx.rice.edu/technology/mdml/schema/rng/0.5/mdml-defs.rng

= CNXML =
This is the xml format the majority of our content is stored in.

RELAX-NG Schema (for XML Editors and validators): http://cnx.org/aboutus/technology/cnxml/schema/rng/0.7/cnxml.rng which includes
 * http://cnx.org/aboutus/technology/cnxml/schema/rng/0.7/cnxml-common.rng
   * [http://cnx.org/aboutus/technology/cnxml/schema/rng/0.7/cnxml-abstract-defs.rng cnxml-abstract-defs.rng]
   * [http://cnx.org/aboutus/technology/cnxml/schema/rng/0.7/cnxml-jing.rng cnxml-jing.rng] - a special file used within Connexions to validate XML using the Jing RNG validator
      * [http://cnx.org/aboutus/technology/cnxml/schema/rng/0.7/cnxml-common-jing.rng cnxml-common-jing.rng] - the guts of the file above.
   * [http://cnx.org/aboutus/technology/cnxml/schema/rng/0.7/cnxml.rng cnxml.rng] - high level definitions that works with cnxml-defs.rng
   * [http://cnx.org/aboutus/technology/cnxml/schema/rng/0.7/cnxml-defs.rng cnxml-defs.rng] - contains details of elements
   * [http://cnx.org/aboutus/technology/cnxml/schema/rng/0.7/cnxml-simplified.rng cnxml-simplified.rng] - a RNG simplified format schema. 
 * [http://cnx.rice.edu/technology/mathml/schema/rng/2.0/mathml2.rng MathML schema] - relaxng schema for [http://www.w3.org/1998/Math/MathML MathML]
 * [http://cnx.rice.edu/technology/qml/schema/rng/1.0/qml-defs.rng QML schema]
 * [http://cnx.rice.edu/technology/bibtexml/schema/rng/1.0/bibtexml.rng BibTeXML schema] from the [http://bibtexml.sf.net/ BibTex as XML definition].
 * CALS Table schema : inlined in [http://cnx.org/aboutus/technology/cnxml/schema/rng/0.7/cnxml-defs.rng cnxml-defs] based on the [http://www.oasis-open.org/specs/tablemodels.php definition at OASIS]. [http://www.oasis-open.org/specs/a502.htm Another handy OASIS CALS reference]. Note that Connexions allows other elements and attributes not necessarily allowed in CALS, e.g. <title>, <caption>, @id, and @class.

CNXML Documentation can be found at 

 * [http://cnx.org/eip-help/tags Definitive List of CNXML elements]
 * [http://cnx.org/content/m9000/latest/ Basic CNXML]
 * [http://cnx.org/content/m9006/latest/ Intermediate CNXML]
 * [http://cnx.org/content/m9007/latest/ Advanced CNXML]
 * [http://cnx.org/content/m14395/latest/ Advanced CNXML Editing]


= CollXML =
This is the format our collection content is stored in.

[wiki:"Collection Structure Redesign/CollXMLDocumentation" Collxml Documentation]

RELAX-NG Schema (for XML Editors and validators): 
 * http://cnx.org/aboutus/technology/collxml/schemas/rng/1.0/collxml.rng which includes
 * http://cnx.org/aboutus/technology/collxml/schemas/rng/1.0/collxml-defs.rng

= Developer documentation =

 [wiki:TechnicalDocumentation/Code/Schemas Schemas developer docs]
 
