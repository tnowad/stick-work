<script lang="ts">
	const handleSignInWithGoogle = async () => {
	};
</script>

<section class="hero min-h-screen bg-base-200">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<div class="text-center lg:text-left">
			<h1 class="text-5xl font-bold">Sign In Now!</h1>
			<p class="py-6">Sign in to access your account and start using our services.</p>
		</div>
		<div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<form class="card-body">
				<div class="form-control">
					<label class="label" for="emailInput">
						<span class="label-text">Email</span>
					</label>
					<input
						type="email"
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
				<div class="divider">OR</div>

				<div class="form-control">
					<button class="btn" on:click={handleSignInWithGoogle}>SignIn with Google</button>
				</div>
			</form>
		</div>
	</div>
</section>
