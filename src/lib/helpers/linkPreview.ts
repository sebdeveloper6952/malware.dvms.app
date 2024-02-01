import urlMetadata from 'url-metadata';

export interface Preview {
	title: string;
	description: string;
	imageUrl: string;
	transformedUrl: string;
}

const transformGithubUrl = (url: string): string => {
	url = url.replace('https://github.com/', '');
	const parts = url.split('/');

	if (parts.length < 2) {
		return url;
	}

	return 'https://github.com/' + parts[0] + '/' + [parts[1]];
};

const transformFDroidUrl = (url: string): string => {
	const parts = url.split('/');
	const packageNameParts = parts[parts.length - 1].split('_');
	if (packageNameParts.length === 2)
		return 'https://f-droid.org/en/packages/' + packageNameParts[0] + '/';

	return url;
};

const transformUrl = (url: string): string => {
	if (url.startsWith('https://github.com/')) {
		return transformGithubUrl(url);
	} else if (url.startsWith('https://f-droid.org')) {
		return transformFDroidUrl(url);
	}

	return url;
};

export const getPreview = async (url: string): Promise<Preview> => {
	const transformedUrl = transformUrl(url);
	const metadata = await urlMetadata('https://corsproxy.io/?' + transformedUrl, {
		mode: 'cors',
		includeResponseBody: true,
		ensureSecureImageRequest: true
	});

	const ogTitle = metadata['og:title'] as string;
	const ogDescription = metadata['og:description'] as string;
	const ogImage = metadata['og:image'] as string;

	return { title: ogTitle, description: ogDescription, imageUrl: ogImage, transformedUrl };
};
