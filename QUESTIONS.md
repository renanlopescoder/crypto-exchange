1. What would you add to your solution if you had more time?

- Orderbook by selected currency
- Sign in with Google and Email Password
- SEO - Domain / Request google indexing / Content with keywords / Backlinks
- User profile page
- Main page with more content and (Nextjs revalidate feature)
- Connect MetaMask wallet to the exchange
- Integrate the application to CMS Flamelink to allow content team to update application data

2. What would you have done differently if you knew this page was going to get thousands of views
   per second vs per week?

- Use SSR with nextjs to get content using getStaticProps and revalidate for pages that aren't dynamic
- Main application page with no live updates to receive the users and using revalidate to send static file

3. What was the most useful feature that was added to the latest version of your chosen language?
   Please include a snippet of code that shows how you've used it.

- Optional Chaining - Reduce the code and make it more readable. The feature verifies for undefined variables without the need of an if statement

```javascript
const undefinedVar = undefined;
// instead of
if (undefinedVar) {
  return undefinedVar.property;
}

// Now you can use optional chaining
return undefinedVar?.property;
```

4. How would you track down a performance issue in production? Have you ever had to do this?
   Back End
   Yes, in a NodeJS application many issues were tracked and solved. This was the process used to solve it:

- Verified server memory and CPU usage. The server was static and limited. The solution was to deploy the application on AppEngine Google Cloud Platform to use Auto Scaling features.
- Installed New Relic application tracker to verify request and response time for endpoints and then review the code for endpoints with unexpected response time delay.
- Used node clusters (PM2 was an option) to create application forks and avoid event loop blockers that delayed responses.
- Reviewed database queries and used indexes and more table joins on database queries, which were important for the application performance.
- Reviewed third parties requests and responses and in multiple requests used Promise.all so all requests were being done at the same time.

  Front end
  No, but in this case I would do the below:

- Verify application renders and split components that apply many renders and refactor it to make it as small as possible.
- For applications using context API if the application requires a lot of data updates, I would consider switching to a state manager like Recoil or Redux.
- Verify application server for server side render applications.
- Review useEffects and avoid not sending the second parameter to it, this usually causes extra re-renders.
