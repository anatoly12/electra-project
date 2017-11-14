// @flow weak

import React from 'react';
import { connect } from 'react-redux';

import { red500, grey500} from 'material-ui/styles/colors';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Avatar from 'material-ui/Avatar';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';

const styleSheet = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  }
});

class MonitorsList extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillUpdate(nextProps, nextState) {
    if( nextProps.lastSubscription === '' ) {
      return false;
    } else {
        this.props.monitors.forEach( (monitor, index) => {
          if( monitor.subscriptionName === nextProps.lastSubscription )
              this.props.monitors[index].notifications++;
        });

        return true;
    }
  }

  onClickProject = (event: object) => {
    console.log(event.currentTarget.dataset.id);

    this.props.dispatch({
      type: 'ACTIVE_MONITOR',
      data: event.currentTarget.dataset.id
    });
  }

  render() {

    return (<div>
              <List>
                {this.props.monitors.map( (monitor, index) => {

                    let statusColor = ( monitor.notifications == 0 ) ? red500 : grey500;

                    return <ListItem primaryText={monitor.name}
                                     leftAvatar={<Avatar icon={<FileFolder />} />}
                                     data-id={monitor.id}
                                     key={index}
                                     onClick={this.onClickProject}>
                                     <Badge badgeContent={monitor.notifications}
                                            primary={true}>
                                       <IconButton tooltip="Notifications">
                                         <NotificationsIcon color={statusColor} />
                                       </IconButton>
                                     </Badge>
                           </ListItem>
                })}
            </List>
          </div>);
  }

};

const mapStateToProps = state => {

  return {
    monitors: (state) ? state.monitors : '',
    lastSubscription: state.lastSubscription,
    lastSubscriptionTime: state.lastSubscriptionTime
  };
};

//var StyledList = withStyles(styleSheet)(MonitorsList);
export default connect(mapStateToProps)(MonitorsList);
