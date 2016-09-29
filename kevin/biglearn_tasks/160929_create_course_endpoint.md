First, review the biglearn API document 
[here](https://github.com/openstax/napkin-notes/blob/master/kevin/160921_biglearnApis/api_usage.md)
to get a sense of how `Tutor` will be calling `Biglearn`.

Next, take a stab at implementing the
[endpoint](https://github.com/openstax/napkin-notes/blob/master/kevin/160921_biglearnApis/api_usage.md#creating-a-course)
for creating a course.

Use the code for the responses endpoint as a guide:
* [controller](https://github.com/openstax/biglearn-api/blob/master/app/controllers/responses_controller.rb) and its [specs](https://github.com/openstax/biglearn-api/blob/master/spec/app/controllers/responses_controller/controller_spec.rb)
  * ensures that the service is correctly called using the HTTP request data
  * ensures that the service's results are properly returned in the HTTP response
* [service](https://github.com/openstax/biglearn-api/blob/master/app/domain/services/record_responses/service.rb) and its [specs](https://github.com/openstax/biglearn-api/blob/master/spec/app/domain/services/record_responses/service_spec.rb)
  * ensures that the proper records are created in the db

Create a simple
[factory](https://github.com/openstax/biglearn-api/blob/master/spec/factories/response.rb)
or two as needed.

Keep in mind the heavily concurrent nature of `Biglearn`
when creating and querying records
(mind your transactions).
It might be worth reading up on
[upsert](https://www.postgresql.org/docs/9.5/static/sql-insert.html)
(aka `insert ... on conflict ...`)
functionilty in postgres.
