import _ from 'lodash';

const INITIAL_STATE = {
  monitors: [],
  activeSubscription: '',
  lastSubscription: '',
  lastSubscriptionTime: 0,
  fsEvent: {},
  fsEventSubscription: ''
};

const reducers = (state = INITIAL_STATE, action) => {

  switch( action.type ) {
    case 'MONITORS_INIT':
      return {
          ...state,
          monitors: state.monitors.concat(action.data)
      };

    case 'ACTIVE_MONITOR': {
      return _.assign({}, state, {activeSubscription: action.data});
    }

    case 'SUBSCRIPTION_MET': {
      return _.assign({}, state, { lastSubscription: action.data.name,
                                   lastSubscriptionTime: action.data.time });
    }

    case 'FS_EVENT': {
        return _.assign({}, state, { fsEvent : action.data.fsEvent,
                                    fsEventSubscription: action.data.subscription });
    }

    default:
      break;

  }

  return state;

}

export default reducers;
