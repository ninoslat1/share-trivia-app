import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Provider from '@/components/Provider'

export const metadata = {
    title: "Trivitopia",
    description: "Discover trivia things around the world",
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
        <body>
          <Provider>
            <div className='main'>
              <div className='gradient'/>
            </div>
            <main className='app'>
              <Navbar/>
              {children}
            </main>
          </Provider>
        </body>
    </html>
  )
}

export default RootLayout