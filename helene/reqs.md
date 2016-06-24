#Global Requirements
This document's aim is to identify needs and requirements from all the OSX products that are using a common html file and common CSS styling

###General needs
Take specific formats into account 
  - webview
  - epub
  - pdf 
  - Tutor
  
Global identity, consistent look and feel
  - format specific but not disconnected from other products
  
Cross team friendly
  - accessible and efficiently accessed/modified by all teams

##Product Specific
###PDF styles/framework
Maintainablity: 
  - lifetime
    - retain control over natural evolution of code base over time
    - scalable
  - multiple users, code consistency
  - future development (features, refactor, new designs)
  - change in data structure (new DOM)
  
Ease of use: 
  - efficiency: clear file structure, clear logic pathways: limit time wasted figuring out what does what and what is where
  - access to PDF(print) specific needs: pagination, folio
  - minimal regression testing: ablitity to add or modifiy content without having to do a full stack regression testing each time
  
Fast creation
  - DRY code
  - reusable/modular when creating/updating templates
  - ability to add various or new features easily
  - turn around issues or bugs quickly
 
-------- 
##General philosophy/concepts 

###For cleaner/better code
  - never override an CSS declaration
  - keep our mixins simple, you shouldn't need a map and two days to find where that mixin was created  
  - from general to specific, keeping it as generic as possible
  
###For an ideal slots/skeleton framework
  - we add, we never remove (avoid regression testing)
  - the framework is versioned, as with an API
  - developers should never have to look at the skeleton
