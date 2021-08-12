import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import "./Home.css";

function Home({setalgo}) {
    return (
        <div className="home">
            {/* <Divider />
            <List component="nav" aria-label="main mailbox folders" >
                <ListItem button onClick={()=>setalgo("BFS")} >
                    <ListItemText primary="BFS" />
                </ListItem>
                <Divider />
                <ListItem button onClick={()=>setalgo("Dijkstra")} >
                    <ListItemText primary="Dijkstra" />
                </ListItem>
                <Divider />
                <ListItem button onClick={()=>setalgo("Sorting")} >
                    <ListItemText primary="Sorting" />
                </ListItem>
            </List>
            <Divider /> */}
        </div>
    )
}

export default Home
