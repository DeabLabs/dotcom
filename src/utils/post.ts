import type { CollectionEntry } from "astro:content";

export function sortMDByDate<T extends CollectionEntry<"post"> | CollectionEntry<"project">>(
	posts: T[] = []
) {
	return posts.sort(
		(a, b) => new Date(b.data.publishDate).valueOf() - new Date(a.data.publishDate).valueOf()
	);
}

export function getUniqueTags(
	posts: (CollectionEntry<"post"> | CollectionEntry<"project">)[] = []
) {
	const uniqueTags = new Set<string>();
	posts.forEach((post) => {
		post.data.tags.map((tag) => uniqueTags.add(tag));
	});
	return Array.from(uniqueTags);
}

export function getUniqueTagsWithCount(
	posts: (CollectionEntry<"post"> | CollectionEntry<"project">)[] = []
): {
	[key: string]: number;
} {
	return posts.reduce((prev, post) => {
		const runningTags: { [key: string]: number } = { ...prev };
		post.data.tags.forEach((tag) => {
			runningTags[tag] = (runningTags[tag] || 0) + 1;
		});
		return runningTags;
	}, {});
}
