import React,{Component} from 'react'
import seedColors from './seedColors'
import Palette from './Palette'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { generatePalette } from './colorHelpers'
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import Minipalette from './Minipalette'
import styles from './styles/PalettelistStyles'
import { withStyles } from "@material-ui/styles";

class Palettelist extends Component {

    state={
        openDeleteDialog: false,
        deletingId: ""
    }

    openDialog = (id)=> {
        this.setState({ openDeleteDialog: true, deletingId: id });
      }
      closeDialog =()=> {
        this.setState({ openDeleteDialog: false, deletingId: "" });
      }

      handleDelete=()=>{
          this.props.deletePalette(this.state.deletingId)
          this.closeDialog()
      }
    goToPalette = (id)=>{
        this.props.history.push(`/palette/${id}`)
    }
    render(){
        const { openDeleteDialog, deletingId } = this.state;
        return(
            <div className={this.props.classes.root}>
                <div className={this.props.classes.container}>
                    <nav className={this.props.classes.nav}>
                        <h1 className={this.props.classes.heading}>React Colors</h1>
                        <Link to='/palette/new'>Create Palette</Link>
                    </nav>
                    <TransitionGroup className={this.props.classes.palettes}>
                        {
                             this.props.palettes.map(p=>(
                                <CSSTransition key={p.id} classNames='fade' timeout={500}>
                                    <Minipalette {...p} handleClick={this.goToPalette}
                                    // handleDelete={this.props.deletePalette}
                                    openDialog={this.openDialog}
                                    key={p.id}
                                    id={p.id}/>
                                </CSSTransition>
                              ))
                        }
                    </TransitionGroup>
                </div>
                <Dialog
                    open={openDeleteDialog}
                    aria-labelledby='delete-dialog-title'
                    onClose={this.closeDialog}
                >
                <DialogTitle id='delete-dialog-title'>
                Delete This Palette?
               </DialogTitle>
            <List>
                <ListItem button onClick={this.handleDelete}>
                <ListItemAvatar>
                    <Avatar
                    style={{ backgroundColor: blue[100], color: blue[600] }}
                    >
                    <CheckIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Delete' />
                </ListItem>
                <ListItem button onClick={this.closeDialog}>
                <ListItemAvatar>
                    <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                    <CloseIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Cancel' />
                </ListItem>
            </List>
        </Dialog>  
            </div>
        )
    }
}

export default withStyles(styles)(Palettelist)
