## BL missing ecosystems plan

We've discovered that BL API has 36 courses that are missing their ecosystem uuids

When BL scheduler queries API for updated courses it fails to insert thoses records because it requires all courses to have a ecosystem UUID.

This is the list of course UUIDS without an ecosystem:
`Course.where({ initial_ecosystem_uuid: nil }).map(&:uuid)

`
["5e46d943-c92b-47b5-9125-4947aea88c75", "23c17d37-d06e-4e92-a451-9032cab45160", "59d64bb1-f4ef-4244-bd99-45137485eb5b", "746e26ce-665c-456d-bf55-488a30c665b6", "4fd4ae9c-3a0b-4117-826d-c62c9b4057f8", "114c14e1-33fe-413d-8909-ec955d6621ad", "12314719-502f-477a-8016-4bf2b6839f5c", "b132f1ec-27e8-4c97-ba16-eff187daa314", "bb74e2af-9573-437b-9e7c-79bf3f0eda82", "8d809358-c14c-4986-8bfa-77d847459f74", "11bc0176-4830-4ebd-a6f7-ad2d759d1416", "4dbdb0a1-6eef-4a1e-b10b-2118672ba3b2", "30de8d9d-4f8e-402d-8ea3-3d0b2cc4899a", "d683f3df-ae43-4a85-990e-5fb9086da65e", "e3decfba-fa12-4970-815c-76c46da9103a", "51322ddc-ff5d-4896-b404-53153db17191", "1e0e2754-b23e-49b2-a628-678a6fe65860", "fc85562c-97be-4c8f-96b6-c66d4c62fe5d", "bbcce0ec-70bc-4529-a673-645e9beae0ff", "25b6f864-7316-4640-b0cf-c487ee9ca438", "4ee100ba-ea92-47b3-a069-3fed7d64069e", "3e3d73f3-ec06-42de-9fdc-00cb5638273a", "ba1c47c2-1818-4e7f-bd4a-b8e258148d77", "67ee4a83-5b28-4411-8ad9-eaacc43e91d6", "26c0b230-6293-4097-af4f-2753a60144ac", "69a5605b-3480-4067-9e54-baaa469f52eb", "f5480d22-ca44-4c22-8fca-edf6f965c49c", "192c3523-434c-40f8-86a8-afbf2bf9a94f", "93a6180a-34b3-4f4c-9a82-9f799ccae812", "9458816a-1fd3-4442-b90e-b21f519dc205", "95b5e519-18ff-4a1f-a0ac-72c1c373eca9", "e196bf56-7d02-4f1b-9cac-74e228c6baf0", "71a7a56b-6ad5-4b8b-b9a9-3412b658d432", "91cdff18-0656-471c-a3b2-b3642d36dbfc", "dd4f5a9a-130c-4ca2-a83e-0a265cb78367", "24a26b1c-f56f-474c-be3a-b605fe554203"]
`

That corresponds to these Tutor Server course ids:
`[4808, 4809, 4810, 4811, 4812, 4813, 4814, 4815, 4816, 4817, 4818, 4819, 4820, 4821, 4822, 4823, 4824, 4825, 4826, 4827, 4828, 4829, 4830, 4831, 4832, 4833, 4834, 4835, 4836, 4837, 4838, 4839, 4840, 4841, 4842, 4843]`

All the courses were created on Dec 7 through 18th

We're proposing to manually copy the ecosystem uuids from Tutor Server and update BL API with them.  The command sequence will be to run this command on Tutor Server:

`CourseProfile::Models::Course.where(uuid: ["5e46d943-c92b-47b5-9125-4947aea88c75", "23c17d37-d06e-4e92-a451-9032cab45160", "59d64bb1-f4ef-4244-bd99-45137485eb5b", "746e26ce-665c-456d-bf55-488a30c665b6", "4fd4ae9c-3a0b-4117-826d-c62c9b4057f8", "114c14e1-33fe-413d-8909-ec955d6621ad", "12314719-502f-477a-8016-4bf2b6839f5c", "b132f1ec-27e8-4c97-ba16-eff187daa314", "bb74e2af-9573-437b-9e7c-79bf3f0eda82", "8d809358-c14c-4986-8bfa-77d847459f74", "11bc0176-4830-4ebd-a6f7-ad2d759d1416", "4dbdb0a1-6eef-4a1e-b10b-2118672ba3b2", "30de8d9d-4f8e-402d-8ea3-3d0b2cc4899a", "d683f3df-ae43-4a85-990e-5fb9086da65e", "e3decfba-fa12-4970-815c-76c46da9103a", "51322ddc-ff5d-4896-b404-53153db17191", "1e0e2754-b23e-49b2-a628-678a6fe65860", "fc85562c-97be-4c8f-96b6-c66d4c62fe5d", "bbcce0ec-70bc-4529-a673-645e9beae0ff", "25b6f864-7316-4640-b0cf-c487ee9ca438", "4ee100ba-ea92-47b3-a069-3fed7d64069e", "3e3d73f3-ec06-42de-9fdc-00cb5638273a", "ba1c47c2-1818-4e7f-bd4a-b8e258148d77", "67ee4a83-5b28-4411-8ad9-eaacc43e91d6", "26c0b230-6293-4097-af4f-2753a60144ac", "69a5605b-3480-4067-9e54-baaa469f52eb", "f5480d22-ca44-4c22-8fca-edf6f965c49c", "192c3523-434c-40f8-86a8-afbf2bf9a94f", "93a6180a-34b3-4f4c-9a82-9f799ccae812", "9458816a-1fd3-4442-b90e-b21f519dc205", "95b5e519-18ff-4a1f-a0ac-72c1c373eca9", "e196bf56-7d02-4f1b-9cac-74e228c6baf0", "71a7a56b-6ad5-4b8b-b9a9-3412b658d432", "91cdff18-0656-471c-a3b2-b3642d36dbfc", "dd4f5a9a-130c-4ca2-a83e-0a265cb78367", "24a26b1c-f56f-474c-be3a-b605fe554203"]).map{|c| [c.uuid, c.ecosystem.tutor_uuid ]}`

This will return a nested array of course uuid, ecosystem uuid

We'll then copy that list to BL API and run:

`<array>.each{| cuuid, euuid| Course.where(uuid: cuuid, initial_ecosystem_uuid: nil).first!.update_attributes(initial_ecosystem_uuid: euuid) }`
