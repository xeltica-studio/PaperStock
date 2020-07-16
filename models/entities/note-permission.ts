export const notePermissions = [
	"everyone",
	"signed-in",
	"groups",
	"author"
] as const;

export type NotePermission = typeof notePermissions[number];
