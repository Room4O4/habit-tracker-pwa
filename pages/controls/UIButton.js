import React from 'React';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import {styles} from '../../styles/controls/UIButton.styles'; 

const useStyle = makeStyles(styles);

const UIButton = (props) => {

    const classes = useStyle();

    return (
        <Button>
            {props.text}
        </Button>
    )
}

export default withStyles(styles, {withTheme: true})(UIButton);