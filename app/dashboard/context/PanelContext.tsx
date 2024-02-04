import React, {useState, createContext} from "react"

interface Props {
  children: React.ReactNode
}

interface PanelContextType {
  chartData: any;
  setChartData: React.Dispatch<React.SetStateAction<any>>;
}

const PanelContext = createContext<PanelContextType>()

const PanelContextProvider = ({children}: Props) => {
  const [chartData, setChartData] = useState<any>({})
  return (
    <PanelContext.Provider value={{chartData, setChartData}}>
      {children}
    </PanelContext.Provider>
  )
}

export {PanelContext, PanelContextProvider}