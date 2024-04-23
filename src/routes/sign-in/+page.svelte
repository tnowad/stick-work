<script lang="ts">
  import { enhance } from '$app/forms';
  import { firebaseAuth } from '$lib/firebase/firebase.app';
  import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
</script>

<section class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold">Sign In Now!</h1>
      <p class="py-6">Sign in to access your account and start using our services.</p>
    </div>
    <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form
        class="card-body pb-0"
        method="post"
        action="/sign-in/?/signInWithIdToken"
        use:enhance={async ({ formData }) => {
          const email = formData.get('email') as string;
          const password = formData.get('password') as string;

          const credential = await signInWithEmailAndPassword(firebaseAuth, email, password);
          const idToken = await credential.user.getIdToken();
          formData.set('idToken', idToken);

          return ({result}) => {
            console.log(result);
          };
        }}
      >
        <div class="form-control">
          <label class="label" for="emailInput">
            <span class="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            id="emailInput"
            class="input input-bordered"
            required
          />
        </div>
        <div class="form-control">
          <label class="label" for="passwordInput">
            <span class="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="password"
            id="passwordInput"
            class="input input-bordered"
            required
          />
          <div class="label">
            <a href="/forgot-password" class="label-text-alt link link-hover">Forgot password?</a>
          </div>
        </div>
        <div class="form-control">
          <button class="btn btn-primary">Login</button>
        </div>
        <div class="label">
          <span class="label-text-alt"
            >Don't have an account? <a href="/sign-up" class="label-text-alt link link-hover"
              >Sign up now</a
            >
          </span>
        </div>
      </form>
      <form
        class="card-body pt-0"
        method="post"
        action="/sign-in/?/signInWithIdToken"
        use:enhance={async ({ formData }) => {
          const credential = await signInWithPopup(firebaseAuth, new GoogleAuthProvider());
          const idToken = await credential.user.getIdToken();
          formData.set('idToken', idToken);

          return ({ result }) => {
            console.log(result);
          };
        }}
      >
        <div class="divider">OR</div>
        <div class="form-control">
          <button class="btn">SignIn with Google</button>
        </div>
      </form>
    </div>
  </div>
</section>
