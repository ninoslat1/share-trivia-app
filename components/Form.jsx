import Link from "next/link"

const Form = ({type, post, submit, setPost, handleSubmit}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left"><span className="blue_gradient">{type} Trivia</span></h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing trivia with the world, and let people known the unique fact
      </p>

      <form action="POST" onSubmit={handleSubmit} className="my-5 w-full max-w-2xl flex flex-col gap-5 glassmorphism">
        <label name='trivia'>
          <span className="font-satoshi font-semibold block text-base text-slate-700 py-2">Your Wonderful Trivia</span>
          <textarea value={post.trivia} onChange={(e) => setPost({...post, trivia: e.target.value})} placeholder="Write your trivia here" id="trivia" className="form textarea" cols="50" rows="10" required={true}/>
        </label>
        <label name='tag'>
          <span className="font-satoshi font-semibold block text-base text-slate-700 py-2">Tag<span className="font-normal px-2">(#politic, #history, etc.)</span></span>
          <input value={post.tag} onChange={(e) => setPost({...post, tag: e.target.value})} placeholder="#tag" id="tag" className="form textarea" cols="5" rows="10" required={true}/>
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-slate-700 text-sm">
            Cancel
          </Link>

          <button type="submit" className="px-5 py-1.5 text-sm bg-teal-300" disabled={submit}>{submit ? `${type}...` : type }</button>
        </div>
      </form>
    </section>
  )
}

export default Form