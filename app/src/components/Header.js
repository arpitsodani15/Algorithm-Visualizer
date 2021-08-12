import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import "./Header.css"
import { useState } from 'react';
import { Grid } from '@material-ui/core';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}  

function Header({setalgo}) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <AppBar position="static" className="header">
            <Grid container >
                <Typography item variant="h5" className="child">
                    Algorithm Visualizer
                </Typography>
                <Tabs item value={value} onChange={handleChange} aria-label="simple tabs example" className="tabs child">
                    <Tab label="Home" {...a11yProps(0)} onClick = {() => setalgo("Home")} />
                    <Tab label="BFS" {...a11yProps(1)} onClick = {() => setalgo("BFS")} />
                    <Tab label="Dijkstra" {...a11yProps(2)} onClick = {() => setalgo("Dijkstra")} />
                    <Tab label="Sorting" {...a11yProps(3)} onClick = {() => setalgo("Sorting")} />
                </Tabs>
            </Grid>
            
        </AppBar>
        
    )
}

export default Header
