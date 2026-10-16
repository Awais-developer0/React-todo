import "./App.scss"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import AppRoutes from "./pages/Routes"
import { useAuth } from "./context/Auth"
import { ConfigProvider } from "antd"
import ScreenLoader from "./components/misc/ScreenLoader"

const App = () => {
  const { isAppLoading } = useAuth()

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1d3557",
        },
        components: {
          Button: {
            primaryShadow: "none",
            defaultShadow: "none",
            dangerShadow: "none",
          },
        },
      }}
    >
      {!isAppLoading ? <AppRoutes /> : <ScreenLoader />}
    </ConfigProvider>
  )
}

export default App