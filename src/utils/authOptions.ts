import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
	pages: {
		signIn: '/auth/signin',
	},
	providers: [
		{
			id: 'appid',
			name: 'APPID',
			type: 'oauth',
			version: '2.0',
			checks: ['pkce'],
			clientId: process.env.APPID_CLIENT_ID,
			clientSecret: process.env.APPID_CLIENT_SECRET,
			authorization: process.env.APPID_AUTHORIZATION_URL,
			profileUrl: process.env.APPID_PROFILE_URL,
			wellKnown: process.env.APPID_WELL_KNOW,
			idToken: true,
			userinfo: {
				async request(context) {
					return await context.client.userinfo(context.tokens.access_token || '');
				},
			},
			profile: (profile: any) => {
				return {
					id: profile.email,
					name: profile.name,
					email: profile.email,
					deployPermission: profile.deployPermission,
					devPermission: profile.devPermission,
				};
			},
		},
	],
	session: {
		strategy: 'jwt',
		maxAge: parseInt('7200', 10),
	},
	callbacks: {
		signIn: async ({ user }) => {
			if (user.id) {
				try {
					return true;
				} catch (e) {
					console.log(e);
				}
			}
			return false;
		},
		async redirect({ url, baseUrl }) {
			return baseUrl;
		},
		session: async ({ session, token }) => {
			if (session.user) {
				session.user.email = token.sub;
			}

			return {
				...session,
				user: {
					...session.user,
				},
			};
		},
		jwt: async ({ token, user }) => {
			user && (token.user = user);

			return token;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
};
