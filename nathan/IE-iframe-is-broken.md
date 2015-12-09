### Status of IE log-in (everything is busted)

Right now IE is unable to log-in to CC, because it's refusing to send or accept cookies for sites inside an iframe unless they have a P3P policy header.  This is the same issue we faced with CORS requests, but we were able to work around that by using tokens vs cookies.

I should have tested more thoroughly on IE with "real" domains.  Instead I tested with localhost, and IE treats single word domains using it's "intranet" access policy, which is more lenient.  We also should have prioritized testing with IE, but other bugs have prevented us from even getting to the login stage on CC with IE until now.

I see us having three options to fix this:

1) Add a P3P header to Accounts & Tutor.  This would be the simplest, but we decided not to before.  Apparently Google and other sites are now actively subverting P3P by using a fake policy.
  * Notes on P3P:
   * wget -q --server-response http://google.com
   * https://support.google.com/accounts/answer/151657?hl=en
   * http://blogs.unbolt.net/index.php/brinley/2010/03/31/p3p-fix-for-internet-explorer-to-access-cross-domain-cookie-in-iframe
   * http://www.cylab.cmu.edu/research/techreports/2010/tr_cylab10014.html
   * http://stackoverflow.com/questions/5257983/what-is-headerp3p-cp-cao-psa-our

2) Open login in a pop-up window.  We could implement this with minimal work to CC.  We could use PostMessage like we currently do, but talk to the window instead of an iframe.

3) Redirect to Tutor and then back after login.  This would require Tutor to accept a "return page" parameter and then redirect back to it after login.



If we use p3p we'll have to decide:
1) misuse it like Google & Facebook do and not put an actual P3P policy in it, but link to our privacy policy.  Their P3P headers are:
 * FB: Facebook does not have a P3P policy. Learn why here: http://fb.me/p3p
 * Google: his is not a P3P policy! See https://www.google.com/support/accounts/answer/151657?hl=en for more info.

2) Put a minimal but valid policy in. A policy of "CAO PSA OUR" would indicate:

 * contact and others (access information: What information is collected?)
   * Identified Contact Information and Other Identified Data: access is given to identified online and physical contact information as well as to certain other identified data.
 * pseudo-analysis (purpose information: What is the collected information used for?)
  * Pseudonymous Analysis: Information may be used to create or build a record of a particular individual or computer that is tied to a pseudonymous identifier, without tying identified data (such as name, address, phone number, or email address) to the record. This profile will be used to determine the habits, interests, or other characteristics of individuals for purpose of research, analysis and reporting, but it will not be used to attempt to identify specific individuals. For example, a marketer may wish to understand the interests of visitors to different portions of a Web site.

 * ours (receipient information: Who gets that collected information?)
   * Ourselves and/or entities acting as our agents or entities for whom we are acting as an agent: An agent in this instance is defined as a third party that processes data only on behalf of the service provider for the completion of the stated purposes. (e.g., the service provider and its printing bureau which prints address labels and does nothing further with the information.)
