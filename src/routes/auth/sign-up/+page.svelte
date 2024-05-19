<script lang="ts">
  import { applyAction, enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { AppRoute } from '$lib/constants';
  import { firebaseAuth } from '$lib/firebase/firebase.app';
  import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithPopup
  } from 'firebase/auth';
</script>

<section class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold">Sign Up Now!</h1>
      <p class="py-6">Create an account to start using our services.</p>
    </div>
    <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form
        class="card-body pb-0"
        method="post"
        action="/sign-in/?/signInWithIdToken"
        use:enhance={async ({ formData }) => {
          const email = formData.get('email') as string;
          const password = formData.get('password') as string;
          console.log(email, password);

          const credential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
          const idToken = await credential.user.getIdToken();
          formData.set('idToken', idToken);

          return async ({ result }) => {
            if (result.type === 'success') {
              await goto(AppRoute.HOME, { invalidateAll: true });
              return;
            }
            await applyAction(result);
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
        </div>
        <div class="form-control">
          <button class="btn btn-primary">Sign Up</button>
        </div>
        <div class="label">
          <span class="label-text-alt"
            >Already have an account? <a href="/sign-in" class="label-text-alt link link-hover"
              >Sign in now</a
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

          return async ({ result }) => {
            if (result.type === 'success') {
              await goto(AppRoute.HOME, { invalidateAll: true });
              return;
            }
            await applyAction(result);
          };
        }}
      >
        <div class="divider">OR</div>
        <div class="form-control">
          <button class="btn">Sign Up with Google</button>
        </div>
      </form>
    </div>
  </div>
</section>
