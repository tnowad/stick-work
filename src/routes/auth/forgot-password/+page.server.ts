import { error } from '@sveltejs/kit';
import type { Actions } from './$types';
import admin from '$lib/firebase/firebase.admin';

export const actions = {
  default: async ({ request }) => {
    try {
      const formData = await request.formData();

      const email = formData.get('email') as string;

      if (!email) {
        throw error(400, 'Email is required');
      }

      const domain = request.headers.get('host');
      const protocol = request.headers.get('x-forwarded-proto') || 'http';
      await admin.auth().generatePasswordResetLink(email, {
        url: `${protocol}://${domain}/auth/reset-password`
      });

      return {
        success: true,
        message: 'Password reset email sent successfully.'
      };
    } catch (err) {
      console.error(err);
      throw error(500, 'Failed to send password reset email');
    }
  }
} satisfies Actions;
