import React from 'react';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPlus, faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import ListItemText from "@material-ui/core/ListItemText";

function RestaurantsMenu(props) {
    const { restDetails, addItemHandler } = props;
    return (

        <div style={{ marginTop: '2rem', marginLeft: '4rem', marginRight: '2rem' }}>
            {restDetails.categories.map((cat, index) => (
                <div key={index}>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {cat.category_name.toUpperCase()}
                    </Typography>
                    <Divider />
                    <List>
                        {cat.item_list.map((item, index) => (
                            <ListItem key={index}>
                                <ListItemAvatar>
                                    {item.item_type === "VEG" ? <FontAwesomeIcon icon={faCircle} color="green" /> : <FontAwesomeIcon icon={faCircle} color="red" />}
                                </ListItemAvatar>
                                <ListItemText style={{ width: '30%' }} primary={item.item_name[0].toUpperCase() + item.item_name.slice(1)} />
                                <ListItemText>
                                    <Typography variant="body1" color="textPrimary"><FontAwesomeIcon icon={faRupeeSign} />{item.price}</Typography>
                                </ListItemText>
                                <ListItemText>
                                    <FontAwesomeIcon icon={faPlus} color="gray" onClick={() => addItemHandler(item)} />
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </div>
            ))}
        </div>
    );
}

export default RestaurantsMenu;
