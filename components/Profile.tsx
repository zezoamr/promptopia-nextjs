import PromptCard from "./PromptCard";


export default function Profile({ name, desc, data, handleEdit, handleDelete } 
  : { name: string | null, desc: string, data: any, handleEdit: CallableFunction, handleDelete: CallableFunction}) {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-10 prompt_layout'>
        {data.map((post: any) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => {handleEdit(post)}}
            handleDelete={() => {handleDelete(post)}}
            handleTagClick={() => {}}
          />
        ))}
      </div>
    </section>
  )
}