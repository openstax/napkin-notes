## Ananomy of a race condition

Jotting this down while it's fresh in my mind, apologies for inevitable typos.

 * The Dashboard component in components/index was written before loadable component

 * It loads all courses using `CurrentUserActions.loadAllCourses()`

 * `CurrentUserActions.loadAllCourses()` does not use store helpers and doesn't support detecting if it is a loading state, just if it's loaded or not.

 * The dashboard component calls `CurrentUserActions.loadAllCourses()` in the render method, vs in `componentDidMount`.  This doesn't really matter but does exacerbate the issue.

 * Because of this the store is loaded multiple times.

 * Once the store finishes the first load, the component will notice that there's only a single course and role, and immediatly redirect.

 * The second (or third) load will eventually finish but the component is unmounted.  Actually unmounted is good since that'll be a harmless action, but if it's in the process of unmounting, it'll attempt to re-render once again.


 * To make things even worse, the Navbar also attempts to load the store unless it's already loaded.  If the timing is just right it will attempt to reload itself as well, but encounter a duplicate root error half way through.

 * Numerous other components listen to the CurrentUser store.  Like the `Username` component on the navbar.  If the sequence happens just right, that component will error out and be blank.

 * To make this even harder to debug, things run just a little slower with the Chrome dev console open, making the magic sequence trigger not nearly as often.


## Recommendations:

Move the `CurrentUser.courses` store into it's own store that uses the crud helpers.  That way it'll gain load-in-progress status.

Rework the Dashboard component to use `LoadableItem` once that's in place.
