import crypto from "crypto";

// Ref: http://var.blog.jp/archives/79901479.html

export const passwordHash = (pass: string, length = 16) => {
	const salt = crypto.randomBytes(16);
	const encrypted = crypto.scryptSync(pass, salt, length);

	return `${salt.toString("base64")},${length},${encrypted.toString("base64")}`;
};

export const passwordVerify = (pass: string, hash: string) => {
	const parts = hash.split(",");
	const salt = Buffer.from(parts[0], "base64");
	const length = Number(parts[1]);
	const encryptedBase64 = parts[2];

	return encryptedBase64 === crypto.scryptSync(pass, salt, length).toString("base64");
};
