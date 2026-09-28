import { describe, expect, it } from 'vitest';
import { matchRouteDefinitions } from './Matcher';
import { RoutePathDefinition } from './Definitions';

const definitions: RoutePathDefinition[] = [
  { title: 'Root', path: '/' },
  {
    title: 'Services', path: '/services', children: [
      { title: 'Service', path: '/services/:serviceId', getTitle: (match) => `Service ${match.params.serviceId}` },
      { title: 'Results', path: '/services/:serviceId/results' }
    ]
  }
];

describe('matchRouteDefinitions', () => {
  it('returns ordered breadcrumbs with dynamic titles', () => {
    const matches = matchRouteDefinitions({ definitions, pathname: '/services/7/results' });

    expect(matches.map(({ title, pathname }) => [title, pathname])).toEqual([
      ['Services', '/services'],
      ['Service 7', '/services/7'],
      ['Results', '/services/7/results']
    ]);
  });

  it('omits unmatched and explicitly skipped routes', () => {
    const matches = matchRouteDefinitions({ definitions, pathname: '/services/7', skipRoutes: ['/services'] });

    expect(matches.map((match) => match.title)).toEqual(['Root', 'Service 7']);
  });
});
