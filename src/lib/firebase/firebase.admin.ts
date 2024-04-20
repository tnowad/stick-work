import {
  PRIVATE_FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  PRIVATE_FIREBASE_AUTH_URI,
  PRIVATE_FIREBASE_CLIENT_EMAIL,
  PRIVATE_FIREBASE_CLIENT_ID,
  PRIVATE_FIREBASE_CLIENT_X509_CERT_URL,
  PRIVATE_FIREBASE_PRIVATE_KEY,
  PRIVATE_FIREBASE_PRIVATE_KEY_ID,
  PRIVATE_FIREBASE_PROJECT_ID,
  PRIVATE_FIREBASE_TOKEN_URI,
  PRIVATE_FIREBASE_TYPE,
  PRIVATE_FIREBASE_UNIVERSE_DOMAIN
} from '$env/static/private';
import admin from 'firebase-admin';

const serviceAccount = {
  type: PRIVATE_FIREBASE_TYPE as string,
  project_id: PRIVATE_FIREBASE_PROJECT_ID as string,
  private_key_id: PRIVATE_FIREBASE_PRIVATE_KEY_ID as string,
  private_key: PRIVATE_FIREBASE_PRIVATE_KEY as string,
  client_email: PRIVATE_FIREBASE_CLIENT_EMAIL as string,
  client_id: PRIVATE_FIREBASE_CLIENT_ID as string,
  auth_uri: PRIVATE_FIREBASE_AUTH_URI as string,
  token_uri: PRIVATE_FIREBASE_TOKEN_URI as string,
  auth_provider_x509_cert_url: PRIVATE_FIREBASE_AUTH_PROVIDER_X509_CERT_URL as string,
  client_x509_cert_url: PRIVATE_FIREBASE_CLIENT_X509_CERT_URL as string,
  universe_domain: PRIVATE_FIREBASE_UNIVERSE_DOMAIN as string
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
  });
}

export default admin;
