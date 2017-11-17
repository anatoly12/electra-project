import _ from 'lodash';

const INITIAL_STATE = {
  monitors: [],
  activeMonitorId: 0,
  lastSubscription: '',
  lastSubscriptionTime: 0,
  fsEvent: {}
};

const reducers = (state = INITIAL_STATE, action) => {

  switch( action.type ) {
    case 'MONITORS_INIT':
      return {
          ...state,
          monitors: state.monitors.concat(action.data)
      };

    case 'ACTIVE_MONITOR': {
      return _.assign({}, state, {activeMonitorId: action.data});
    }

    case 'SUBSCRIPTION_MET': {
      return _.assign({}, state, { lastSubscription: action.data.name,
                                   lastSubscriptionTime: action.data.time });
    }

    case 'FS_EVENT': {
        return _.assign({}, state, { fsEvent : action.data });
    }

    default:
      break;

  }

  return state;

}

export default reducers;
