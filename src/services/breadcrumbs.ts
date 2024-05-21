/*
 * state -- history state of app
 * route -- url of a new breadcrumb  */
export type TBreadCrumb = { path: string; url: string; title: string };
export type TBreadCrumbsState = TBreadCrumb[];
/*
 * state -- history state of app
 * route -- url of a new breadcrumb  */
export const isContainRoute = (state: TBreadCrumbsState, route: string) => state.some(({ url }) => url === route);

/*
 * state -- history state of app
  * url -- url of current breadcrumb */
export const removeRemainingCrumbs = (state: TBreadCrumbsState, url: string) => {
  const index = state.findIndex(({ url: route }) => route === url);
  return state.slice(0, index);
};

export const HOME_CRUMB = { path: '/', url: '/', title: 'Home' };