import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    // If credentials are not set, initialize with placeholder values
    // Google strategy will be disabled if credentials are missing
    super({
      clientID: clientID || 'placeholder',
      clientSecret: clientSecret || 'placeholder',
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:4000/api/auth/google/callback',
      scope: ['email', 'profile'],
    });
    
    if (!clientID || !clientSecret) {
      console.warn('[GoogleStrategy] Google OAuth credentials not configured - strategy disabled');
    } else {
      console.log('[GoogleStrategy] Initialized with Google credentials');
    }
  }

  validate(accessToken: string, refreshToken: string, profile: any, done: any) {
    const user = {
      googleId: profile.id,
      email: profile.emails?.[0]?.value,
      name: profile.displayName,
      photo: profile.photos?.[0]?.value,
    };
    done(null, user);
  }
}
