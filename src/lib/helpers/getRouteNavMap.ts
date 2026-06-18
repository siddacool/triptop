export type NavigationItem = {
  value: string;
  label: string;
  paramValue?: string;
};

const extractDynamicSegment = (segment: string): string | null => {
  const match = segment.match(/^\[([^\]]+)\]$/);
  return match?.[1] ?? null;
};

export function getRouteNavMap(
  routeSegments: string[],
  routeParams: Record<string, string>,
): NavigationItem[] {
  return routeSegments.filter(Boolean).map((segment) => {
    const paramKey = extractDynamicSegment(segment);
    const routeValue = paramKey ?? segment;

    return {
      value: routeValue,
      label: routeValue,
      paramValue: paramKey ? routeParams[paramKey] : undefined,
    };
  });
}
