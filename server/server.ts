import { publicProcedure, router } from './trpc';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
 
const appRouter = router({
  books: publicProcedure
    .query(() => {
     return ["Books"]
             
}),
bookById:publicProcedure.query(()=>{
    return ["Book by id"]
}),
createBook:publicProcedure.query(()=>{
    return ["Create book"]
})});
const server = createHTTPServer({
    router: appRouter,
  });
  server.listen(3000);
  export default appRouter