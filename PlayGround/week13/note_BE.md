
*BackEnd Stack and Steps*

- *npm create hono@latest*
  - Hono - For Edge Network






*Edge Network*

- For backend we can't use CDN as, the request for the would always be specefic to the user and that's the reason we can't cache the data using CDN, so better way is using Edge Network and deploy the BE at multiple places.
- When user ask for the data, the request will go to the nearest Data Center and it will be served
- When No Caching, use Edge Network
- When Data is expensive or large use CDN