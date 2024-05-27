<script lang="ts">
  import { AppRoute } from '$lib/constants';
</script>

<section class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold">Forgot Password</h1>
      <p class="py-6">Enter your email to reset your password.</p>
    </div>
    <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form class="card-body" action={AppRoute.AUTH_FORGOT_PASSWORD} method="post">
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
          <button class="btn btn-primary">Reset Password</button>
        </div>
      </form>
    </div>
  </div>
</section>
