<script lang="ts">
  import { applyAction, enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { AppRoute } from '$lib/constants';
  import { firebaseAuth } from '$lib/firebase/firebase.app';
  import { toaster } from '$lib/stores/toasts.store';
  import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithPopup
  } from 'firebase/auth';
</script>

<section class="hero min-h-screen bg-base-200">
  <div class="card w-full max-w-md shadow-xl bg-white">
    <div class="card-header flex justify-center items-center pt-8">
      <h2 class="card-title text-2xl">Sign Up</h2>
    </div>

    <form
      class="card-body pb-0"
      method="post"
      action={`${AppRoute.AUTH_SIGN_IN}/?/signInWithIdToken`}
      use:enhance={async ({ formData }) => {
          const email = formData.get('email') as string;
          const password = formData.get('password') as string;

          const credential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
          const idToken = await credential.user.getIdToken();
          formData.set('idToken', idToken);

          return async ({ result }) => {
            if (result.type === 'success') {
              toaster.add({
                title: 'Success',
                message: 'You have successfully signed up.',
                type: 'success',
                duration: 5000,
                closable: true
              });
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
          >Already have an account? <a
            href={AppRoute.AUTH_SIGN_IN}
            class="label-text-alt link link-hover">Sign in now</a
          >
        </span>
      </div>
    </form>
    <form
      class="card-body pt-0"
      method="post"
      action={`${AppRoute.AUTH_SIGN_IN}/?/signInWithIdToken`}
      use:enhance={async ({ formData }) => {
        const credential = await signInWithPopup(firebaseAuth, new GoogleAuthProvider());
        const idToken = await credential.user.getIdToken();
        formData.set('idToken', idToken);

        return async ({ result }) => {
          if (result.type === 'success') {
            toaster.add({
              title: 'Success',
              message: 'You have successfully signed up.',
              type: 'success',
              duration: 5000,
              closable: true
            });
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
</section>
