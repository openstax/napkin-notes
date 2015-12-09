### Status of IE log-in (everything is busted)

Right now IE is unable to log-in to CC, because it's refusing to send or accept cookies for sites inside an iframe unless they have a P3P policy header.  This is the same issue we faced with CORS requests, but we were able to work around that by using tokens vs cookies.

I should have tested more thoroughly on IE with "real" domains.  Instead I tested with localhost, and IE treats single word domains using it's "intranet" access policy, which is more lenient.  We also should have prioritized testing with IE, but other bugs have prevented us from even getting to the login stage on CC with IE until now.

I see us having three options to fix this:

1) Add a P3P header to Accounts & Tutor.  This would be the simplest, but we decided not to before.  Apparently Google and other sites are now actively subverting P3P by using a fake policy.
  * Notes on P3P:
   * wget -q --server-response http://google.com
   * https://support.google.com/accounts/answer/151657?hl=en
   * http://stackoverflow.com/questions/5257983/what-is-headerp3p-cp-cao-psa-our

2) Open login in a pop-up window.  We could implement this with minimal work to CC.  We could use PostMessage like we currently do, but talk to the window instead of an iframe.

3) Redirect to Tutor and then back after login.  This would require Tutor to accept a "return page" parameter and then redirect back to it after login.
