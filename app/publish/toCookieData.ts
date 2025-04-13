import { CookieData } from "puppeteer";

export interface RawCookie {
	name: string; // done
	value: string; // done
	domain: string; // done
	hostOnly: boolean;
	path: string;
	secure: boolean;
	httpOnly: boolean;
	sameSite: "no_restriction" | "lax" | "strict";
	session: boolean;
	firstPartyDomain: string;
	partitionKey: null;
	expirationDate: number;
	storeId: null;
}
export default function toCookieData(cookies: RawCookie[]): CookieData[] {
	const cookieData: CookieData[] = [];
	for (const raw of cookies) {
		let curr: CookieData = {
			...raw,
			expires: raw.expirationDate,
		} as any;
		// convert sameSite
		switch (raw.sameSite) {
			case "lax":
				curr.sameSite = "Lax";
			case "no_restriction":
				curr.sameSite = "None";
			case "strict":
				curr.sameSite = "Strict";
		}

		//delete keys expirationDate, partitionKey
		delete (curr as any).expirationDate;
		delete curr.partitionKey;

		// add new one to list
		cookieData.push(curr);
	}
	return cookieData;
}