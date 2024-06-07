# Amplience Blog Posts

The Blog page https://localhost:3000/blog-filter is using Amplience Filter API to display a list of Blog Posts.

## Amplience Filter API

Blog posts from Amplience are also configured to be returned from the Filter API. This allows retrieval by:

- Content Type Schema
- Active

And also being able to sort the blog posts by the following attributes in ascending and descending order:

- Date (default sort option and default order is descending )
- Title
- Author

### Route

This is located in the following location of your application: `/blog-filter`

## How does this work

This page uses the [Amplience Filter API](https://amplience.com/developers/docs/apis/content-delivery/filter-api/) to return blogs and display as cards.

You can sort by the following values, using ascending or descending order:

- default
- author
- title

The Filter API call is then using these values to sort by, and order by the results.
The Blog List component is also using pagination to retrieve all blog posts from Amplience.

Code location: `app/(default)/blog-filter`

#### Sample Code

```js
const blogs = await amplienceClient.filterContentItems({
  filterBy: [
    {
      path: '/_meta/schema',
      value: 'https://demostore.amplience.com/content/blog',
    },
    {
      path: '/active',
      value: true,
    },
  ],
});
```
