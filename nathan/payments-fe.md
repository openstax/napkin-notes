### Payments FE proposal

The payments service will host a small JS library without any dependiences to jQuery, React, etc, which will allow it to be easily downloaded or embedded into other projects without conflicts.

The library will:

 * Be initialized with a users UUID and a reference to a DOM element to use for the iframe.
 * Have methods to initiate a charge and refund
 * Open an iframe with it's src set to the appropriate page for charge/refund
 * Communicate across the iframe using `postMessage`
 * Provide callback hooks for:
   * success
   * failure
   * Maybe other progress or timeout status
 * Have a "destroy()" method to teardown the iframe.

When a charge or refund is initiated, the library will open an iframe to a view on the `payments` server

That iframe will contain additional HTML & JS code.  It will be responsible for:

  * Integrating with Braintree's API to setup the embedded credit card iframe fields.
  * Capture address and other data that payments needs
  * Trigger a submission of the credit card iframe's to Braintree and obtain a token (nonce).
  * via XHR requests, send the token and address information to payments BE for charging
  * Relay the charge's success or failure to the client-side library via `postMessage` messages
    * The client-side library will then call the registered callback event handlers
    * Eventually `destroy` will be called and the iframe removed
