import Feed from "@/components/Feed"

const Home = () => {
  return (
    <section className="w-full text-center flex-col">
      <h1 className="head_text text-center">Discover a Trivia around the world
        <br className="xs:hidden sm:block"/>
        <span className="teal_gradient text-center">Community-powered Trivia</span>
      </h1>
      <p className="desc">Trivitopia is an open-source infromation tool for world to discover trivia around the world</p>

      <Feed/>
    </section>
  )
}

export default Home