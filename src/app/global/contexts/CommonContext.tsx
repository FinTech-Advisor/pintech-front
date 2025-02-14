'use client'
import { createContext, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { setDefaultLocale } from 'react-datepicker'
import { ko } from 'date-fns/locale'

setDefaultLocale(ko.code)


type ContextType = {
  state?: { title?: string; menuCode?: string; subMenuCode?: string }
  actions?: {
    setTitle?: (title: string) => void
    setMenuCode?: (code: string) => void
    setSubMenuCode?: (code: string) => void
  }
}

const CommonContext = createContext<ContextType>({})

const CommonProvider = ({ children }) => {
  const [title, setTitle] = useState<string | undefined>()
  const [menuCode, setMenuCode] = useState<string | undefined>()
  const [subMenuCode, setSubMenuCode] = useState<string | undefined>()

  const value: ContextType = {
    state: { title, menuCode, subMenuCode },
    actions: { setTitle, setMenuCode, setSubMenuCode },
  }

  return (
    <CommonContext.Provider value={value}>
      <HelmetProvider>
        <>
          <Helmet>{title && <title>{title}</title>}</Helmet>
          <section>
            {children}
          </section>
        </>
      </HelmetProvider>
    </CommonContext.Provider>
  )
}

const { Consumer: CommonConsumer } = CommonContext

export { CommonProvider, CommonConsumer }

export default CommonContext
