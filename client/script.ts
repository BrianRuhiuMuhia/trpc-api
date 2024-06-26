import { createTRPCClient, httpBatchLink } from '@trpc/client';
import appRouter from '../server/server';

const trpc = createTRPCClient<typeof appRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
    }),
  ],
});

trpc.getbooks.query().then((books)=>{
console.log(books)
})



