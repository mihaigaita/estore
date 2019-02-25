import { connect } from 'react-redux';
import { getTagIdList } from '../slices/tags';
import { getTags } from '../actions';
import AppDumb from '../components/AppDumb';

// function () => <AppDumb: tagIdList, getTags />

let mapStateToProps = (state, ownProps) => {
  return {tagIdList: getTagIdList(state, ownProps)}
};

export default connect(
  mapStateToProps,
  { getTags }
)(AppDumb)