/**
 * 構成済みの markdown-it インスタンス
 */

import MarkdownIt from "markdown-it";
import hijs from "highlight.js";
import katex from "@iktakahiro/markdown-it-katex";
import emoji from "markdown-it-emoji";
import sanitizer from "markdown-it-sanitizer";

export default new MarkdownIt({
	highlight: (code, lang) => hijs.highlightAuto(code, [lang]),
	html: true,
	linkify: true,
	breaks: true,
	typographer: true
})
	.use(katex, { throwOnError: false, errorColor: " #cc0000" })
	.use(emoji)
	.use(sanitizer);
