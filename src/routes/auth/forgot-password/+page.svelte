<script lang="ts">
  import { firebaseAuth } from '$lib/firebase/firebase.app';
  import { sendPasswordResetEmail } from 'firebase/auth';

  let email: string = '';
  let message: string = '';

  async function handleSubmit(event: Event) {
    event.preventDefault();
    if (!email) {
      message = 'Please enter an email.';
      return;
    }
    try {
      await sendPasswordResetEmail(firebaseAuth, email);
      message = 'Password reset email sent successfully.';
    } catch (error) {
      message = 'Error sending password reset email.';
    }
  }
</script>

<section class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold">Forgot Password</h1>
      <p class="py-6">Enter your email to reset your password.</p>
    </div>
    <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form class="card-body" on:submit={handleSubmit}>
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
            bind:value={email}
            required
          />
        </div>
        <div class="form-control">
          <button class="btn btn-primary" type="submit">Reset Password</button>
        </div>
        {#if message}
          <p class="text-center text-red-500 mt-4">{message}</p>
        {/if}
      </form>
    </div>
  </div>
</section>
