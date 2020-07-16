export function ensure<T> (x: T): NonNullable<T> {
	if (x == null) {
		throw new Error("Null Reference");
	} else {
		return x as NonNullable<T>;
	}
}
