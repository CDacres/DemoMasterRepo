// Types
import { Store } from '@src/typings/types';

export default function handlePathname(route: Store.Route, href: string) {
  // If the route pathname contains at least one $
  if (route.pathname.indexOf('$') > -1) {
    href = href.split('?')[0];
    // Set up regExp check for domain in url
    const domainCheck = /^\/([a-zA-Z]{2})\//;
    // Create href array, while checking if domain is featured
    const hrefArr = href.split('/').slice(domainCheck.test(href) ? 2 : 1);
    // Add an extra empty string to start of array so that join
    // adds an preceding slash to the pathname
    hrefArr.unshift('');
    // If the cleaned href array doesn't match the length of the route pathname
    // there's a problem - we shouldn't be here...

    // Join items to create cleaned href
    const cleanHref = hrefArr.join('/');

    // Get the number of variables in the route pathname
    const noOfVariables = (route.pathname.match(/(\$[0-9])/g) || []).length;

    // Create regExp from route
    const regExp = new RegExp(route.regExp);
    // Check href against regExp
    const matches = cleanHref.match(regExp);

    // Get the variables from the cleanHref
    const variables = matches.slice(1, (noOfVariables + 1));
    // Declare the mergedPathname
    let mergedPathname = route.pathname;
    // Replace each variable in the pathname with a variable from the cleanHref
    variables.forEach(variable => {
      mergedPathname = mergedPathname.replace(/(\$[0-9])/, variable);
    });
    // Return the munged pathname
    return mergedPathname;
  }
  // Else just return the route pathname
  return route.pathname;
}
