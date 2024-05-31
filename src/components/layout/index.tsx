import Header from "../../components/header"
import { Grid, GridItem, useColorModeValue } from "@chakra-ui/react"
import Footer from "../footer"
import { useLocation } from "react-router-dom"
import CardMessage from "../cardMessage"

interface Props {
    children: React.ReactNode
}

function Layout(props: Props) {
    const { children } = props
    const location = useLocation();

    const isAuth = () => {
        return location.pathname.match('/login') ? false : true;
    }
     
    let message = '';
    if(location.state){
        message = location.state.message
    }
    
    return (
        <Grid 
        templateColumns={'1fr'} 
        templateRows={'auto 1fr auto'} 
        backgroundColor={useColorModeValue('gray.300', 'gray.800')}
        backgroundSize={'cover'}
        minH={'100vh'}>
            <GridItem colSpan={1} rowSpan={1}>
                <Header isAuth={isAuth()} />
                { message && <CardMessage message="Login realizado com sucesso!" type={location.state.type} /> }
            </GridItem>
            <GridItem colSpan={1} rowSpan={1}>
                {children}
            </GridItem>
            <GridItem colSpan={1} rowSpan={1}>
                <Footer />
            </GridItem> 
        </Grid>
    )
}

export default Layout
