import { BrowserContext, CookieData } from "puppeteer";

export default async function publish({
	cookies,
	path,
	context,
	post,
}: {
	cookies: CookieData[];
	path: string;
	context: BrowserContext;
	post: string;
}) {
	await context.setCookie(...cookies);
	const page = await context.newPage();
	await page.goto(path, { waitUntil: "networkidle2" });
	console.log(await page.title());
}