<script>
  import './global.css';

  const conversations = [
  ];

  let showTypingIndicator = true;

  const conversationPromises = conversations.map((conversation, index) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(conversation);
        showTypingIndicator = false;

        if (index !== conversations.length - 1) {
          setTimeout(() => {
            showTypingIndicator = true;
          }, 500);
        }
      }, conversation.delay);
    });
  });
</script>

<div class="flex flex-col items-center w-full h-screen space-y-4">
  <h1 class="text-4xl font-bold">Error 404</h1>
  <p class="text-lg">This page could not be found.</p>
  <div class="flex flex-col space-y-4 w-full max-w-sm">
    {#each conversationPromises as conversationPromise}
      {#await conversationPromise then conversation}
        <div class="chat chat-start">
          <div class="chat-image avatar">
            <div class="w-10 rounded-full">
              <img alt={conversation.name} src={conversation.avatar} />
            </div>
          </div>
          <div class="chat-header">
            {conversation.name}
            <time class="text-xs opacity-50"
              >{new Date().toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
              })}</time
            >
          </div>
          {#if conversation.type === 'image'}
            <img
              class="chat-bubble rounded-md"
              alt={conversation.message}
              src={conversation.message}
            />
          {:else}
            <div class="chat-bubble">
              {conversation.message}
            </div>
          {/if}
        </div>
      {/await}
    {/each}

    {#if showTypingIndicator}
      <div>Someone is typing...</div>
    {/if}
  </div>
</div>
