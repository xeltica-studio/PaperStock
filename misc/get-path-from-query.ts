export const getPathFromQuery = (value: Record<string, string | string[] | undefined>) => {
	const path = value.path;
	return Array.isArray(path) ? path[0] : path ?? '';
};