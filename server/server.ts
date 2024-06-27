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
    .query(async () => {
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
addbook:publicProcedure.input((obj:unknown)=>{
  if(typeof obj==="object") return obj
  throw new Error("must be type of book")
}).mutation(async(opts)=>{
  try{
  const {input}=opts
  let newbook:book|any=input
  booksArray.push(newbook)
  return newbook
  }
  catch(err){
return "Server Error"
  }

}),
deletebook:publicProcedure.input((id:unknown)=>{
  if(typeof id === "number") return id
  else throw new Error("id must be a number")
}).mutation(async(opts)=>{
  const {input}=opts
  let id:number|any=input
  return booksArray.filter((book)=>{
return book.id!==id
  })
  
}),
updatebook:publicProcedure.input((obj:unknown)=>{
  return obj
  }).mutation(async (opts)=>{
    const {input}=opts
    let book:book|any=input
    booksArray=[...booksArray,book]
  })
});
const server = createHTTPServer({
    router: appRouter,
  });
  server.listen(3000,()=>{
    console.log("server is running on port 3000")
  });
  export default appRouter