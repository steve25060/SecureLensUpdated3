import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    const clientID = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;

    // If credentials are not set, initialize with placeholder values
    // GitHub strategy will be disabled if credentials are missing
    super({
      clientID: clientID || 'placeholder',
      clientSecret: clientSecret || 'placeholder',
      callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:4000/api/auth/github/callback',
      scope: ['user:email'],
      userProfileURL: 'https://api.github.com/user',
      allowUnauthorizedTls: false,
    });
    
    if (!clientID || !clientSecret) {
      console.warn('[GithubStrategy] GitHub OAuth credentials not configured - strategy disabled');
    } else {
      console.log('[GithubStrategy] Initialized with GitHub credentials');
    }
  }

  validate(accessToken: string, refreshToken: string, profile: any, done: any) {
    const user = {
      githubId: String(profile.id),
      username: profile.username,
      email: profile.emails?.[0]?.value || profile.email || `${profile.username}@github.local`,
      name: profile.displayName || profile.name || profile.username || 'GitHub User',
      photo: profile.photos?.[0]?.value || profile.avatar_url,
    };
    done(null, user);
  }
}
