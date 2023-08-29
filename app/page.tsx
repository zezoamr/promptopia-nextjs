import Feed from "@components/Feed"


export default function Home() {
  return (
    <section className="w-full flex-col flex-center">
      <h1 className="head_text text-center">
        Discover and Share
        <br className="max:md-hidden"/>
        <span className="red_gradient_custom text-center">For better prompt-powered AIs </span>
      </h1>
      <p className="desc_custom text-center">Promtopia is a public free site where you can share your AI prompts and learn from others. make the most out of AI with Promtopia</p>

      <Feed/>
    </section>
  )
}
