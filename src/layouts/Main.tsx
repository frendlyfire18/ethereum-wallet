import React from 'react';
import SidebarWithHeader from "../components/SideBarWithHeader";
import Footer from "../components/Footer";
import {Box} from "@chakra-ui/layout";

function Main(props) {
    return (
        <Box sx={props.background&&{
            background:`url(${props.background}) center/cover no-repeat`,
            backgroundAttachment:"fixed"
        }}>
            <SidebarWithHeader>
                <Box>
                    {props.children}
                </Box>
                <Footer/>
            </SidebarWithHeader>
        </Box>
    );
}

export default Main;