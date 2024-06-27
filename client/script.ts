import { createTRPCClient, httpBatchLink } from '@trpc/client';
import appRouter from '../server/server';

const trpc = createTRPCClient<typeof appRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
    }),
  ],
});


const newBook={
  "name":"Attack On Titan",
  "id":2,
  "price":4000
}
trpc.addbook.mutate(newBook).then((response)=>{
console.log(response)
})

trpc.deletebook.mutate(1).then((response)=>{
  console.log(response)
  })
  trpc.getbooks.query().then((books)=>{
    console.log(books)
    })