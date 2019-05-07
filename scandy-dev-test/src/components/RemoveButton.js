import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    position: 'absolute',
    top: 0,
    right: 0
  }
});

function FloatingActionButtons(props) {
  const { classes, handleClick } = props;
  return (
    <div>
      <Fab aria-label="Delete" className={classes.fab}>
        <DeleteIcon onClick={handleClick} />
      </Fab>
    </div>
  );
}

FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingActionButtons);