import { publicProcedure, router } from './trpc';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
type book={"name":string,"id":number,"price":number}
let booksArray=[{
  "id":1,
  "name":"song of fire and ice",
  "price":2000
}]
 
const appRouter = router({
  getbooks: publicProcedure
    .query(() => {
     return booksArray
             
}),
getbookbyid:publicProcedure.input((id:unknown)=>{
  if(typeof id === "number") return id
  else throw new Error("id must be a number")
}).query(async (opts)=>{
const {input}=opts;
  const book=booksArray.find((item)=>{
return item.id===input
  })
  if(book)
    return book
  return new Error(`no book with id ${input}`)
}),
createBook:publicProcedure.input((obj:unknown)=>{
  if(typeof obj==="object") return obj
  throw new Error("must be type of book")
}).mutation(async(opts)=>{
  const {input}=opts
  let inputs:book|any=input
  booksArray.push(inputs)
})
});
const server = createHTTPServer({
    router: appRouter,
  });
  server.listen(3000,()=>{
    console.log("server is running on port 3000")
  });
  export default appRouter