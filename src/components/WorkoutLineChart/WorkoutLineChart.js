import React from 'react';
import { LineChart } from 'react-d3';
import Spinner from '../Spinner/Spinner';
import _ from 'lodash';
import $ from 'jquery';

class WorkoutLineChart extends React.Component {
  static propTypes = { exercises: React.PropTypes.array.isRequired };

  componentWillMount() {
    this._updateDimensions();
  }

  componentDidMount() {
    if (!this.state.width) {
      this._updateDimensions();
    }

    window.addEventListener('resize', this._updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._updateDimensions);
  }

  _updateDimensions = () => {
    this.setState({width: $('.workout').width()});
  }

  _getLineData = () => {
    const series = {};
    const sets = {};

    this.props.exercises.forEach((exercise) => {
      if (!series[exercise._exercise._id]) {
        series[exercise._exercise._id] = {
          name: exercise._exercise.name,
          values: [],
        };
      }

      if (!sets[exercise._exercise._id]) {
        sets[exercise._exercise._id] = 0;
      }

      sets[exercise._exercise._id] = sets[exercise._exercise._id] + 1;

      series[exercise._exercise._id].values.push({
        x: sets[exercise._exercise._id],
        y: exercise.weight,
      });
    });

    // flatten and return data
    return _.values(series);
  }

  render() {
    if (!this.state.width) {
      return <Spinner />;
    }

    const lineData = this._getLineData();
    console.log(lineData);
    return (
      <div className="workout-line-graph">
        <LineChart
          data={lineData}
          width={this.state.width}
          height={400}
          viewBoxObject={{
            x: 0,
            y: 0,
            width: this.state.width,
            height: 400,
          }}
        />
      </div>
    );
  }
}

module.exports = WorkoutLineChart;
