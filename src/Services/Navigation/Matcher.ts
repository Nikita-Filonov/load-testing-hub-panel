import { matchPath, PathMatch } from 'react-router-dom';
import { RoutePathDefinition } from './Definitions';

type MatchRouteDefinitions = {
  definitions: RoutePathDefinition[];
  pathname: string;
  skipRoutes?: string[];
};

interface RouteMatch extends PathMatch {
  title: string;
}

const SKIP_ROUTES: string[] = ['/', '*'];

export function matchRouteDefinitions(props: MatchRouteDefinitions): RouteMatch[] {
  const { definitions, pathname, skipRoutes = SKIP_ROUTES } = props;
  const matches: RouteMatch[] = [];

  for (const definition of definitions) {
    const match = matchPath({ path: definition.path, end: false }, pathname);

    if (match && !skipRoutes.includes(definition.path) && canBeAddedToMatch(matches, match)) {
      const title = definition.getTitle ? definition.getTitle(match) : definition.title;
      matches.push({ ...match, title });
    }

    if (definition.children) {
      const matchChildren = matchRouteDefinitions({ definitions: definition.children, pathname });

      matches.push(...matchChildren);
    }
  }

  return matches;
}

function getPreviousMatch(previousMatches: PathMatch[]): PathMatch | undefined {
  return previousMatches[previousMatches.length - 1];
}

function isNotSameAsPreviousMatch(previousMatches: PathMatch[], match: PathMatch): boolean {
  const previousMatchedPattern = getPreviousMatch(previousMatches)?.pattern ?? '';
  return previousMatchedPattern !== match.pattern;
}

function isMoreSpecificThanPreviousMatch(previousMatches: PathMatch[], toPathname: string): boolean {
  const previousMatchedPathname = getPreviousMatch(previousMatches)?.pathname ?? '';
  return toPathname.length > previousMatchedPathname.length;
}

function canBeAddedToMatch(matches: PathMatch[], match: PathMatch) {
  return isNotSameAsPreviousMatch(matches, match) && isMoreSpecificThanPreviousMatch(matches, match.pathname);
}
