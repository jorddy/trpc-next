import { trpc } from "../utils/trpc";

export default function Index() {
  const ctx = trpc.useContext();

  const { data } = trpc.proxy.greeting.useQuery({ text: "world" });
  const { data: messages } = trpc.proxy.messages.useQuery();

  const { mutate, isLoading } = trpc.proxy.createMessage.useMutation({
    onSuccess: () => ctx.invalidateQueries(["messages"])
  });

  return (
    <main>
      <h1>Message from server: {data?.message}</h1>
      <p>Sent at {data?.sent.toLocaleDateString()}</p>

      <form
        onSubmit={e => {
          e.preventDefault();

          const form = new FormData(e.target as HTMLFormElement);
          mutate({ message: form.get("message") as string });
        }}
      >
        <input type='text' name='message' id='message' />
        <button type='submit' disabled={isLoading}>
          Send message
        </button>
      </form>

      <ul>
        {messages?.map((message, idx) => (
          <li key={idx}>
            <p>{message.message}</p>
            <p>{message.sent.toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
