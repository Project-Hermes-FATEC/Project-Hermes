import Header from "../../components/header"
import { Grid, GridItem } from "@chakra-ui/react"
import Footer from "../footer"

interface Props {
    children: React.ReactNode
}

function Layout(props: Props) {
    const { children } = props

    return (
        <Grid templateColumns={'1fr'} templateRows={'auto auto auto'}>
            <GridItem colSpan={1} rowSpan={1}>
                <Header />
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